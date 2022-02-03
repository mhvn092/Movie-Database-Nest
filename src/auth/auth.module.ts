import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { judgeRepository } from 'src/repositories/JudeRepository.Repositroy';
import { UtilityModule } from 'src/utility/utility.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports:[TypeOrmModule.forFeature([judgeRepository]),
    UtilityModule,PassportModule],
    providers:[AuthService,LocalStrategy],
    exports:[AuthService]
})
export class AuthModule {}
