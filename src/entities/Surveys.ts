import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';

import { ApiProperty } from '@nestjs/swagger';

@Entity('surveys', { schema: 'adregamdy' })
export class Surveys {
    @ApiProperty({ example: 3 })
    @PrimaryGeneratedColumn({ type: 'int', name: 'user_id' })
    userId: number;

    @ApiProperty({ example: '렌터카 빌렸나요' })
    @Column('varchar', { name: 'user_nickname', length: 200, nullable: true })
    userNickname: string | null;

    @ApiProperty({ example: 'https~' })
    @Column('varchar', { name: 'user_code', length: 200 })
    userCode: string | null;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', {
      name: 'created_at',
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', {
      name: 'updated_at',
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;

    @ApiProperty({ example: 1 })
    @Column({type: 'int', name: 'economic_cost'})
    economicCost: number | null;

    @ApiProperty({ example: 1 })
    @Column({type: 'int', name: 'green_score'})
    greenScore: number | null;
}