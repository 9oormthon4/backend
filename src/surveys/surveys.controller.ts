import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SurveyService } from './surveys.service'
import { ParticipantResponse, SubmissionInfoResponse } from './surveys.response'
import { AddNicknameDTO } from './surveys.dto'
import { Surveys } from 'src/entities/Surveys';

@ApiTags('Surveys')
@Controller('/surveys')
export class SurveyController {
  constructor(private readonly surveyService: SurveyService) {}

  @Get('/participant-count')
  @ApiOperation({ summary: 'Get total question count' })
  @ApiResponse({ type: ParticipantResponse })
  getParticipantCount(): Promise<ParticipantResponse> {
    return this.surveyService.getParticipantCount();
  }

  @Get('/request-id')
  @ApiOperation({ summary: 'Get user id for subsequent submission process' })
  @ApiResponse({ type: SubmissionInfoResponse })
  requestSubmission(): Promise<SubmissionInfoResponse> {
    return this.surveyService.requestSubmission();
  }

  @Patch('/nickname')
  @ApiOperation({ summary: 'Add user nickname once survey is done' })
  @ApiResponse({ type: Surveys })
  addNickname(
    @Body() nicknameDTO: AddNicknameDTO
  ): Promise<Surveys> {
    return this.surveyService.addNickname(
        nicknameDTO
    )
  }

}
