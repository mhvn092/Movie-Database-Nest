import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token-guard.guard';

@Controller('genre')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that genre'})
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({description:'get them genre'})
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'get that genre'})
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'patch that genre'})
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'delete that genre'})
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
  @Put('/:genreId/new-movie/:movieId')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that movie to that genre'})
  put(@Param('genreId') genreId: string, @Param('movieId') movieId: string) {
    return this.genreService.addMovie(+genreId,+movieId);}

  @Put('/:genreId/new-driector/:directorId')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that director to that genre'})
  goza(@Param('genreId') genreId: string, @Param('directorId') directorId: string) {
    return this.genreService.addMovie(+genreId,+directorId);}
}
