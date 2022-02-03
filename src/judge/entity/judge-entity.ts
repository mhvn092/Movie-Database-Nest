import { Exclude } from "class-transformer";
import { ActorEntity } from "src/actor/entities/actor.entity";
import { DirectorEntity } from "src/director/entities/director.entity";
import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
}
