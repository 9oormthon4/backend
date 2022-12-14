import { ApiProperty } from '@nestjs/swagger'

export class SuccessResponse {
    @ApiProperty({ example: true })
    status: boolean
}