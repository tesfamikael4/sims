import { Department } from 'src/departments/entities/department.entity';
import { BatchEnum, CommonEntity, DepartmentStatus, SemesterEnum } from 'src/shared';

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'hierarchy' })
export class Hierarchy extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  shortName: string;

  @Column ({ nullable: false })
  description: string;

  @Column ({ 
    type: 'enum',
    enum: BatchEnum,
    default: BatchEnum.One
   })
  batch: number;

  @Column ({ 
    type: 'enum',
    enum: SemesterEnum,
    default: SemesterEnum.One
  })
  semester: number;

  @Column({
    type: 'enum',
    enum: DepartmentStatus,
    default: DepartmentStatus.Active,
  })
  status: string;

  @OneToMany(() => Department, (department) => department.hierarchy, {
    cascade: true,
  })
  departments: Department[];
}
