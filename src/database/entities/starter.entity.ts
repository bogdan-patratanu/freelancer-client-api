import {CreateDateColumn, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {User} from "./index";

export abstract class StarterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: 'created_on', nullable: true})
    createdOn: Date;

    @Index()
    @ManyToOne(type => User, {nullable: true})
    @JoinColumn({name: 'created_by'})
    createdBy: User;

    @UpdateDateColumn({name: 'updated_on', nullable: true})
    updatedOn: Date;

    @Index()
    @ManyToOne(type => User, {nullable: true})
    @JoinColumn({name: 'updated_by'})
    updatedBy: User;
}