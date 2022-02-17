import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActorEntity } from "../../actor/entities/actor.entity";
import { DirectorEntity } from "../../director/entities/director.entity";
import { GenreEntity } from "../../genre/entities/genre.entity";
import { JudgeEntity } from "../../judge/entity/judge-entity";

@Entity('movie')
export class MovieEntity {

@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@Column({default:0})
Votes:number;

@OneToMany(()=>JudgeEntity,(judge)=>judge.BestMovie)
Judges:JudgeEntity[];

@ManyToOne(()=>DirectorEntity, (Director)=> Director.movies)
@JoinColumn()
Director:DirectorEntity;

@ManyToMany(()=>ActorEntity, (actor)=>actor.movies)
actors: ActorEntity[];
  
@ManyToMany(()=>GenreEntity,(genre)=>genre.movies,{cascade:true})
@JoinTable()
Genres:GenreEntity[];
  movie: Promise<DirectorEntity>;

}
