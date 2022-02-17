import { Exclude } from "class-transformer";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ActorEntity } from "../../actor/entities/actor.entity";
import { DirectorEntity } from "../../director/entities/director.entity";
import { MovieEntity } from "../../movie/entities/movie.entity";
import { RoleEntity } from "../../roles/entities/role.entity";

@Entity('judge')
export class JudgeEntity {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column({unique:true})
    username:string;

    @Column()
    @Exclude()
    password:string;

    @ManyToOne(()=>MovieEntity,(movie)=>movie.Judges)
    @JoinColumn()
    BestMovie:MovieEntity;

    @ManyToOne(()=>ActorEntity,(actor)=>actor.Judges)
    @JoinColumn()
    BestActor:ActorEntity;

    @ManyToOne(()=>DirectorEntity,(director)=>director.Judges)
    @JoinColumn()
    BestDirector:DirectorEntity;

    @ManyToMany(()=>RoleEntity,(role)=>role.judges)
    @JoinTable()
    roles:RoleEntity[];
}
