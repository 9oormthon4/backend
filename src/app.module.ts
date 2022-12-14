import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/questions.module';
import { Questions } from './entities/Questions';
import { Surveys } from './entities/Surveys';
import { SurveyModule } from './surveys/surveys.module';

@Module({
  imports: [

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '13.124.66.200',
        username: 'root',
        password: 'messi10goat',
        port: 52320,
        database: 'adregamdy',
        entities: [
          Questions,
          Surveys,

        ],
        extra: {
          charset: 'utf8mb4_general_ci',
        },
        synchronize: true,
      }
    ),
    QuestionModule,
    SurveyModule,

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
