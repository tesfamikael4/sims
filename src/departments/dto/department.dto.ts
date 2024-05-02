import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum, IsUUID, IsString } from 'class-validator';
import { StudentStatus } from 'src/shared';

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ enum: StudentStatus })
  @IsEnum(StudentStatus)
  status: string;
}

export class UpdateDepartmentDto extends PartialType(CreateDepartmentDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
