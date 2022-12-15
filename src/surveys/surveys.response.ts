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

export class BreakDown {
    @ApiProperty({ example: 10 })
    score: number

    @ApiProperty({ example: "HI" })
    commentary: string
}

export class EconomicCategory {
    @ApiProperty({ type: BreakDown })
    sky: BreakDown;

    @ApiProperty({ type: BreakDown })
    land: BreakDown;

    @ApiProperty({ type: BreakDown })
    ocean: BreakDown;
}

export class ScoreResponse {
    @ApiProperty({ example: 10 })
    economicCost: number

    @ApiProperty({ example: 10 })
    greenScore: number

    @ApiProperty({ example: 10 })
    greenScoreRank: number

    @ApiProperty({ type: EconomicCategory })
    economicCostBreakDown: EconomicCategory
}

export class PlantResponse {
    @ApiProperty({ example: 10 })
    totalPlantCount: number
}
