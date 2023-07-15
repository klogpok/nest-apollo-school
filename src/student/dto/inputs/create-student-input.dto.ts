import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateStudentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  readonly lastName: string;
}
