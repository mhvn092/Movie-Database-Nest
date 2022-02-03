import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token-guard.guard';

@Controller('movie')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that movie'})
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  @ApiOperation({description:'get them movies'})
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiOperation({description:'get that movie'})
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({description:'patch that movie'})
  @UseGuards(TokenGuard)
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiOperation({description:'delete that movie'})
  @UseGuards(TokenGuard)
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
  @Put('/:movieId/:directorId')
  @ApiOperation({description:'add that director to that movie'})
  @UseGuards(TokenGuard)
  Dir(@Param('movieId') movieId: string, @Param('directorId') directorId: string){
    return this.movieService.SetDirector(+movieId,+directorId)
  }
  @Put('/:movieId/new-actor/:actorId')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that actor to that movie'})
  act(@Param('movieId') movieId: string, @Param('actorId') actorId: string){
    return this.movieService.addActor(+movieId,+actorId)
  }
  @Put('/:movieId/new-genre/:genreId')
  @ApiOperation({description:'add that genre to that movie'})
  @UseGuards(TokenGuard)
  genre(@Param('movieId') movieId: string, @Param('genreId') genreId: string){
    return this.movieService.addGenre(+movieId,+genreId)
  }
}
