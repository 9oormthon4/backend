import { ApiProperty } from '@nestjs/swagger';

export class ParticipantResponse {
    @ApiProperty({ example: 10 })
    totalParticipantCount: number
}

export class SubmissionInfoResponse {
    @ApiProperty({ example: 10 })
    userId: number

    @ApiProperty({ example: 'aldkfadfX' })
    userCode: string
}