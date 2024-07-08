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


   

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: process.env.host,
        username: process.env.username,
        password: process.env.password,
        port: process.env.port,
        database: process.env.database,
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
