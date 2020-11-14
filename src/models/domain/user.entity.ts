import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name?: string;

  @Column()
  email?: string;

  @Column()
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
