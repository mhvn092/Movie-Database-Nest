import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { judgeRepository } from '../repositories/JudeRepository.Repositroy';
import { UtilityModule } from '../utility/utility.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
    imports:[TypeOrmModule.forFeature([judgeRepository]),
    JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return {
            secret: configService.get<string>('Secret_key'),
            signOptions: {expiresIn: '1w'},
          };
        },
        inject: [ConfigService],
      }),
    UtilityModule,PassportModule,ConfigModule],
    providers:[AuthService,LocalStrategy,JwtStrategy],
    exports:[AuthService]
})
export class AuthModule {}
