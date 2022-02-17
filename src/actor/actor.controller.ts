import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiNotFoundResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Role } from '../common/decorator/role.decorator';
import { JwtGuard } from '../common/guard/jwt.guard';
import { RoleGuard } from '../common/guard/role.guard';
import { RoleEnum } from '../roles/roles.enum';
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
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
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
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'patch that actor'})
  update(@Param('id') id: string, @Body() updateActorDto: UpdateActorDto) {
    return this.actorService.update(+id, updateActorDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'delete that actor'})
  remove(@Param('id') id: string) {
    return this.actorService.remove(+id);
  }
  @Put("/:actorId/new-movie/:movieId")
  @Role(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'add that movie to that actor'})
  put(@Param('actorId') actorId: string, @Param('movieId') movieId: string) {
    return this.actorService.addMovie(+actorId,+movieId);
  }
}
