import { Entity, Column, Index } from 'typeorm';
import { StarterEntity } from './starter.entity';

@Entity('projects')
export class Project extends StarterEntity {
  @Index()
  @Column({ name: 'remote_id', type: 'integer' })
  remoteId: number;

  @Column({ nullable: true })
  status: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'seo_url' })
  seoUrl: string;

  @Column()
  currency: string;

  @Column({ type: 'json', nullable: true })
  jobs: JSON;

  @Column({ name: 'submit_date' })
  submitDate: Date;

  @Column({ name: 'end_date', nullable: true })
  endDate: Date;

  @Column({ length: 20 })
  type: string;

  @Column({ name: 'bid_period', type: 'integer' })
  bidPeriod: number;

  @Column({ type: 'json', nullable: true })
  budget: JSON;

  @Column({ name: 'hourly_project_info', type: 'json', nullable: true })
  hourlyProjectInfo: JSON;

  @Column({ name: 'bid_stats', type: 'json', nullable: true })
  bidStats: JSON;

  @Column({ name: 'bids', type: 'json', nullable: true })
  bids: JSON;

  @Column({ name: 'time_submited' })
  timeSubmited: Date;

  @Column({ name: 'time_updated' })
  timeUpdated: Date;

  @Column({ name: 'language', length: 20 })
  language: string;

  @Column({ type: 'json', nullable: true })
  location: JSON;

  @Column({ name: 'true_location', type: 'json', nullable: true })
  trueLocation: JSON;

  @Column({ name: 'owner_info', type: 'json', nullable: true })
  ownerInfo: JSON;
}
