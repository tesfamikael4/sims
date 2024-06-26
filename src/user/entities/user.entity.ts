import { CommonEntity, DepartmentStatus, UserRole } from 'src/shared';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity({ name: 'users' })

export class User extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    middleName: string;

    @Column()
    lastName: string;

    @Column()
    profile: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.Admin
    })
    role: string;

    @Column({ type: 'timestamp', nullable: true })
    emailVerified: Date | null;

    @Column({
        type: 'enum',
        enum: DepartmentStatus,
        default: DepartmentStatus.Active
    })
    status: string;
}
