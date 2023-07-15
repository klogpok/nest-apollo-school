import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentInput } from './dto/inputs/create-student-input.dto';
import { StudentEntity } from './student.entity';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => StudentType)
  async getStudentById(@Args('id') id: string): Promise<StudentEntity> {
    return await this.studentService.getStudentById(id);
  }

  @Query(() => [StudentType])
  async getAllStudents(): Promise<StudentEntity[]> {
    return await this.studentService.getAllStudents();
  }

  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    return await this.studentService.createStudent(createStudentInput);
  }
}
