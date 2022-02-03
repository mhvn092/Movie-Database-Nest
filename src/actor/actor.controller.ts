import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token-guard.guard';
import { MovieService } from 'src/movie/movie.service';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';

@Controller('actor')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Actor')
export class ActorController {
  constructor(private readonly actorService: ActorService,
  ) { }

  @Post()
  @UseGuards(TokenGuard)
  @ApiOperation({description:'adding actor'})
  create(@Body() createActorDto: CreateActorDto) {
    return this.actorService.create(createActorDto);
  }

  @Get()
  @ApiOperation({description:'get all them actors'})
  findAll() {
    return this.actorService.findAll();
  }

  @Get(':id')
  @ApiOperation({description:'get that actor'})
  findOne(@Param('id') id: string) {
    return this.actorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({description:'patch that actor'})
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  @ApiOperation({description:'delete that actor'})
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
  @Put("/:actorId/new-movie/:movieId")
  @ApiOperation({description:'add that movie to that actor'})
  @UseGuards(TokenGuard)
  put(@Param('actorId') actorId: string, @Param('movieId') movieId: string) {
    return this.actorService.addMovie(+actorId,+movieId);
  }
}
