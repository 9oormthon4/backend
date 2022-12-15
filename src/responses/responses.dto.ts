import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

export class ResponseDTO {
    //@IsNumber()
    //@IsNotEmpty()
    @ApiProperty({ example: 1 })
    userId: number;

    //@IsNumber()
    //@IsNotEmpty()
    @ApiProperty({ example: 1 })
    questionId: number;

    //@IsNumber()
    //@IsNotEmpty()
    @ApiProperty({ example: 1 })
    answerToQuestion: number;
}

export class CreateSubmissionDTO {
    @ApiProperty({ type: ResponseDTO, isArray: true })
    responses: ResponseDTO[]
}
