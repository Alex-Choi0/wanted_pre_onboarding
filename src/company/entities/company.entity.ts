import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RecruitInfo } from "./recurit-info.entity";

@Entity('company')
export class Company {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type : 'varchar'})
    name : string;

    @OneToMany(type => RecruitInfo, recruit => recruit.company)
    recruits : RecruitInfo[];
    
}
