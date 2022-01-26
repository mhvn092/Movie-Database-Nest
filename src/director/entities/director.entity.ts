import { GenreEntity } from "src/genre/entities/genre.entity";
import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('director')
export class DirectorEntity {
@PrimaryGeneratedColumn()
id:number;

@Column()
name:string;

@OneToMany(()=>MovieEntity, (Movie)=>Movie.Director)
movies: MovieEntity[];

@ManyToMany(()=>GenreEntity,(genre)=>genre.Directores,{cascade:true})
@JoinTable()
Genres:GenreEntity[];

}
