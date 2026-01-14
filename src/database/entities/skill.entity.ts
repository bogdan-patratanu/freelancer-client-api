import { Entity, Column, Index } from 'typeorm';
import { StarterEntity } from './index';

@Entity('skills')
export class Skill extends StarterEntity {
  @Index()
  @Column({ name: 'remote_id', type: 'integer' })
  remoteId: number;

  @Column()
  name: string;

  @Column({type: 'json', nullable: true })
  categories: JSON;

  @Column()
  seoUrl: string;

  @Column()
  local: boolean;
}
