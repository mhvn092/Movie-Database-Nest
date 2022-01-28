import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { JudgeService } from './judge.service';

@Controller('judge')
export class JudgeController {
  constructor(private readonly judgeService: JudgeService) {}

  @Post()
  create(@Body() body) {
    return this.judgeService.create(body);
  }

  @Get()
  findAll() {
    return this.judgeService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.judgeService.remove(+id);
  }
  @Put("/:judgeId/Bestmovie/:movieId")
  movie(@Param('judgeId') judgeId, @Param('movieId') movieId) {
    return this.judgeService.BestMovie(+judgeId,+movieId);
  }
  @Put("/:judgeId/BestActor/:actorId")
  actor(@Param('judgeId') judgeId: string, @Param('actorId') actorId: string) {
    return this.judgeService.BestActor(+judgeId,+actorId);
  }
  @Put("/:judgeId/BestDirector/:diecrtorId")
  director(@Param('judgeId') judgeId: string, @Param('diecrtorId') diecrtorId: string) {
    return this.judgeService.BestDirector(+judgeId,+diecrtorId);
  }
}
