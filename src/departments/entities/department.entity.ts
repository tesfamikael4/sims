import { Hierarchy } from 'src/hierarchy/entities/hierarchy.entity';
import { CommonEntity, DepartmentStatus } from 'src/shared';
import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'departments' })
export class Department extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  shortName: string;

  @Column ()
  intakeCapacity: number;

  @Column({
    type: 'enum',
    enum: DepartmentStatus,
    default: DepartmentStatus.Active,
  })
  status: string;

  @OneToMany(() => Student, (student) => student.department, {
    cascade: true,
  })
  students: Student[];
  @ManyToOne(() => Hierarchy, (hierarchy) => hierarchy.departments)
  @JoinColumn({ name: 'hierarchyId' })
  hierarchy: Hierarchy;
}
