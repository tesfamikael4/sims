import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmpty, IsEnum, IsNotEmpty, IsUUID } from "class-validator";
import { DepartmentStatus, UserRole } from "src/shared";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsEmpty()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsNotEmpty()
    middleName: string;

    @ApiProperty()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsNotEmpty()
    profile: string;

    @ApiProperty({ enum: UserRole })
    @IsEnum(UserRole)
    role: string;

    @ApiProperty()
    @IsEmpty()
    emailVerified: Date | null;

    @ApiProperty({ enum: DepartmentStatus})
    @IsEnum(DepartmentStatus)
    status: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id: string;
}