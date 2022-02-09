import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { judgeRepository } from "src/repositories/JudeRepository.Repositroy";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly judgeRepo:judgeRepository,
  ) {
    super({
      secretOrKey: configService.get<string>('Secret_key'),
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any) {
    const { id, name } = payload;

    const judge = await this.judgeRepo.findbyid(+id);

    delete judge.password;

    return judge;
  }
}