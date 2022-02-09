import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { judgeRepository } from 'src/repositories/JudeRepository.Repositroy';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class AuthService {
    constructor(private readonly judgeRepository:judgeRepository,
        private readonly utilityService:UtilityService
        ,private readonly jwtService:JwtService){}

    async validate(user:string,pass:string){
        const username= await this.judgeRepository.findByUsername(user);

        if (await this.utilityService.compare(pass,username.password)){
            return username;}

            return null;
    }

    async createToken(judge: JudgeEntity) {
        const token = {
          token: this.jwtService.sign({
            id: judge.id,
            name: judge.name,
          }),
        };
        return token;
      }



}
