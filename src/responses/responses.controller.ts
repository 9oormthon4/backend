import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { ResponseService } from './responses.service'

import { SuccessResponse } from './responses.response'
import { CreateSubmissionDTO } from './responses.dto'
import { AdregamdyAuth, AdregamdyAuthResponse } from 'src/auth';

@ApiTags('Responses')
@Controller('/responses')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @ApiOperation({ summary: 'Submit responses by list' })
  @ApiResponse({ type: SuccessResponse })
  createSubmission(
    @AdregamdyAuth() _: AdregamdyAuthResponse,
    @Body() submissionDTO: CreateSubmissionDTO
  ): Promise<SuccessResponse> {
    return this.responseService.createSubmission(
        submissionDTO
    )
  }

}
