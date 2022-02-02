import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { TokenController } from './token.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token-entity';

@Module({
  imports:[TypeOrmModule.forFeature([TokenEntity])],
  controllers: [TokenController],
  providers: [TokenService],
  exports:[TokenService]
})
export class TokenModule {}
