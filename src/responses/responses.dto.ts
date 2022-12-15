import { ApiProperty } from '@nestjs/swagger';

export class ResponseDTO {
    @ApiProperty({ example: 1 })
    userId: number;

    @ApiProperty({ example: 1 })
    questionId: number;

    @ApiProperty({ example: 1 })
    answerToQuestion: number;
}

export class CreateSubmissionDTO {
    @ApiProperty({ type: ResponseDTO, isArray: true })
    responses: ResponseDTO[]
}
