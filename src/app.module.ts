import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { Questions } from './entities/Questions';
import { Surveys } from './entities/Surveys';
import { Responses } from './entities/Responses'

import { QuestionModule } from './questions/questions.module';
import { SurveyModule } from './surveys/surveys.module';
import { ResponseModule } from './responses/responses.module'

@Module({
  imports: [


    // dotenv 적용이 안됨...ㅠㅠ

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '3.34.62.141',
        username: 'root',
        password: 'messi10goat',
        port: 51588,
        database: 'adregamdy',
        entities: [
          Questions,
          Surveys,
          Responses
        ],
        extra: {
          charset: 'utf8mb4_general_ci',
        },
        synchronize: false,
      }
    ),
    QuestionModule,
    SurveyModule,
    ResponseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
