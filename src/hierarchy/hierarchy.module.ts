import { Module } from '@nestjs/common';
import { HierarchyService } from './hierarchy.service';
import { HierarchyController } from './hierarchy.controller';
import { Hierarchy } from './entities/hierarchy.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Hierarchy])],
  controllers: [HierarchyController],
  providers: [HierarchyService

  ],
})
export class HierarchyModule {}
