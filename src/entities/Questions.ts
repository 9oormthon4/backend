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

@Entity('questions', { schema: 'adregamdy' })
export class Questions {
    @ApiProperty({ example: 3 })
    @PrimaryGeneratedColumn({ type: 'int', name: 'question_id' })
    questionId: number;

    @ApiProperty({ example: '렌터카 빌렸나요' })
    @Column('varchar', { name: 'question_content', length: 200 })
    questionContent: string;

    @ApiProperty({ example: 'https~' })
    @Column('varchar', { name: 'question_image_url', length: 200 })
    questionImageUrl: string;

    @ApiProperty({ example: '하늘' })
    @Column('varchar', { name: 'question_type', length: 200 })
    question_type: string;

    @ApiProperty({ example: '옵션1' })
    @Column('varchar', { name: 'option_one', length: 200 })
    optionOne: string;

    @ApiProperty({ example: '옵션2' })
    @Column('varchar', { name: 'option_two', length: 200 })
    optionTwo: string;

    @ApiProperty({ example: '옵션3' })
    @Column('varchar', { name: 'option_three', length: 200 })
    optionThree: string;

    @ApiProperty({ example: '옵션4' })
    @Column('varchar', { name: 'option_four', length: 200 })
    optionFour: string;
}