import {  Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { ActorRepository } from '../repositories/actorRepository.Repository';
import { DirectorRepository } from '../repositories/directorRepository.Repository';
import { GenreRepository } from '../repositories/genreRepository.Repositroy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MovieEntity } from './entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
  @InjectRepository(MovieEntity)
  private readonly movieRepository: Repository<MovieEntity>,
  private readonly directorRepository: DirectorRepository,
  private readonly genreRepository: GenreRepository,
  private readonly actorepository: ActorRepository
  ){}
  create(createMovieDto: CreateMovieDto) {
    this.movieRepository.create(createMovieDto);
    return this.movieRepository.save(createMovieDto);
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

  async Winner() {
    const query = this.movieRepository.createQueryBuilder("movie")
    .select("movie.id")
    .addSelect("MAX(movie.Votes)","max")
    .groupBy("movie.id");
    const result = await query.getRawOne();
    let b = this.findOne(result.movie_id)
    return (await b).name;
  }
  async vote(id:number){
    let movie = await this.findOne(id);
    movie.Votes++;
    return this.movieRepository.save(movie);
  }
  async addjudge(id:number ,judge :JudgeEntity){
    let movie = await this.findOne(id);
    if (movie.Judges != undefined) {
      movie.Judges.push(judge);
    } else {
      movie.Judges = [judge];
    }
    return this.movieRepository.save(movie);
  }
  async addGenre(id: number ,refid: number) {

    const movie = await this.findOne(id);

    if (!movie) {
      throw new NotFoundException('movie Not Found');
    }

    const genre = await this.genreRepository.findOne(refid);

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

    const actor = await this.actorepository.findOne(refid);

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

    const director = await this.directorRepository.findOne(refid);

    if(!director){
      throw new NotFoundException('movie Not Found');
    }

    if (movie.Director != undefined) {
      console.log("if 1",movie.Director);
      movie.Director = director;
    } else {
        movie.Director = director;
    }
    this.movieRepository.save(movie);
     return movie;
  }

}
