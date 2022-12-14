import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { QuestionService } from './questions.service'

import { QuestionLengthResponse, QuestionListResponse } from './questions.response'

@ApiTags('Questions')
@Controller('/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get('/length')
  @ApiOperation({ summary: 'Get total question count' })
  @ApiResponse({ type: QuestionLengthResponse })
  getQuestionLength(): Promise<QuestionLengthResponse> {
    return this.questionService.getQuestionLength();
  }

  @Get()
  @ApiOperation({ summary: 'Get Question and Option by list' })
  @ApiResponse({ type: QuestionListResponse })
  getQuestionList(): Promise<QuestionListResponse> {
    return this.questionService.getQuestionList();
  }

}
