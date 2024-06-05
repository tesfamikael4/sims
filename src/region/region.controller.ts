import { 
   Body, 
   Controller, 
   Post 
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/region.dto';

@Controller('regions')
export class RegionController {
   constructor(private readonly regionService: RegionService){ }

   @Post()
   create(@Body() createRegionDto: CreateRegionDto){

      return this.regionService.create(createRegionDto);
   }
}
