import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResponseController } from './responses.controller';
import { ResponseService } from './responses.service';


import { Responses } from 'src/entities/Responses';
import { Surveys } from 'src/entities/Surveys';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Responses
    ]),
  ],
  controllers: [ResponseController],
  providers: [ResponseService],
})
export class ResponseModule {}