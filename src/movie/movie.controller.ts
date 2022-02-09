import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleGuard } from 'src/common/guard/role.guard';
import { RoleEnum } from 'src/roles/roles.enum';

@Controller('movie')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
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
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'patch that movie'})
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'delete that movie'})
  remove(@Param('id') id: string) {
    return this.movieService.remove(+id);
  }
  @Put('/:movieId/:directorId')
  @Role(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that director to that movie'})
  Dir(@Param('movieId') movieId: string, @Param('directorId') directorId: string){
    return this.movieService.SetDirector(+movieId,+directorId)
  }
  @Put('/:movieId/new-actor/:actorId')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that actor to that movie'})
  act(@Param('movieId') movieId: string, @Param('actorId') actorId: string){
    return this.movieService.addActor(+movieId,+actorId)
  }
  @Put('/:movieId/new-genre/:genreId')
  @Role(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that genre to that movie'})
  genre(@Param('movieId') movieId: string, @Param('genreId') genreId: string){
    return this.movieService.addGenre(+movieId,+genreId)
  }
}
