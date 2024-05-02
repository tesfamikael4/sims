// create-student.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { StudentStatus } from 'src/shared';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  departmentId: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  idNumber: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsOptional()
  sex: string;

  @ApiProperty({ enum: StudentStatus })
  @IsEnum(StudentStatus)
  status: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
