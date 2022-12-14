import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ParticipantResponse } from './surveys.response'

import { Questions } from 'src/entities/Questions';
import { Surveys } from 'src/entities/Surveys'


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




}
