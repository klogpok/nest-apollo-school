import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { MongoRepository } from 'typeorm';
import { CreateStudentInput } from './dto/inputs/create-student-input.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepository: MongoRepository<StudentEntity>,
  ) {}

  async getStudentById(id: string): Promise<StudentEntity> {
    return await this.studentRepository.findOne({
      where: { id },
    });
  }

  async getAllStudents(): Promise<StudentEntity[]> {
    return await this.studentRepository.find();
  }

  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return await this.studentRepository.save(student);
  }
}
