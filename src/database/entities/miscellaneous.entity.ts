import {
    Column, CreateDateColumn,
    Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn,
} from 'typeorm';
import {StarterEntity} from './starter.entity';

@Entity('miscellaneous')
@Unique(['area', 'code', 'name'])
export class Miscellaneous extends StarterEntity{
    @Index()
    @Column({length: 50, nullable: false})
    area: string;

    @Index()
    @Column({length: 50, nullable: true})
    code: string;

    @Index()
    @Column({length: 500, nullable: false})
    name: string;

    @Column({name: 'data_block', type: 'json', nullable: true})
    dataBlock: JSON;

    @Index()
    @Column({nullable: true})
    position: number;

    @Index()
    @Column({name: 'is_active', default: true, nullable: true})
    isActive: boolean;

    @Index()
    @ManyToOne(type => Miscellaneous, {nullable: true})
    @JoinColumn({name: 'parent_id_'})
    parent: Miscellaneous;
}
