import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorService } from 'src/actor/actor.service';
import { ActorEntity } from 'src/actor/entities/actor.entity';
import { DirectorService } from 'src/director/director.service';
import { MovieEntity } from 'src/movie/entities/movie.entity';
import { MovieService } from 'src/movie/movie.service';
import { Repository } from 'typeorm';
import { JudgeEntity } from './entity/judge-entity';

@Injectable()
export class JudgeService {
  constructor(
    @InjectRepository(JudgeEntity)
    private readonly judgeRepository: Repository<JudgeEntity>,
    private readonly movieservice: MovieService,
    private readonly actorservie: ActorService,
    private readonly directorservice: DirectorService,
  ) { }

  create(name: JudgeEntity) {
    this.judgeRepository.create(name);
    return this.judgeRepository.save(name);

  }
  findAll() {
    return this.judgeRepository.find()
  }
  remove(id: number) {
    return this.judgeRepository.delete(id);
  }
  async BestMovie(id: number, refid: number) {
    const judge = await this.judgeRepository.findOne(id);

    if (!judge) {
      throw new NotFoundException('Judge Not Found');
    }

    const movie = await this.movieservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Judge Not Found');
    }


    if (movie.Judges != undefined) {
      movie.Judges.push(judge);

    } else {
      movie.Judges = [judge];

    }
    await this.movieservice.vote(id);

    await this.judgeRepository.save(judge)

    return judge;

  }

  async BestActor(id: number, refid: number) {
    const judge = await this.judgeRepository.findOne(id);

    if (!judge) {
      throw new NotFoundException('Judge Not Found');
    }

    const movie = await this.actorservie.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Judge Not Found');
    }
    await this.actorservie.vote(id);

    if (movie.Judges != undefined) {
      movie.Judges.push(judge);
    } else {
      movie.Judges = [judge];
    }

    await this.judgeRepository.save(judge)

    return judge;

  }

  async BestDirector(id: number, refid: number) {
    const judge = await this.judgeRepository.findOne(id);

    if (!judge) {
      throw new NotFoundException('Judge Not Found');
    }

    const movie = await this.directorservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('Judge Not Found');
    }
    await this.directorservice.vote(id);

    if (movie.Judges != undefined) {
      movie.Judges.push(judge);
    } else {
      movie.Judges = [judge];
    }

    await this.judgeRepository.save(judge)

    return judge;

  }
}
