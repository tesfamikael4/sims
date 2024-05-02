import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}
  async create(createDepartmentDto: CreateDepartmentDto) {
    const department = this.departmentRepository.create(createDepartmentDto);
    await this.departmentRepository.save(department);

    return department;
  }

  async findAll() {
    const response = new DataResponseFormat<Department>();
    const result = await this.departmentRepository.find();
    response.total = result.length;
    response.items = result;

    return response;
  }

  async findOne(id: string, includes = '') {
    console.log(includes);
    return await this.departmentRepository.findOne({
      where: { id },
      relations: [includes],
    });
  }

  async update(id: string, updateDepartmentDto: UpdateDepartmentDto) {
    const department = await this.findOneOrFail(id);
    await this.departmentRepository.update(department.id, updateDepartmentDto);

    return {
      ...department,
      ...updateDepartmentDto,
    };
  }

  async remove(id: string) {
    const department = await this.findOneOrFail(id);

    return await this.departmentRepository.remove(department);
  }

  async archive(id: string) {
    const department = await this.findOneOrFail(id);
    return await this.departmentRepository.softRemove(department);
  }

  async restore(id: string) {
    return await this.departmentRepository.restore(id);
  }

  public async findOneOrFail(id: string): Promise<Department> {
    const department = await this.findOne(id);
    if (!department) {
      throw new NotFoundException(`not_found`);
    }
    return department;
  }
}
