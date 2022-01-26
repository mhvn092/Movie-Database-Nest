import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { ActorEntity } from './entities/actor.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(ActorEntity)
    private readonly actorRepository: Repository<ActorEntity>,
    @Inject(forwardRef(() => MovieService))
    private readonly movieservice: MovieService,

  ){}
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
    return this.actorRepository.update(id,updateActorDto);
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }
  
  async addMovie(id: number ,refid: number) {

    const actor = await this.findOne(id);

    if (!actor) {
      throw new NotFoundException('actor Not Found');
    }

    const movie = await this.movieservice.findOne(refid);

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
