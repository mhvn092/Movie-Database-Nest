import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('actor')
export class ActorEntity {

@PrimaryGeneratedColumn ()
id:number;

@Column()
name:string;

@ManyToMany(()=>MovieEntity,(movie)=>movie.actors, {cascade:true})
@JoinTable()
  movies: MovieEntity[];
}
