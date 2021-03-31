import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

export interface IUsers {
  id: string;
  email: string;
  password: string;
  displayName?: string;
  profilePicture?: string;
  createdAt: Date;
}

@Entity()
class Users implements IUsers {
  @PrimaryColumn()
  readonly id: string;

  @Column({ name: 'email' })
  _email: string;

  @Column()
  password: string;

  @Column()
  displayName: string;

  @Column()
  profilePicture: string;

  @CreateDateColumn()
  createdAt: Date;

  get email() {
    return this._email.toUpperCase();
  }

  constructor() {
    if (!this.id) {
      this.id = uuid4().replace(/-/g, '');
    }
  }
}

export { Users };
