import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

export interface IUsers {
  id: string;
  email: string;
  password: string;
  displayName?: string;
  profilePicture?: string;
  createdAt: Date;
}

@Entity('users')
class Users implements IUsers {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4().replace(/-/g, '');
    }
  }
}

export { Users };
