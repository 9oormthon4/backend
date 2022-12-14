import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParticipantResponse, SubmissionInfoResponse } from './surveys.response'

import { Questions } from 'src/entities/Questions';
import { Surveys } from 'src/entities/Surveys'

import { AddNicknameDTO } from './surveys.dto'


import {  } from './surveys.response'

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Surveys)
    private readonly surveyRepository: Repository<Surveys>
  ) {}

  async getParticipantCount(): Promise<ParticipantResponse> {
    return {
          totalParticipantCount: await this.surveyRepository.createQueryBuilder('surveys')
            .where('surveys.delete_at is not null')
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
    return this.surveyRepository.save({
        ...newUser,
        userNickname: nickname
    })
  }




}
