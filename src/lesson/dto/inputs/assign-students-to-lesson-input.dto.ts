import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class AsignStudentsToLessonsInput {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  readonly lessonId: string;

  @Field(() => [ID])
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  readonly studentIds: string[];
}
