import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { MovieService } from '../movie/movie.service';
import { GenreRepository } from '../repositories/genreRepository.Repositroy';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';
import { DirectorEntity } from './entities/director.entity';

@Injectable()
export class DirectorService {
  constructor(
    @InjectRepository(DirectorEntity)
    private readonly directorrepository: Repository<DirectorEntity> ,
    private readonly genreRepository:GenreRepository,
    private readonly movieService: MovieService){}
  
  create(createDirectorDto: CreateDirectorDto) {
    this.directorrepository.create(createDirectorDto);
    return this.directorrepository.save(createDirectorDto);
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

  async Winner() {
    const query = this.directorrepository.createQueryBuilder("director")
    .select("director.id")
    .addSelect("MAX(director.Votes)","max")
    .groupBy("director.id");
    const result = await query.getRawOne();
    let b = this.findOne(result.director_id)
    return (await b).name;
  }

  async addjudge(id:number ,judge :JudgeEntity){
    let movie = await this.findOne(id);
    if (movie.Judges != undefined) {
      movie.Judges.push(judge);
    } else {
      movie.Judges = [judge];
    }
    return this.directorrepository.save(movie);
  }

  async vote(id:number){
    let movie = await this.findOne(id);
    movie.Votes++;
    return this.directorrepository.save(movie);}

  async addMovie(id: number ,refid: number) {

    const director = await this.findOne(id);

    if (!director) {
      throw new NotFoundException('director Not Found');
    }

    const movie = await this.movieService.findOne(refid);

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

    const genre = await this.genreRepository.findOne(refid);

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
