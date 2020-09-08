/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import users from './user';

@Entity('people')
class people {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => users)
  @JoinColumn({ name: 'id_user' })
  id_user: string;

  @Column()
  name: string;

  @Column()
  fone: string;

  @Column()
  email: string;

  @Column()
  file: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default people;
