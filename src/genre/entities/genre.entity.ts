import { DirectorEntity } from "src/director/entities/director.entity";
import { MovieEntity } from "src/movie/entities/movie.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

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

