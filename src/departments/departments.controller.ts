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
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from './dto/department.dto';
import { ApiOkResponse, ApiQuery } from '@nestjs/swagger';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  @ApiOkResponse({ type: UpdateDepartmentDto })
  create(@Body() createDepartmentDto: CreateDepartmentDto) {
    return this.departmentsService.create(createDepartmentDto);
  }

  @Get()
  findAll() {
    return this.departmentsService.findAll();
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
    return this.departmentsService.findOne(id, includes);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateDepartmentDto })
  update(
    @Param('id') id: string,
    @Body() updateDepartmentDto: UpdateDepartmentDto,
  ) {
    return this.departmentsService.update(id, updateDepartmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentsService.remove(id);
  }
}
