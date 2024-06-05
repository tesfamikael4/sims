import { Department } from 'src/departments/entities/department.entity';
import { Region } from 'src/region/entities/region.entity';
import { CasedStatus, CommonEntity, StudentStatus } from 'src/shared';
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
  currentDepartmentId: string;

  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  studentUniversityId: string;

  @Column({ nullable: false })
  universityEntrance: number;

  @Column()
  cgpa: number;

  @Column({ default: 0 })
  fieldEntrance: number;

  @Column()
  gender: string;

  @Column()
  regionId: string;

  @Column({
    type: 'enum',
    enum: CasedStatus,
    default: CasedStatus.No,
  })
  handCaped: string;

  @Column({
    type: 'enum',
    enum: CasedStatus,
    default: CasedStatus.No,
  })
  specialCased: string;

  @Column({
    type: 'enum',
    enum: StudentStatus,
    default: StudentStatus.Active,
  })
  status: string;

  @ManyToOne(() => Department, (department) => department.students)
  @JoinColumn({ name: 'currentDepartmentId' })
  department: Department;

  @ManyToOne(() => Region, (region) => region.students)
  @JoinColumn({ name: 'regionId' })
  region: Region;
}
