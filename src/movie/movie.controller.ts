import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
  @Put('/:movieId/:directorId')
  Dir(@Param('movieId') movieId: string, @Param('directorId') directorId: string){
    return this.movieService.SetDirector(+movieId,+directorId)
  }
  @Put('/:movieId/new-actor/:actorId')
  act(@Param('movieId') movieId: string, @Param('actorId') actorId: string){
    return this.movieService.addActor(+movieId,+actorId)
  }
  @Put('/:movieId/new-genre/:genreId')
  genre(@Param('movieId') movieId: string, @Param('genreId') genreId: string){
    return this.movieService.addGenre(+movieId,+genreId)
  }
}
