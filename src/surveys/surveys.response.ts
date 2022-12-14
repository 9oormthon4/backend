import { ApiProperty } from '@nestjs/swagger';

export class ParticipantResponse {
    @ApiProperty({ example: 10 })
    totalParticipantCount: number
}