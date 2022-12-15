import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParticipantResponse, SubmissionInfoResponse, ScoreResponse, PlantResponse } from './surveys.response'

import { Surveys } from 'src/entities/Surveys'
import { Responses } from 'src/entities/Responses'
import { Questions } from 'src/entities/Questions'

import { AddNicknameDTO } from './surveys.dto'


@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Surveys)
    private readonly surveyRepository: Repository<Surveys>,

    @InjectRepository(Responses)
    private readonly responseRepository: Repository<Responses>,

    @InjectRepository(Questions)
    private readonly questionRepository: Repository<Questions>

  ) {}

  async getParticipantCount(): Promise<ParticipantResponse> {
    return {
        totalParticipantCount: await this.surveyRepository.createQueryBuilder('surveys')
            .where('surveys.deletedAt is null')
            .getCount()
    }
  }

  async requestSubmission(): Promise<SubmissionInfoResponse> {
    const hashCode = ((+new Date) + Math.random()* 100).toString(30)
    await this.surveyRepository.save(
        this.surveyRepository.create({
            userCode: hashCode
        })
    )
    const newUser = await this.surveyRepository.createQueryBuilder('surveys')
        .where('surveys.userCode = :hashCode', { hashCode })
        .getOne()
    return {
        userId: newUser.userId,
        userCode: newUser.userCode
    }
  }

  async addNickname(
    { userCode, nickname }: AddNicknameDTO
  ): Promise<Surveys> {
    const newUser = await this.surveyRepository.createQueryBuilder('surveys')
        .where('surveys.userCode = :userCode', { userCode })
        .getOne()
    return await this.surveyRepository.save({
        ...newUser,
        userNickname: nickname
    })
  }

  async getScore(
      userId: number
  ): Promise<ScoreResponse> {

    const responses = await this.responseRepository.createQueryBuilder('responses')
        .where('responses.userId = :userId', { userId })
        .orderBy('responses.questionId', 'ASC')
        .getMany()

    const daysTraveled: number = dayConversion[responses[0].answerToQuestion]
    
    const skyPollution = this._pollutionScorer(responses[1], daysTraveled)
    const landPollution = this._pollutionScorer(responses[2], daysTraveled)
    const oceanPollution = this._pollutionScorer(responses[7], daysTraveled)
    const economicCost = skyPollution+landPollution+oceanPollution

    const A = Math.round(economicCost/MAX_ECONOMIC_COST * 20)
    const B = responses.slice(3, 8).reduce((acc, cur) => acc + cur.answerToQuestion, 0)
    const greenScore = A+B-20

    const now = await this.surveyRepository.createQueryBuilder('surveys')
        .where('surveys.userId = :userId', { userId })
        .getOne()

    await this.surveyRepository.save({
        ...now,
        greenScore: greenScore,
        economicCost: economicCost
    })

    const rank = (await this.surveyRepository.createQueryBuilder('surveys')
        .where('surveys.greenScore >= :greenScore && surveys.createdAt > :createdAt', { greenScore, createdAt: now.createdAt })
        .getCount()) + 1

    return {
        economicCost: economicCost,
        economicCostBreakDown: {
            sky: {
                score: this._categoryScorer(responses, "sky"),
                commentary: this._commentarySelector(responses, "sky")
            },
            land: {
                score: this._categoryScorer(responses, "land"),
                commentary: this._commentarySelector(responses, "land")
            },
            ocean: {
                score: this._categoryScorer(responses, "ocean"),
                commentary: this._commentarySelector(responses, "ocean")
            }
        },
        greenScore: greenScore,
        greenScoreRank: rank
    }
  }

  _pollutionScorer(response: Responses, daysTraveled: number): number {
    return weightMap[response.questionId][response.answerToQuestion] * daysTraveled
  }

  _categoryScorer(responses: Responses[], target: string): number {
    const category = {
        sky: [3, 4],
        land: [5, 7],
        ocean: [6, 7]
    }
    return Math.round((category[target].reduce((acc, cur) => acc + responses[cur].answerToQuestion, 0)) * 6 / 8)
  }

  _commentarySelector(responses: Responses[], target: string): string {
    let comment = ""
    if(target == "sky") {
       comment = [2,3,4].includes(responses[1].answerToQuestion) ? commentary[`${target}Good`] : commentary[`${target}Bad`]
    } else if(target = "land") {
       comment = [3,4].includes(responses[7].answerToQuestion) ? commentary[`${target}Good`] : commentary[`${target}Bad`]
    } else {
       comment = [3,4].includes(responses[6].answerToQuestion) ? commentary[`${target}Good`] : commentary[`${target}Bad`]
    }

    return comment
  }

  async plantTree(
      userId: number
  ): Promise<Surveys> {
    return await this.surveyRepository.save({
        userId: userId,
        isPlanting: 1
    })
  }

  async getPlant(): Promise<PlantResponse> {
      return {
        totalPlantCount: await this.surveyRepository.createQueryBuilder('surveys')
            .where('surveys.isPlanting = 1')
            .getCount()
      }
  }


}


const dayConversion = {
    1: 3,
    2: 4,
    3: 5,
    4: 6
}

const MAX_ECONOMIC_COST = 11000

const weightMap = {
    2: {
        1: 6000,
        2: 600,
        3: 300,
        4: 0
    },
    3: {
        1: 2000,
        2: 3000,
        3: 2000,
        4: 2000
    },
    8: {
        1: 500,
        2: 1000,
        3: 1500,
        4: 2000
    }
}

const commentary = {
    skyGood: "친환경적인 교통수단을 이용하셨네요!",
    skyBad: "대중교통 등 친환경적인 교통수단을 이용하는건 어떨까요?",

    landGood: "일회용품 사용을 줄이려는 당신의 노력",
    landBad: "일회용품 사용을 줄이고 친환경적인 제품을 쓰는 건 어떨까요?",

    oceanGood: "제주의 바다가 아파하지 않도록",
    oceanBad: "아름다운 제주의 바다를 지켜주셨어요"
}