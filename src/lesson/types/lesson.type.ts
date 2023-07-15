import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from 'src/student/types/student.type';

@ObjectType('lesson')
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field(() => [StudentType])
  students: string[];
}
