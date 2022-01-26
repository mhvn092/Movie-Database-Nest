import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DirectorService } from 'src/director/director.service';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreEntity } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(GenreEntity)
    private readonly genrerepository: Repository<GenreEntity>,
    @Inject(forwardRef(() => MovieService))
    private readonly movieservice: MovieService,
    @Inject(forwardRef(() => DirectorService))
    private readonly directorservice: DirectorService){}
  create(createGenreDto: CreateGenreDto) {
    return this.genrerepository.create(createGenreDto);
  }

  findAll() {
    return this.genrerepository.find();
  }

  findOne(id: number) {
    return this.genrerepository.findOne(id);
  }

  update(id: number, updateGenreDto: UpdateGenreDto) {
    return this.genrerepository.update(id,updateGenreDto);
  }

  remove(id: number) {
    return this.genrerepository.delete(id);
  }

  async addMovie(id: number ,refid: number) {

    const genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException('director Not Found');
    }

    const movie = await this.movieservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Movie Not Found')
    }
    if (genre.movies != undefined) {
      genre.movies.push(movie);
    } else {
      genre.movies = [movie];
    }

    await this.genrerepository.save(genre)

    return genre;
  }
  
  async addDirector(id: number ,refid: number) {

    const genre = await this.findOne(id);

    if (!genre) {
      throw new NotFoundException('director Not Found');
    }

    const director = await this.directorservice.findOne(refid);

    if (!genre) {
      throw new NotFoundException('Movie Not Found')
    }
    if (genre.Directores != undefined) {
      genre.Directores.push(director);
    } else {
      genre.Directores = [director];
    }

    await this.genrerepository.save(director)

    return director;
  }
}
