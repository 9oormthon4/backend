import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Responses } from 'src/entities/Responses';
import { CreateSubmissionDTO } from './responses.dto';
import { SuccessResponse } from './responses.response'
import { AdregamdyException } from 'src/error/exception';

@Injectable()
export class ResponseService {
  constructor(
    @InjectRepository(Responses)
    private readonly responseRepository: Repository<Responses>
  ) {}

  async createSubmission(
    submissionDTO: CreateSubmissionDTO
  ): Promise<SuccessResponse> {

    if(submissionDTO?.responses?.length != 8) {
        throw new AdregamdyException({
            statusCode: 400,
            code: 'responses/not-answering-all-questions'
        })
    }

    await Promise.all(submissionDTO.responses.map(async s => {
        await this.responseRepository.save(
            this.responseRepository.create(s)
        )
    }))

    return {
        status: true
    }

  }

}
