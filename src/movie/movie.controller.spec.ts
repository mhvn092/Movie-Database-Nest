
import { Test, TestingModule } from "@nestjs/testing";
import { JwtGuard } from "../common/guard/jwt.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { JudgeService } from "../judge/judge.service";
import { CreateMovieDto } from "./dto/create-movie.dto";
import { UpdateMovieDto } from "./dto/update-movie.dto";
import { MovieController } from "./movie.controller";
import { MovieService } from "./movie.service";




describe('movie Controller', () => {
   let movieController: MovieController;
   let movieService: MovieService;
    let judgeService: JudgeService;

   const mockMovieService = {
        create: jest.fn().mockImplementation((name:CreateMovieDto)=>{return {id:1, ...name}}),
        findAll: jest.fn(() => array),
        findOne: jest.fn().mockImplementation((num)=>{ return array.find((item)=>item.id=+num)}),
        update: jest.fn().mockImplementation((id, update)=>
        {let a=array.find((item)=>item.id=+id); a.name=update.name; return a;}),
        remove: jest.fn().mockImplementation((id)=>{let a=array.find((item)=>item.id=+id);
        return array.splice(array.indexOf(a),1);}),
        SetDirector:jest.fn().mockImplementation((movid,dirid)=>{let a=movie.find((item)=>item.id=+movid);
            let b=director.find((item)=>item.id=+dirid); return {...a,director:b }}),
        addActor:jest.fn().mockImplementation((movid,actid)=>{let a=movie.find((item)=>item.id=+movid);
            let b=actor.find((item)=>item.id=+actid); return {...a,actors:[b] }}),
        addGenre:jest.fn().mockImplementation((movid,genid)=>{let a=movie.find((item)=>item.id=+movid);
            let b=genre.find((item)=>item.id=+genid); return {...a,genres:[b] }}),
        
    }
    let stub = {name : 'john'};
    let array= [{id:1,...stub},{id:2,name:'kjkdsad'}];
    let movie = [{id:1, name: 'godfather'},{id:2, name:'lotr'}];
    let director = [ { id:1,name:'farhadi'},{id:2,name:'capolla'}];
    let actor = [{ id:1,name:'jafari'},{id:2,name:'shokoohi'}];
    let genre = [{id:1, name:'action'},{id:2, name:"drama"}]
    const mockjudgeservice = {}


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [MovieService,
            {provide:JudgeService, useValue:mockjudgeservice},
            {provide:JwtGuard, useValue: jest.fn().mockImplementation(()=>true)},
            {provide:RoleGuard, useValue:jest.fn().mockImplementation(()=>true)}
        ],
        }).overrideProvider(MovieService).useValue(mockMovieService).compile();

        movieService = app.get<MovieService>(MovieService);
        judgeService= app.get<JudgeService>(JudgeService);
        
        movieController = app.get<MovieController>(MovieController);
        
    });

    it('should be defined', () => {
        expect(movieController).toBeDefined();
    });

    it('should create an actor', ()=>{
        expect(movieController.create(stub)).toEqual(
            {
            id : expect.any(Number),
            ...stub
            });
    })

    it('should return an array:findall',()=>{
        expect(movieController.findAll()).toEqual(array);
    })

   it('should return one item:findone',()=>{
       let ids ="1"
       expect(movieController.findOne(ids)).toEqual(
           {
               id:1,
               name:'john'

           })});

    it('should update one item',()=>{
        let id='1';
        let dto = new UpdateMovieDto();
        dto.name='abs'
        expect(movieController.update(id,dto)).toEqual({
            id:1,name:'abs'
        })
    });


    it('should delete an item',()=>{
        let id='1'
        expect(movieController.remove(id)).toEqual([{
            id:1,name:'abs'
        }])
    });



    it('should add an  director to join column',()=>{
        let moid='1'
        let dirid='2'
        expect(movieController.Dir(moid,dirid)).toEqual({
            id:1, name: 'godfather',director:{id:2,name:'farhadi'}
        })
    })

    it('should add an actor to join table',()=>{
        let moid='1'
        let actid='2'
        expect(movieController.act(moid,actid)).toEqual({
            id:1, name: 'godfather',actors:[{id:2,name:'jafari'}]
        })
    })
    
    it('should add an genre to join table',()=>{
        let moid='1'
        let genid='2'
        expect(movieController.genre(moid,genid)).toEqual({
            id:1, name: 'godfather',genres:[{id:2, name:"action"}]
        })
    })
    

});




