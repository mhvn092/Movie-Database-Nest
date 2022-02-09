import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { ApiBearerAuth, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { Role } from 'src/common/decorator/role.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RoleGuard } from 'src/common/guard/role.guard';

@Controller('genre')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
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
  @ApiOperation({description:'get that genre'})
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'patch that genre'})
  update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
    return this.genreService.update(+id, updateGenreDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'delete that genre'})
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
  @Put('/:genreId/new-movie/:movieId')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that movie to that genre'})
  put(@Param('genreId') genreId: string, @Param('movieId') movieId: string) {
    return this.genreService.addMovie(+genreId,+movieId);}

  @Put('/:genreId/new-driector/:directorId')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that director to that genre'})
  goza(@Param('genreId') genreId: string, @Param('directorId') directorId: string) {
    return this.genreService.addMovie(+genreId,+directorId);}
}
