import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from './questions/questions.module';
import { Questions } from './entities/Questions';

@Module({
  imports: [

    TypeOrmModule.forRoot(
      {
        type: 'mysql',
        host: '3.37.71.138',
        username: 'root',
        password: 'messi10goat',
        port: 51838,
        database: 'adregamdy',
        entities: [Questions],
        extra: {
          charset: 'utf8mb4_general_ci',
        },
        synchronize: true,
      }
    ),
    QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
