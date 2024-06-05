import { CreateRegionDto, UpdateRegionDto } from './dto/region.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Region } from './entities/region.entity';
import { Repository } from 'typeorm';
import { DataResponseFormat } from 'src/shared/api-data';

@Injectable()
export class RegionService {
   constructor(
      @InjectRepository(Region)
      private readonly regionRepository: Repository<Region>,
   ){}

   async create(createRegionDto: CreateRegionDto){
      const region = this.regionRepository.create(createRegionDto);
      await this.regionRepository.save(region);
      return region;
   }

   async findAll(includes: string[] = []): Promise<DataResponseFormat<Region>> {
      const response = new DataResponseFormat<Region>();
      try {
        const result = await this.regionRepository.find({
          relations: includes,
        });
        response.total = result.length;
        response.items = result;
      } catch (error) {
        // Handle error appropriately
        console.error('Error fetching regions:', error);
        throw new Error('Could not fetch regions');
      }
      return response;
    }   
    
    async findOne(id: string) {
      const response = new DataResponseFormat<Region>();
      try {
        const result = await this.regionRepository.findOne({
          where: { id },
        });
  
        if (!result) {
          throw new NotFoundException(`Region with ID ${id} not found`);
        }
        response.total = 1; 
        response.items = [result];
  
        return response;
      } catch (error) {
        console.error('Error fetching region:', error);
        throw error;
      }
    }
    async update(id: string, updateRegionDto: UpdateRegionDto) {
      const response = new DataResponseFormat<Region>();
      try {
        await this.regionRepository.update(id, updateRegionDto);
        const result = await this.regionRepository.findOne({
          where: { id }
        });
    
        if (!result) {
          throw new NotFoundException(`Region with ID ${id} not found`);
        }
        response.total = 1; 
        response.items = [result];
    
        return {...response, ...updateRegionDto}
      } catch (error) {
        console.error('Error updating region:', error);
        throw error;
      }
    }
    async remove( id: string) {
      const region = await this.findOneOrFail(id);

      return await this.regionRepository.remove(region);
    }   

    async archive(id: string) {
      const region = await this.findOneOrFail(id);

      return await this.regionRepository.softRemove(region); 
    }

    async restore(id: string) {

      return await this.regionRepository.restore(id);
    }
    
    public async findOneOrFail(id: string): Promise<any> {
      const region = await this.findOne(id);
      if (!region) {
        throw new NotFoundException(`not_found`);
      }
      
      return region;
    }
}
