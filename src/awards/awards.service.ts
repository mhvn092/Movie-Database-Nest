import { Injectable } from '@nestjs/common';
import { ActorService } from '../actor/actor.service';
import { DirectorService } from '../director/director.service';
import { MovieService } from '../movie/movie.service';


@Injectable()
export class AwardsService {
    constructor(private readonly movieservice:MovieService,
        private readonly actorservice: ActorService,
        private readonly directorservice: DirectorService){}

        async BestMovie(){
            return await this.movieservice.Winner();
            
        }
        async BestActor(){
            return await this.actorservice.Winner();
             
        }
        async BestDriector(){
            return await this.directorservice.Winner();
        }
}
