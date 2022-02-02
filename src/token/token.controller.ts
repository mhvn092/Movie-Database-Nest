import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TokenService } from './token.service';

@Controller('token')
@ApiTags('Token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  
  @Post()
  create(@Body() body) {
    return this.tokenService.create(body);
  }
}
