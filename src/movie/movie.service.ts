import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorService } from 'src/actor/actor.service';
import { DirectorService } from 'src/director/director.service';
import { GenreService } from 'src/genre/genre.service';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
  @InjectRepository(MovieEntity)
  private readonly movieRepository: Repository<MovieEntity>,
  @Inject(forwardRef(() => DirectorService))
  private readonly directorservice: DirectorService,
  @Inject(forwardRef(() => GenreService))
  private readonly genreservice: GenreService,
  @Inject(forwardRef(() => ActorService))
  private readonly actorservice: ActorService
  ){}
  create(createMovieDto: CreateMovieDto) {
    return this.movieRepository.create(createMovieDto);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository.findOne(id);
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return this.movieRepository.update(id,updateMovieDto);
  }

  remove(id: number) {
    return this.movieRepository.delete(id);
  }

  async addGenre(id: number ,refid: number) {

    const movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException('movie Not Found');
    }

    const genre = await this.genreservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Movie Not Found')
    }
    if (movie.Genres != undefined) {
      movie.Genres.push(genre);
    } else {
      movie.Genres = [genre];
    }

    await this.movieRepository.save(movie)

    return movie;
  }

  async addActor(id: number ,refid: number) {

    const movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException('movie Not Found');
    }

    const actor = await this.actorservice.findOne(refid);

    if (!actor) {
      throw new NotFoundException('actor Not Found')
    }
    if (movie.actors != undefined) {
      movie.actors.push(actor);
    } else {
      movie.actors = [actor];
    }

    return await this.movieRepository.save(movie);

    
  }
  async SetDirector(id:number, refid: number){
    const movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException('movie Not Found');
    }

    const director = await this.directorservice.findOne(refid);

    if(!director){
      throw new NotFoundException('movie Not Found');
    }

    if (movie.Director != undefined) {
      console.log("if 1",movie.Director);
      movie.Director = director;
    } else {
        movie.Director = director;
    }
  }

}
