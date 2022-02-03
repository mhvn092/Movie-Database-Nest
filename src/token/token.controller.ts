import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import {  ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from 'src/common/guard/Local-guard.guard';
import { TokenDto } from './dtos/TokenDto.dto';
import { TokenService } from './token.service';

@Controller('token')
@ApiTags('Token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  
  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() body:TokenDto) {
    return this.tokenService.create(body);
  }
}
