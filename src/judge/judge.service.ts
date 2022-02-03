import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActorService } from 'src/actor/actor.service';
import { DirectorService } from 'src/director/director.service';
import { MovieService } from 'src/movie/movie.service';
import { IsNull, Repository } from 'typeorm';
import { CreateJudgeDto } from './dtos/CreateJudgeDto.dto';
import { JudgeEntity } from './entity/judge-entity';
import { hashSync, compare } from 'bcrypt';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class JudgeService {
  constructor(
    @InjectRepository(JudgeEntity)
    private readonly judgeRepository: Repository<JudgeEntity>,
    private readonly movieservice: MovieService,
    private readonly actorservie: ActorService,
    private readonly directorservice: DirectorService,
    private readonly utilityService:UtilityService,
  ) { }


    
  async create(judge: CreateJudgeDto) {
    judge.password = await this.utilityService.hash(judge.password);
    this.judgeRepository.create(judge);
    return this.judgeRepository.save(judge);

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
      throw new NotFoundException('Movie Not Found');
    }

    const vote = await this.judgeRepository.findOne(id, {
      where: { BestMovie: IsNull() }
    })
    if (vote) {
      await this.movieservice.addjudge(refid, judge);
      await this.movieservice.vote(refid);
      await this.judgeRepository.save(judge)
      return judge;
    }
    else {
      throw new BadRequestException('Already Voted');
    }

  }

  async BestActor(id: number, refid: number) {
    const judge = await this.judgeRepository.findOne(id);

    if (!judge) {
      throw new NotFoundException('Judge Not Found');
    }

    const movie = await this.actorservie.findOne(refid);

    if (!movie) {
      throw new NotFoundException('actor Not Found');
    }

    const vote = await this.judgeRepository.findOne(id, {
      where: { BestActor: IsNull() }
    })
    if (vote) {
      await this.actorservie.addjudge(refid, judge);
      await this.actorservie.vote(refid);
      await this.judgeRepository.save(judge)
      return judge;
    }
    else {
      throw new BadRequestException('Already Voted')
    }
  }

  async BestDirector(id: number, refid: number) {
    const judge = await this.judgeRepository.findOne(id);

    if (!judge) {
      throw new NotFoundException('Judge Not Found');
    }

    const movie = await this.directorservice.findOne(refid);

    if (!movie) {
      throw new NotFoundException('director Not Found');
    }

    const vote = await this.judgeRepository.findOne(id, {
      where: { BestDirector: IsNull() }
    })
    if (vote) {
      await this.directorservice.addjudge(refid, judge)
      await this.directorservice.vote(refid);
      await this.judgeRepository.save(judge)

      return judge;
    }
    else {
      throw new BadRequestException('Already Voted');
    }
  }
}
