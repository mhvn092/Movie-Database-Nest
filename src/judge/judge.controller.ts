import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBody, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UnauthorizedFilter } from 'src/common/filter/unauthorized-filter.filter';
import { LocalAuthGuard } from 'src/common/guard/Local-guard.guard';
import { TokenGuard } from 'src/common/guard/token-guard.guard';
import { SimpleInterceptor } from 'src/common/interceptor/simple-interceptor.interceptor';
import { CreateJudgeDto } from './dtos/CreateJudgeDto.dto';
import { LoginDto } from './dtos/LoginDto.dto';
import { JudgeService } from './judge.service';

@Controller('judge')
@ApiTags('Judge')
@ApiUnauthorizedResponse({description:'you are not a judge bro'})
@ApiNotFoundResponse({description:'either your judge or nominee not found'})
@ApiBadRequestResponse({description:'YOU\'VE ALREADY VOTED JERRY'})
@UseFilters(UnauthorizedFilter)
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post()
  @ApiOperation({description:'signs up judges'})
  @ApiHeader({name: 'Token',description: 'Send Your token baby'})
  @UseGuards(TokenGuard)
  create(@Body() body:CreateJudgeDto) {
    return this.judgeService.create(body);
  }
  @Post('/login')
  @ApiOperation({description:'login judges'})
  @UseGuards(LocalAuthGuard)
  @ApiBody({type:LoginDto})
  Login(@Request() req){
    return req.user;
  }

  @Get()
  @ApiOperation({description:'get all them judges'})
  @UseInterceptors(SimpleInterceptor)
  findAll() {
    return this.judgeService.findAll();
  }

  @Delete(':id')
  @ApiHeader({name: 'Token',description: 'Send Your token baby'})
  @UseGuards(TokenGuard)
  @ApiOperation({description:'delete that judge'})
  remove(@Param('id') id: string) {
    return this.judgeService.remove(+id);
  }
  @Put("/:judgeId/Bestmovie/:movieId")
  @ApiOperation({description:'the judge choses his best movie'})
  @ApiHeader({name: 'Token',description: 'Send Your token baby'})
  @UseGuards(TokenGuard)
  @ApiBody({type:LoginDto})
  @UseGuards(LocalAuthGuard)
  movie(@Param('judgeId') judgeId, @Param('movieId') movieId) {
    return this.judgeService.BestMovie(+judgeId,+movieId);
  }
  @Put("/:judgeId/BestActor/:actorId")
  @ApiOperation({description:'the judge choses his best actor'})
  @ApiHeader({name: 'Token',description: 'Send Your token baby'})
  @UseGuards(TokenGuard)
  @ApiBody({type:LoginDto})
  @UseGuards(LocalAuthGuard)
  actor(@Param('judgeId') judgeId: string, @Param('actorId') actorId: string) {
    return this.judgeService.BestActor(+judgeId,+actorId);
  }
  @Put("/:judgeId/BestDirector/:diecrtorId")
  @ApiOperation({description:'the judge choses his best director'})
  @ApiHeader({name: 'Token',description: 'Send Your token baby'})
  @UseGuards(TokenGuard)
  @ApiBody({type:LoginDto})
  @UseGuards(LocalAuthGuard)
  director(@Param('judgeId') judgeId: string, @Param('diecrtorId') diecrtorId: string) {
    return this.judgeService.BestDirector(+judgeId,+diecrtorId);
  }
}
