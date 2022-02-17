import { BadRequestException, Catch, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { CreateJudgeDto } from './dtos/CreateJudgeDto.dto';
import { JudgeEntity } from './entity/judge-entity';
import { UpdateJudgeDto } from './dtos/UpdateJudgeDto.dto';
import { ActorService } from '../actor/actor.service';
import { DirectorService } from '../director/director.service';
import { MovieService } from '../movie/movie.service';
import { RoleEnum } from '../roles/roles.enum';
import { RolesService } from '../roles/roles.service';
import { UtilityService } from '../utility/utility.service';

@Injectable()
export class JudgeService {
  constructor(
    @InjectRepository(JudgeEntity)
    private readonly judgeRepository: Repository<JudgeEntity>,
    private readonly movieservice: MovieService,
    private readonly actorservie: ActorService,
    private readonly directorservice: DirectorService,
    private readonly utilityService: UtilityService,
    private readonly roleService: RolesService
  ) { }



  async create(judge: CreateJudgeDto) {

    const exists = this.judgeRepository.findOne({ username: judge.username })

    if (exists) {
      throw new ConflictException('username already exists')
    }

    judge.password = await this.utilityService.hash(judge.password);

    const roles = await Promise.all(judge.roles.filter(async (dup) => {
      if (judge.roles.some((b) => dup.includes(b))) {
        return false;
      } else { return true; }
    })
      .map(async (role) => {
        return await this.roleService.addRole(role as RoleEnum);
      }));

    const add = this.judgeRepository.create({
      ...judge,
      roles,
    });

    return this.judgeRepository.save(add);
  }

  async updateRole(id: number, data: UpdateJudgeDto) {
    const roles = await Promise.all(
      data.roles.filter(async (dup) => {
        const a = this.role(id)
        if ((await a).roles.some((b) => dup.includes(b.name))) {
          return false;
        } else {
          return true;
        }
      }).map(async (role) => {
        return await this.roleService.addRole(role as RoleEnum);
      }
      ),
    );

    const judge = await this.judgeRepository.preload({ id, ...data, roles });
    return this.judgeRepository.save(judge);
  }

  async role(sub: number) {
    return await this.judgeRepository
      .findOne(sub,{relations:['roles']})
  }

  findone(id: number) {
    return this.judgeRepository.findOne(id);
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
