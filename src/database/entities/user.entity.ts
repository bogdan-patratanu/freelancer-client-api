import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { StarterEntity } from './starter.entity';

@Entity({name: 'users'})
export class User  extends StarterEntity{
  @Column({length: 250, nullable: false})
  name: string;

  @Column({length: 250, nullable: false, unique: true})
  email: string;

  @Column({length: 100, nullable: true})
  password: string;

  @Column({default: true})
  isActive: boolean;
}
