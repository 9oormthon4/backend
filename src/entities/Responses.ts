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

@Entity('responses', { schema: 'adregamdy' })
export class Responses {
    @ApiProperty({ example: 3 })
    @PrimaryGeneratedColumn({ type: 'int', name: 'response_id' })
    responseId: number;

    @ApiProperty({ example: 1 })
    @Column({type: 'int', name: 'user_id'})
    userId: number;

    @ApiProperty({ example: 1 })
    @Column({type: 'int', name: 'question_id'})
    questionId: number;

    @ApiProperty({ example: 1 })
    @Column({type: 'int', name: 'answer_to_question'})
    answerToQuestion: number;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', {
      name: 'created_at',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date | null;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', {
      name: 'updated_at',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date | null;

    @ApiProperty({ example: '2000-00-00T00:00:00.000Z' })
    @Column('datetime', { name: 'deleted_at', nullable: true })
    deletedAt: Date | null;
}