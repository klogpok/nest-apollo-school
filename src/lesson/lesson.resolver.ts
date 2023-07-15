import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonType } from './types/lesson.type';
import { LessonService } from './lesson.service';
import { CreateLessonInput } from './dto/inputs/create-lesson-input.dto';
import { Lesson } from './lesson.entity';
import { AsignStudentsToLessonsInput } from './dto/inputs/assign-students-to-lesson-input.dto';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @Query(() => LessonType)
  async findById(@Args('id') id: string): Promise<Lesson> {
    return await this.lessonService.findById(id);
  }

  @Query(() => [LessonType])
  async findAll(): Promise<Lesson[]> {
    return await this.lessonService.findAll();
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    return await this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('asignStudentsToLessonInput')
    asignStudentsToLessonInput: AsignStudentsToLessonsInput,
  ): Promise<Lesson> {
    return await this.lessonService.assignStudentsToLesson(
      asignStudentsToLessonInput,
    );
  }

  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return await this.studentService.getManyStudents(lesson.students);
  }
}
