import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import { SurveyService } from './surveys.service'
import { ParticipantResponse, SubmissionInfoResponse, ScoreResponse, PlantResponse } from './surveys.response'
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

  @Get('/score/:userId')
  @ApiOperation({ summary: 'Get final score result' })
  @ApiParam({ name: 'userId', required: true, description: 'user id' })
  @ApiResponse({ type: ScoreResponse })
  getScore(
    @Param('userId') userId: number
  ): Promise<ScoreResponse> {
    return this.surveyService.getScore(
        userId
    );
  }

  @Patch('/plant/:userId')
  @ApiOperation({ summary: 'Plant tree' })
  @ApiParam({required: true, type: String, name: 'userId' })
  @ApiResponse({ type: Surveys })
  plantTree(
    @Param() userId: number
  ): Promise<Surveys> {
    return this.surveyService.plantTree(
        userId
    )
  }

  @Get('/plant-count')
  @ApiOperation({ summary: 'Get total plant count' })
  @ApiResponse({ type: PlantResponse })
  getPlant(): Promise<PlantResponse> {
    return this.surveyService.getPlant();
  }

}
