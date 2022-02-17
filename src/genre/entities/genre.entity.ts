
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { DirectorEntity } from "../../director/entities/director.entity";
import { MovieEntity } from "../../movie/entities/movie.entity";

@Entity('genre')
export class GenreEntity {
@PrimaryGeneratedColumn()
id: number;

@Column()
name: string;

@ManyToMany(() => MovieEntity, (movie) => movie.Genres)
movies: MovieEntity[];

@ManyToMany(() => DirectorEntity, (Director) => Director.Genres)
Directores: DirectorEntity[];
}

