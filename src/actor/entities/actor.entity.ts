import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { JudgeEntity } from "../../judge/entity/judge-entity";
import { MovieEntity } from "../../movie/entities/movie.entity";

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
