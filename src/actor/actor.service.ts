import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { MovieService } from '../movie/movie.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ActorEntity } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    private readonly movieService:MovieService,

  ) { }
  create(createActorDto: CreateActorDto) {
    return this.actorRepository.create(createActorDto)
  }

  findAll() {
    return this.actorRepository.find()
  }

  findOne(id: number) {
    return this.actorRepository.findOne(id);
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorRepository.update(id, updateActorDto);
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }
  async vote(id: number) {
    let movie = await this.findOne(id);
    movie.Votes++;
    return this.actorRepository.save(movie);
  }
  async addjudge(id:number ,judge :JudgeEntity){
    let movie = await this.findOne(id);
    if (movie.Judges != undefined) {
      movie.Judges.push(judge);
    } else {
      movie.Judges = [judge];
    }
    return this.actorRepository.save(movie);
  }
  async Winner() {
    const query = this.actorRepository.createQueryBuilder("actor")
      .select("actor.id")
      .addSelect("MAX(actor.Votes)", "max")
      .groupBy("actor.id");
    const result = await query.getRawOne();
    let b = this.findOne(result.actor_id)
    return (await b).name;
  }
  async addMovie(id: number, refid: number) {

    const actor = await this.findOne(id);

    if (!actor) {
      throw new NotFoundException('actor Not Found');
    }

    const movie = await this.movieService.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Movie Not Found')
    }
    if (actor.movies != undefined) {
      actor.movies.push(movie);
    } else {
      actor.movies = [movie];
    }

    await this.actorRepository.save(actor)

    return actor;
  }
}
