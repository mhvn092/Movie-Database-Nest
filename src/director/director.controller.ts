import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'src/common/guard/token-guard.guard';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that director'})
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorService.create(createDirectorDto);
  }

  @Get()
  @ApiOperation({description:'get them director'})
  findAll() {
    return this.directorService.findAll();
  }

  @Get(':id')
  @ApiOperation({description:'get that director'})
  findOne(@Param('id') id: string) {
    return this.directorService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'update that director'})
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'delete that director'})
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }

  @Put('/:directorId/new-movie/:movieId')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that movie to that director'})
  put(@Param('directorId') directorId: string, @Param('movieId') movieId: string) {
    return this.directorService.addMovie(+directorId,+movieId);}

  @Put('/:directorId/new-genre/:genreId')
  @UseGuards(TokenGuard)
  @ApiOperation({description:'add that genre to that director'})
  genre(@Param('directorId') directorId: string, @Param('genreId') genreId: string) {
   return this.directorService.addGenre(+directorId,+genreId);}
}
