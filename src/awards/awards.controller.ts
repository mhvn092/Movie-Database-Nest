import { Controller, Get, Res } from '@nestjs/common';
import { AwardsService } from './awards.service';

@Controller('awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Get()
  a(){
    return '<h1>hello World, Welcome to this Year Awards</h1>'
  }
  @Get('Best-Movie')
  async b(){
    return `This year Best Movie Winner Is ${await this.awardsService.BestMovie()}`
  }

  @Get('Best-Actor')
  async c(){
    return `This year Best Actor Winner Is ${await this.awardsService.BestActor()}`
  }

  @Get('Best-Director')
  async d(){
    return `This year Best Director Winner Is ${await this.awardsService.BestDriector()}`
  }


  }
