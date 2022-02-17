import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { GenreEntity } from "../../genre/entities/genre.entity";
import { JudgeEntity } from "../../judge/entity/judge-entity";
import { MovieEntity } from "../../movie/entities/movie.entity";

@Entity('director')
export class DirectorEntity {
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@Column(
    {default:0}
)
Votes:number;

@OneToMany(()=>JudgeEntity,(judge)=>judge.BestDirector)
Judges:JudgeEntity[];

@OneToMany(()=>MovieEntity, (Movie)=>Movie.Director)
movies: MovieEntity[];

@ManyToMany(()=>GenreEntity,(genre)=>genre.Directores,{cascade:true})
@JoinTable()
Genres:GenreEntity[];

}
