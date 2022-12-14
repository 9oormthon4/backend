import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuestionController } from './questions.controller';
import { QuestionService } from './questions.service';


import { Questions } from 'src/entities/Questions';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Questions
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
