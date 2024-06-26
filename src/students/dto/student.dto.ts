// create-student.dto.ts

import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { CasedStatus, StudentStatus } from 'src/shared';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  currentDepartmentId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  regionId: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
  
  @ApiProperty()
  @IsNotEmpty()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  studentUniversityId: string;

  @ApiProperty()
  @IsOptional()
  cgpa: number;

  @ApiProperty()
  @IsOptional()
  universityEntrance: number;

  @ApiProperty()
  @IsOptional()
  fieldEntrance: number;

  @ApiProperty()
  @IsOptional()
  gender: string;

  @ApiProperty()
  @IsOptional()
  batch: number;

  @ApiProperty()
  @IsOptional()
  semester: number;

  @ApiProperty({ enum: CasedStatus })
  @IsEnum(CasedStatus)
  handCaped: string;

  @ApiProperty({ enum: CasedStatus })
  @IsEnum(CasedStatus)
  specialCased: string;

  @ApiProperty({ enum: StudentStatus })
  @IsOptional()
  @IsEnum(StudentStatus)
  status: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
