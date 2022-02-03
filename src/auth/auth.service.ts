import { Injectable } from '@nestjs/common';
import { judgeRepository } from 'src/repositories/JudeRepository.Repositroy';
import { UtilityService } from 'src/utility/utility.service';

@Injectable()
export class AuthService {
    constructor(private readonly judgeRepository:judgeRepository,
        private readonly utilityService:UtilityService){}

    async validate(user:string,pass:string){
        const username= await this.judgeRepository.findByUsername(user);

        if (await this.utilityService.compare(pass,username.password)){
            return username;}

            return null;

    }

}
