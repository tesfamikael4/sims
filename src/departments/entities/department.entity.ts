import { CommonEntity } from 'src/shared';
import { Student } from 'src/students/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'departments' })
export class Department extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: 'Active' })
  status: string;

  @OneToMany(() => Student, (student) => student.department, {
    cascade: true,
  })
  students: Student[];
}
