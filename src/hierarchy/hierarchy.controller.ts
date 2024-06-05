import { Hierarchy } from './entities/hierarchy.entity';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { CreateHierarchyDto, UpdateHierarchyDto } from './dto/hierarchy.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('hierarchy')
export class HierarchyController {
  constructor(private readonly hierarchyService: HierarchyService) {}

  @Post()
  @ApiOkResponse({ type: UpdateHierarchyDto })
  create(@Body() createHierarchyDto: CreateHierarchyDto) {
    return this.hierarchyService.create(createHierarchyDto);
  }

  @Get()
  findAll() {
    return this.hierarchyService.findAll();
  }

  @Get(':id')
  @ApiQuery({
    name: 'includes',
    type: String,
    description: 'Collection Query Parameter. Optional',
    required: false,
  })
  findOne(@Param('id') id: string, @Query('includes') includes: string) {
    console.log('includes', includes);
    return this.hierarchyService.findOne(id, includes);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateHierarchyDto })
  update(
    @Param('id') id: string,
    @Body() updateHierarchyDto: UpdateHierarchyDto,
  ) {
    return this.hierarchyService.update(id, updateHierarchyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hierarchyService.remove(id);
  }
}
