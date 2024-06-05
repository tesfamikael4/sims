import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator";
import { CasedStatus } from "src/shared";

export class CreateRegionDto {
   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   name: string;

   @ApiProperty()
   @IsNotEmpty()
   @IsString()
   shortCode: string;

   @ApiProperty({ enum: CasedStatus })
   @IsEnum(CasedStatus)
   status: string;
}

export class UpdateRegionDto extends PartialType (CreateRegionDto){
   @ApiProperty()
   @IsNotEmpty()
   @IsUUID()
   id: string;
}