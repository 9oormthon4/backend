import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator'

export class AddNicknameDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'aldkfadfX' })
    userCode: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Tom' })
    nickname: string
}