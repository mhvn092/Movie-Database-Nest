import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token-guard.guard';
import { SimpleInterceptor } from 'src/common/interceptor/simple-interceptor.interceptor';
import { JudgeService } from './judge.service';

@Controller('judge')
@ApiTags('Judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post()
  @UseGuards(TokenGuard)
  create(@Body() body) {
    return this.judgeService.create(body);
  }

  @Get()
  @UseInterceptors(SimpleInterceptor)
  findAll() {
    return this.judgeService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.judgeService.remove(+id);
  }
  @Put("/:judgeId/Bestmovie/:movieId")
  @UseGuards(TokenGuard)
  movie(@Param('judgeId') judgeId, @Param('movieId') movieId) {
    return this.judgeService.BestMovie(+judgeId,+movieId);
  }
  @Put("/:judgeId/BestActor/:actorId")
  @UseGuards(TokenGuard)
  actor(@Param('judgeId') judgeId: string, @Param('actorId') actorId: string) {
    return this.judgeService.BestActor(+judgeId,+actorId);
  }
  @Put("/:judgeId/BestDirector/:diecrtorId")
  @UseGuards(TokenGuard)
  director(@Param('judgeId') judgeId: string, @Param('diecrtorId') diecrtorId: string) {
    return this.judgeService.BestDirector(+judgeId,+diecrtorId);
  }
}
