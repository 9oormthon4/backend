import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyController } from './surveys.controller';
import { SurveyService } from './surveys.service';

import { Surveys } from 'src/entities/Surveys';
import { Responses } from 'src/entities/Responses'
import { Questions } from 'src/entities/Questions'

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Surveys,
        Responses,
        Questions
    ]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
