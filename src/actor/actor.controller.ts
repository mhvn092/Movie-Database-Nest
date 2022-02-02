import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MovieService } from 'src/movie/movie.service';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actor')
@ApiTags('Actor')
export class ActorController {
  constructor(private readonly actorService: ActorService,
  ) { }

  @Post()
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
  @Put("/:actorId/new-movie/:movieId")
  put(@Param('actorId') actorId: string, @Param('movieId') movieId: string) {
    return this.actorService.addMovie(+actorId,+movieId);
  }
}
