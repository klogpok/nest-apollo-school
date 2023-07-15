import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { MongoRepository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './dto/inputs/create-lesson-input.dto';
import { AsignStudentsToLessonsInput } from './dto/inputs/assign-students-to-lesson-input.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: MongoRepository<Lesson>,
  ) {}

  async findById(id: string): Promise<Lesson> {
    return await this.lessonRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<Lesson[]> {
    return await this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    return await this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsToLessonInput: AsignStudentsToLessonsInput,
  ): Promise<Lesson> {
    const { lessonId, studentIds } = assignStudentsToLessonInput;
    const lesson = await this.findById(lessonId);
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
