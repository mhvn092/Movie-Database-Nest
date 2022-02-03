import { Controller, Get, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AwardsService } from './awards.service';

@Controller('awards')
@ApiTags('Awards')
export class AwardsController {
  constructor(private readonly awardsService: AwardsService) {}

  @Get()
  @ApiOperation({description:'welcome page'})
  a(){
    return '<h1>hello World, Welcome to this Year Awards</h1>'
  }
  @Get('Best-Movie')
  @ApiOperation({description:'best movie page'})
  async b(){
    return `This year Best Movie Winner Is ${await this.awardsService.BestMovie()}`
  }

  @Get('Best-Actor')
  @ApiOperation({description:'best actor page'})
  async c(){
    return `This year Best Actor Winner Is ${await this.awardsService.BestActor()}`
  }

  @Get('Best-Director')
  @ApiOperation({description:'best director page'})
  async d(){
    return `This year Best Director Winner Is ${await this.awardsService.BestDriector()}`
  }


  }
