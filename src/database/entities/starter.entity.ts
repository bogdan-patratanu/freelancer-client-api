import {CreateDateColumn, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

export abstract class StarterEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({name: 'created_on', nullable: true})
    createdOn: Date;

    @Index()
    @ManyToOne(() => require("./user.entity").User, {nullable: true})
    @JoinColumn({name: 'created_by'})
    createdBy: any;

    @UpdateDateColumn({name: 'updated_on', nullable: true})
    updatedOn: Date;

    @Index()
    @ManyToOne(() => require("./user.entity").User, {nullable: true})
    @JoinColumn({name: 'updated_by'})
    updatedBy: any;
}