import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsDateString,
  IsUUID,
} from 'class-validator';

@InputType()
export class CreateLessonInput {
  @Field()
  @IsString()
  @MinLength(3)
  readonly name: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  readonly startDate: string;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  readonly endDate: string;

  @Field(() => [ID], { defaultValue: [] })
  @IsUUID('4', { each: true })
  readonly students: string[];
}
