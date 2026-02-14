import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_on', nullable: false })
  createdOn: Date;

  @Column({ type: 'tinyint', width: 1, default: () => '0' })
  @Index()
  processed: boolean;

  @Index()
  @Column({ length: 20, nullable: false })
  status: string;

  @Column({ length: 50, nullable: false })
  handler: string;

  @Column({ type: 'json', nullable: false })
  payload: JSON;

  @Column({ name: 'start_processing_time', type: 'timestamp', nullable: true })
  startProcessingTime: Date | null;

  @Column({ name: 'end_processing_time', type: 'timestamp', nullable: true })
  endProcessingTime: Date | null;

  @Column({ type: 'text', nullable: true })
  result: string | null;

  @Column({ name: 'analytic_payload', type: 'json', nullable: true })
  analyticPayload: JSON;
}
