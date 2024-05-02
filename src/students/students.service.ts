import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}
  async create(createStudentDto: CreateStudentDto) {
    const student = this.studentRepository.create(createStudentDto);
    await this.studentRepository.save(student);

    return student;
  }

  async findAll(includes = '') {
    const response = new DataResponseFormat<Student>();
    const result = await this.studentRepository.find({ relations: [includes] });
    response.total = result.length;
    response.items = result;

    return response;
  }

  async findOne(id: string) {
    return await this.studentRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOneOrFail(id);
    await this.studentRepository.update(student.id, updateStudentDto);

    return {
      ...student,
      ...updateStudentDto,
    };
  }

  async remove(id: string) {
    const student = await this.findOneOrFail(id);

    return await this.studentRepository.remove(student);
  }

  async archive(id: string) {
    const student = await this.findOneOrFail(id);
    return await this.studentRepository.softRemove(student);
  }

  async restore(id: string) {
    return await this.studentRepository.restore(id);
  }

  public async findOneOrFail(id: string): Promise<Student> {
    const student = await this.findOne(id);
    if (!student) {
      throw new NotFoundException(`not_found`);
    }
    return student;
  }
}
