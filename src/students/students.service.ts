import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';

import { ImportStudentsDto } from './dto/import-student.dto';
import { CreateStudentDto, UpdateStudentDto } from './dto/student.dto';
import { DataResponseFormat } from 'src/shared/api-data';
import { StudentData } from 'src/models/registration';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
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
    return await this.studentRepository.findOne({ where: { id } });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOneOrFail(id);
    await this.studentRepository.update(student.id, updateStudentDto);
    return { ...student, ...updateStudentDto };
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
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async importStudents(importDto: ImportStudentsDto, fileBuffer: Buffer): Promise<string> {
    try {
      const { academicYear, fileName } = importDto;
      const filePath = path.join(__dirname, '..', 'uploads', fileName);
      fs.writeFileSync(filePath, fileBuffer);

      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const studentsData: StudentData[] = xlsx.utils.sheet_to_json<StudentData>(sheet);
      console.log(studentsData)
      const savedStudents = [];
      for (const studentData of studentsData) {
        const { studentUniversityId, firstName, middleName, lastName, universityEntrance, cgpa, fieldEntrance, gender, regionId, handCaped,  currentDepartmentId, batch, semester, specialCased } = studentData;

        // const department = await this.departmentRepository.findOne(currentDepartmentId);
        // if (!department) {
        //   throw new Error(`Department with ID ${currentDepartmentId} not found`);
        // }

        // const region = await this.regionRepository.findOne(regionId);
        // if (!region) {
        //   throw new Error(`Region with ID ${regionId} not found`);
        // }

        const newStudent = new Student();
        newStudent.currentDepartmentId = currentDepartmentId;
        newStudent.firstName = firstName;
        newStudent.middleName = middleName;
        newStudent.lastName = lastName;
        newStudent.studentUniversityId = studentUniversityId;
        newStudent.universityEntrance = universityEntrance;
        newStudent.cgpa = cgpa;
        newStudent.fieldEntrance = fieldEntrance;
        newStudent.gender = gender;
        newStudent.regionId = regionId;
        newStudent.handCaped = handCaped;
        newStudent.specialCased = specialCased;
        newStudent.batch = batch;
        newStudent.semester = semester;

        const savedStudent = await this.studentRepository.save(newStudent);
        savedStudents.push(savedStudent);
      }

      fs.unlinkSync(filePath);
      return `Successfully imported ${savedStudents.length} students for ${academicYear} from file ${fileName}`;
    } catch (error) {
      console.error('Error importing students:', error);
      throw new Error('Failed to import students');
    }
  }
}
