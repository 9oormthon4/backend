import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class AddNicknameDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'aldkfadfX' })
    userCode: string

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 'Tom' })
    nickname: string
}