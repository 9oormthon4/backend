import { ApiProperty } from '@nestjs/swagger';
import { Questions } from 'src/entities/Questions';

export class QuestionLengthResponse {
  @ApiProperty({ example: 10 })
  totalQuestionCount: number
}

export class QuestionListResponse {
    @ApiProperty({ example: 10 })
    totalQuestionCount: number

    @ApiProperty({type: Questions, isArray: true})
    questions: Questions[]
}