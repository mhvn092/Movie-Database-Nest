import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenreService } from 'src/genre/genre.service';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { DirectorEntity } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorrepository: Repository<DirectorEntity> ,
    @Inject(forwardRef(() => GenreService))
    private readonly genreservice: GenreService,
    @Inject(forwardRef(() => MovieService))
    private readonly movieservice: MovieService){}
  
  create(createDirectorDto: CreateDirectorDto) {
    return this.directorrepository.create(createDirectorDto);
  }

  findAll() {
    return this.directorrepository.find();
  }

  findOne(id: number) {
    return this.directorrepository.findOne(id);
  }

  update(id: number, updateDirectorDto: UpdateDirectorDto) {
    return this.directorrepository.update(id,updateDirectorDto);
  }

  remove(id: number) {
    return this.directorrepository.delete(id);
  }


  async addMovie(id: number ,refid: number) {

    const director = await this.findOne(id);

    if (!director) {
      throw new NotFoundException('director Not Found');
    }

    const movie = await this.movieservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Movie Not Found')
    }
    if (director.movies != undefined) {
      director.movies.push(movie);
    } else {
      director.movies = [movie];
    }

    await this.directorrepository.save(director)

    return director;
  }

  async addGenre(id: number ,refid: number) {

    const director = await this.findOne(id);

    if (!director) {
      throw new NotFoundException('director Not Found');
    }

    const genre = await this.genreservice.findOne(refid);

    if (!genre) {
      throw new NotFoundException('Movie Not Found')
    }
    if (director.Genres != undefined) {
      director.Genres.push(genre);
    } else {
      director.Genres = [genre];
    }

    await this.directorrepository.save(director)

    return director;
  }

}
