import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Questions } from 'src/entities/Questions';
import { QuestionLengthResponse, QuestionListResponse } from './questions.response'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions)
    private readonly questionRepository: Repository<Questions>
  ) {}

  async getQuestionLength(): Promise<QuestionLengthResponse> {
    return {
      totalQuestionCount: await this.questionRepository.createQueryBuilder('questions')
        .groupBy('questions.question_id')
        .getCount()
    }
  }

  async getQuestionList(): Promise<QuestionListResponse> {
    const [ questions, totalQuestionCount ] = await this.questionRepository.createQueryBuilder('questions')
      .groupBy('questions.question_id')
      .getManyAndCount()

    return {
      totalQuestionCount,
      questions
    }
  }


}
