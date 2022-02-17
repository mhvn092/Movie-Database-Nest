import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../common/decorator/role.decorator';
import { JwtGuard } from '../common/guard/jwt.guard';
import { RoleGuard } from '../common/guard/role.guard';
import { RoleEnum } from '../roles/roles.enum';
import { DirectorService } from './director.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('director')
@ApiNotFoundResponse({description:'not found what we were looking for'})
@ApiTags('Director')
export class DirectorController {
  constructor(private readonly directorService: DirectorService) {}

  @Post()
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
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
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'update that director'})
  update(@Param('id') id: string, @Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorService.update(+id, updateDirectorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'delete that director'})
  remove(@Param('id') id: string) {
    return this.directorService.remove(+id);
  }

  @Put('/:directorId/new-movie/:movieId')
  @Role(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that movie to that director'})
  put(@Param('directorId') directorId: string, @Param('movieId') movieId: string) {
    return this.directorService.addMovie(+directorId,+movieId);}

  @Put('/:directorId/new-genre/:genreId')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that genre to that director'})
  genre(@Param('directorId') directorId: string, @Param('genreId') genreId: string) {
   return this.directorService.addGenre(+directorId,+genreId);}
}
