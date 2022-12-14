import { ApiProperty } from '@nestjs/swagger';

export class AddNicknameDTO {
    @ApiProperty({ example: 'aldkfadfX' })
    userCode: string

    @ApiProperty({ example: 'Tom' })
    nickname: string
}