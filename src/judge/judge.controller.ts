import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseFilters, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { Role } from 'src/common/decorator/role.decorator';
import { UnauthorizedFilter } from 'src/common/filter/unauthorized-filter.filter';
import { JwtGuard } from 'src/common/guard/jwt.guard';
import { LocalAuthGuard } from 'src/common/guard/Local-guard.guard';
import { RoleGuard } from 'src/common/guard/role.guard';
import { SimpleInterceptor } from 'src/common/interceptor/simple-interceptor.interceptor';
import { RoleEnum } from 'src/roles/roles.enum';
import { CreateJudgeDto } from './dtos/CreateJudgeDto.dto';
import { LoginDto } from './dtos/LoginDto.dto';
import { UpdateJudgeDto } from './dtos/UpdateJudgeDto.dto';
import { JudgeService } from './judge.service';

@Controller('judge')
@ApiTags('Judge')
@ApiUnauthorizedResponse({description:'you are not a judge bro'})
@ApiNotFoundResponse({description:'either your judge or nominee not found'})
@ApiBadRequestResponse({description:'YOU\'VE ALREADY VOTED JERRY'})
@UseFilters(UnauthorizedFilter)
export class JudgeController {
  constructor(private readonly judgeService: JudgeService,
    private readonly authService:AuthService) {}

  @Post()
  @ApiOperation({description:'signs up judges'})
  @ApiBody({type:CreateJudgeDto})
  create(@Body(ValidationPipe) body:CreateJudgeDto) {
    return this.judgeService.create(body);
  }
  @Post('/login')
  @ApiBearerAuth()
  @ApiOperation({description:'login judges'})
  @UseGuards(LocalAuthGuard)
  @ApiBody({type:LoginDto})
  Login(@Request() req){
    return this.authService.createToken(req.user);
  }
  
  @Get()
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN,RoleEnum.JUDGE)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'get all them judges'})
  //@UseInterceptors(SimpleInterceptor)
  findAll() {
    return this.judgeService.findAll();
  }

  @Patch('/:id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN,RoleEnum.JUDGE)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'update that judge'})
  update(@Param('id') id:string, @Body()body:UpdateJudgeDto){
    return this.judgeService.updateRole(+id,body);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Role(RoleEnum.ADMIN,RoleEnum.JUDGE)
  @UseGuards(JwtGuard,RoleGuard)
  @ApiOperation({description:'delete that judge'})
  remove(@Param('id') id: string) {
    return this.judgeService.remove(+id);
  }
  @Put("/:judgeId/Bestmovie/:movieId")
  @Role(RoleEnum.JUDGE)
  @ApiOperation({description:'the judge choses his best movie'})
  @UseGuards(JwtGuard,RoleGuard)
  @ApiBearerAuth()
  @ApiBody({type:LoginDto})
  movie(@Param('judgeId') judgeId:string, @Param('movieId') movieId:string) {
    return this.judgeService.BestMovie(+judgeId,+movieId);
  }
  @Put("/:judgeId/BestActor/:actorId")
  @Role(RoleEnum.JUDGE)
  @ApiOperation({description:'the judge choses his best actor'})
  @UseGuards(JwtGuard,RoleGuard)
  @ApiBearerAuth()
  @ApiBody({type:LoginDto})
  actor(@Param('judgeId') judgeId: string, @Param('actorId') actorId: string) {
    return this.judgeService.BestActor(+judgeId,+actorId);
  }
  @Put("/:judgeId/BestDirector/:diecrtorId")
  @Role(RoleEnum.JUDGE)
  @ApiOperation({description:'the judge choses his best director'})
  @UseGuards(JwtGuard,RoleGuard)
  @ApiBearerAuth()
  @ApiBody({type:LoginDto})
  director(@Param('judgeId') judgeId: string, @Param('diecrtorId') diecrtorId: string) {
    return this.judgeService.BestDirector(+judgeId,+diecrtorId);
  }
}
