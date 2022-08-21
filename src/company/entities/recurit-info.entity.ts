import { UsersRecruitJoin } from "src/users/entities/user-recruit-join.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./company.entity";

@Entity('recruit_info')
export class RecruitInfo {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type : 'varchar'})
    nation : string;

    @Column({type : 'varchar'})
    area : string;

    @Column({type : 'varchar'})
    position : string;

    @Column({type : 'int'})
    reward : number;

    @Column({type : 'text', array : true})
    stack : string[];

    @Column({type : 'int'})
    companyId : number;

    @ManyToOne(type => Company, company => company.id)
    company : Company

    @OneToMany(type => UsersRecruitJoin, (recruitJoin) => recruitJoin.recruitId)
    recruitJoin : UsersRecruitJoin;
}
