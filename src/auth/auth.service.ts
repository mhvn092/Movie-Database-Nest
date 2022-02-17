import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JudgeEntity } from '../judge/entity/judge-entity';
import { UtilityService } from '../utility/utility.service';
import { judgeRepository } from '../repositories/JudeRepository.Repositroy';

@Injectable()
export class AuthService {
    constructor(private readonly JudgeRepository:judgeRepository,
        private readonly utilityService:UtilityService
        ,private readonly jwtService:JwtService){}

    async validate(user:string,pass:string){
        const username= await this.JudgeRepository.findByUsername(user);

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
