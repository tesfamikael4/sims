import { CasedStatus, CommonEntity } from "src/shared";
import { Student } from "src/students/entities/student.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'regions' })
export class Region extends CommonEntity {
   @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  shortCode: string;

  @Column({
   type: 'enum',
   enum: CasedStatus,
   default: CasedStatus.No,
 })
  emerging: string;

  @OneToMany(() => Student, (student) => student.region, {
   cascade: true,
 })
 students: Student[];
}
