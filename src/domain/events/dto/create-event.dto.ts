import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EventStatus } from '../types/event.types';
import { CreateEventDateDto } from './create-event-date.dto';
import { Exclude, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly description?: string;

  @Exclude()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  readonly thumbnail: string;

  @ApiProperty({
    type: [CreateEventDateDto],
    example: [
      { startDate: '2019-10-12T10:20:50Z', endDate: '2024-03-09T21:00:00Z' },
    ],
  })
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateEventDateDto)
  readonly dates: CreateEventDateDto[];

  @ApiProperty({ example: 2 })
  @IsInt()
  readonly venueId: number;

  @ApiProperty({ enum: EventStatus })
  @IsEnum(EventStatus)
  readonly status?: EventStatus;
}
