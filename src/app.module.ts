import { Module } from '@nestjs/common';
import { StudentsModule } from './students/students.module';
import { DepartmentsModule } from './departments/departments.module';
import { HierarchyModule } from './hierarchy/hierarchy.module';
import { RegionModule } from './region/region.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => ({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sims',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }) 
  }),
    StudentsModule,
    DepartmentsModule,
    HierarchyModule,
    RegionModule
  ]
})
export class AppModule {}
