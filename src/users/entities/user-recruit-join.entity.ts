import { RecruitInfo } from "src/company/entities/recurit-info.entity";
import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('users_recruit_join')
export class UsersRecruitJoin{

    @CreateDateColumn({ readonly: true })
    created_at: Date;

    @PrimaryColumn('int')
    userId : number;

    @PrimaryColumn('int')
    recruitId : number;


    @ManyToOne(type => User, (user) => user.id, {
        onDelete : 'CASCADE'
    })
    user : User;

    @ManyToOne(type => RecruitInfo, (recruit) => recruit.id, {
        onDelete : 'CASCADE'
    })
    recruit : RecruitInfo;
}