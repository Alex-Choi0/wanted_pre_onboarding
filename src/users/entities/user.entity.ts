import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UsersRecruitJoin } from "./user-recruit-join.entity";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id : number;

    @Column({type : 'varchar'})
    name : string

    @OneToMany(type => UsersRecruitJoin, (recruitJoin) => recruitJoin.userId)
    recruitJoin : UsersRecruitJoin;
}
