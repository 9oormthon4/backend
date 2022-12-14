import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyController } from './surveys.controller';
import { SurveyService } from './surveys.service';


import { Surveys } from 'src/entities/Surveys';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        Surveys
    ]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
})
export class SurveyModule {}
