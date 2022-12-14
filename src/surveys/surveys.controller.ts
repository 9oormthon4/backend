import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { SurveyService } from './surveys.service'
import { ParticipantResponse } from './surveys.response'

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

}
