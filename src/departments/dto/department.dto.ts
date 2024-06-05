import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsUUID, IsString, IsNumber } from 'class-validator';
import { DepartmentStatus } from 'src/shared';

export class CreateDepartmentDto {
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
  @IsNumber()
  intakeCapacity: number;

  @ApiProperty({ enum: DepartmentStatus })
  @IsEnum(DepartmentStatus)
  status: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
