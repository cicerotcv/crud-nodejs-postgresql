import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

export interface IAbilities {
  id: string;
  name: string;
  value: string;
  label: string;
  createdAt: Date;
}

@Entity()
class Abilities implements IAbilities {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ name: 'label' })
  label: string;

  @CreateDateColumn({type:"timestamp"})
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4().replace(/-/g, '');
    }
  }
}

export { Abilities };
