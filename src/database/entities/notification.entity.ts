import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'created_on',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdOn: Date;

  @Column({ length: 250, nullable: false })
  subject: string;

  @Column({ length: 250, nullable: false })
  body: string;

  @Column({ name: 'is_read', default: false })
  isRead: boolean;

  @Column({ name: 'data_block', type: 'json', nullable: true })
  dataBlock: JSON;
}
