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
            code: 'responses/not-answering-8-questions'
        })
    }

    await Promise.all(submissionDTO.responses.map(async s => {

        const check = this.responseRepository.createQueryBuilder('responses')
            .where('responses.userId = :userId', { userId: s.userId })
            .andWhere('responses.questionId = :questionId', { questionId: s.questionId })
            .getOne()
        
        if(check) {
            throw new AdregamdyException({
                statusCode: 400,
                code: 'responses/duplicate-entry'
            })
        }

        await this.responseRepository.save(
            this.responseRepository.create(s)
        )
    }))

    return {
        status: true
    }

  }

}
