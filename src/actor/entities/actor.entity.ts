import { JudgeEntity } from "src/judge/entity/judge-entity";
import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('actor')
export class ActorEntity {

@PrimaryGeneratedColumn ()
id:number;

@Column()
name:string;

@Column(
  {default:0}
)
Votes:number;

@OneToMany(()=>JudgeEntity,(judge)=>judge.BestActor)
Judges:JudgeEntity[];

@ManyToMany(()=>MovieEntity,(movie)=>movie.actors, {cascade:true})
@JoinTable()
  movies: MovieEntity[];
}
