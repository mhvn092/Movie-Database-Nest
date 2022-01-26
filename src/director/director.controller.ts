import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }
  @Put('/:directorId/new-movie/:movieId')
  put(@Param('directorId') directorId: string, @Param('movieId') movieId: string) {
    return this.directorService.addMovie(+directorId,+movieId);}

  @Put('/:directorId/new-genre/:genreId')
  genre(@Param('directorId') directorId: string, @Param('genreId') genreId: string) {
   return this.directorService.addGenre(+directorId,+genreId);}
}
