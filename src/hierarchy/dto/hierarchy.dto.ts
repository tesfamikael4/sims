import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsUUID, IsString } from 'class-validator';
import { BatchEnum, DepartmentStatus, SemesterEnum } from 'src/shared';

export class CreateHierarchyDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shortName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ enum: BatchEnum })
  @IsEnum(BatchEnum)
  batch: number;

  @ApiProperty({ enum: SemesterEnum })
  @IsEnum(SemesterEnum)
  semester: number;

  @ApiProperty({ enum: DepartmentStatus })
  @IsEnum(DepartmentStatus)
  status: string;
}

export class UpdateHierarchyDto extends PartialType(CreateHierarchyDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
