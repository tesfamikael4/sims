import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHierarchyDto, UpdateHierarchyDto } from './dto/hierarchy.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hierarchy } from './entities/hierarchy.entity';
import { Repository } from 'typeorm';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class HierarchyService {
  constructor(
    @InjectRepository(Hierarchy)
    private readonly hierarchyRepository: Repository<Hierarchy>,
  ) {}
  async create(createHierarchyDto: CreateHierarchyDto) {
    const existHierarchy = await this.findByName(createHierarchyDto.name);
    const existHierarchySName = await this.findByShortName(createHierarchyDto.shortName);
    if(existHierarchy){
      throw new ConflictException(`Hierarchy with name ${createHierarchyDto.name} already exists!`);
    }
    if(existHierarchySName){
      throw new ConflictException(`Hierarchy with Short Name ${createHierarchyDto.shortName} already exists!`);
    }

    const hierarchy = this.hierarchyRepository.create(createHierarchyDto);
    await this.hierarchyRepository.save(hierarchy);

    return hierarchy;
  }

  async findAll() {
    const response = new DataResponseFormat<Hierarchy>();
    const result = await this.hierarchyRepository.find();
    response.total = result.length;
    response.items = result;

    return response;
  }

  async findOne(id: string, includes = '') {
    console.log(includes);
    return await this.hierarchyRepository.findOne({
      where: { id },
      relations: [includes],
    });
  }

  async update(id: string, updateHierarchyDto: UpdateHierarchyDto) {
    const hierarchy = await this.findOneOrFail(id);
    await this.hierarchyRepository.update(hierarchy.id, updateHierarchyDto);

    return {
      ...hierarchy,
      ...updateHierarchyDto,
    };
  }

  async remove(id: string) {
    const hierarchy = await this.findOneOrFail(id);

    return await this.hierarchyRepository.remove(hierarchy);
  }

  async archive(id: string) {
    const hierarchy = await this.findOneOrFail(id);
    return await this.hierarchyRepository.softRemove(hierarchy);
  }

  async restore(id: string) {
    return await this.hierarchyRepository.restore(id);
  }

  public async findOneOrFail(id: string): Promise<Hierarchy> {
    const hierarchy = await this.findOne(id);
    if (!hierarchy) {
      throw new NotFoundException(`not_found`);
    }
    return hierarchy;
  }
  private async findByName(name: string): Promise<Hierarchy | undefined> {
    return await this.hierarchyRepository.findOne({
      where: { name },
    });
  }
  private async findByShortName(shortName: string): Promise<Hierarchy | undefined> {
    return await this.hierarchyRepository.findOne({
      where:  { shortName },
    });
  }
}
