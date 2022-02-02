import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TokenEntity } from './entities/token-entity';

@Injectable()
export class TokenService {
    constructor(@InjectRepository(TokenEntity)
    private readonly tokenRepository: Repository<TokenEntity>) { }


   async create(name: TokenEntity) {
        await this.tokenRepository.create(name);
        return this.tokenRepository.save(name);
    }

    find(name: string) {
        return this.tokenRepository.findOne({
          name
        })
      }
    


}
