import { Department } from 'src/departments/entities/department.entity';
import { CommonEntity, StudentStatus } from 'src/shared';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'students' })
export class Student extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  departmentId: string;

  @Column()
  name: string;

  @Column()
  idNumber: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  sex: string;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.Active,
  })
  status: string;

  @ManyToOne(() => Department, (department) => department.students)
  @JoinColumn({ name: 'departmentId' })
  department: Department;
}
