import { Entity, Column } from 'typeorm';
import { StarterEntity } from './starter.entity';

@Entity('analytics')
export class Analytic extends StarterEntity {
  @Column({ name: 'active_start_count', type: 'integer' })
  activeStartCount: number;

  @Column({ name: 'active_end_count', type: 'integer' })
  activeEndCount: number;

  @Column({ type: 'json', nullable: true })
  data: JSON;
}
