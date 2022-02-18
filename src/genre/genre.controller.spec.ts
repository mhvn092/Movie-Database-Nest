import { Test, TestingModule } from "@nestjs/testing";
import { JwtGuard } from "../common/guard/jwt.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { JudgeService } from "../judge/judge.service";
import { CreateGenreDto } from "./dto/create-genre.dto";
import { UpdateGenreDto } from "./dto/update-genre.dto";
import { GenreController } from "./genre.controller";
import { GenreService } from "./genre.service";




describe('genre Controller', () => {
    let genreController: GenreController;
    let genreService: GenreService;
    let judgeService: JudgeService;

   const mockGenreService = {
        create: jest.fn().mockImplementation((name:CreateGenreDto)=>{return {id:1, ...name}}),
        findAll: jest.fn(() => array),
        findOne: jest.fn().mockImplementation((num)=>{ return array.find((item)=>item.id=+num)}),
        update: jest.fn().mockImplementation((id, update)=>
        {let a=array.find((item)=>item.id=+id); a.name=update.name; return a;}),
        remove: jest.fn().mockImplementation((id)=>{let a=array.find((item)=>item.id=+id);
        return array.splice(array.indexOf(a),1);}),
        addMovie: jest.fn().mockImplementation((genid,movid)=>{let a=array.find((item)=>item.id=+genid);
            let b=movie.find((item)=>item.id=+movid); return {...a,movies:[b]} }),
        addDirector:jest.fn().mockImplementation((genid,dirid)=>{let a=array.find((item)=>item.id=+genid);
            let b=director.find((item)=>item.id=+dirid); return {...a,directors:[b]} })
    }
    let stub = {name : 'john'};
    let array= [{id:1,...stub},{id:2,name:'kjkdsad'}];
    let movie = [{id:1, name: 'godfather'},{id:2, name:'lotr'}];
    let director = [ { id:1,name:'farhadi'},{id:2,name:'capolla'}]
    const mockjudgeservice = {}


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [GenreController],
            providers: [GenreService,
            {provide:JudgeService, useValue:mockjudgeservice},
            {provide:JwtGuard, useValue: jest.fn().mockImplementation(()=>true)},
            {provide:RoleGuard, useValue:jest.fn().mockImplementation(()=>true)}
        ],
        }).overrideProvider(GenreService).useValue(mockGenreService).compile();

        genreService =app.get<GenreService>(GenreService);
        judgeService= app.get<JudgeService>(JudgeService);
        
        genreController = app.get<GenreController>(GenreController);
        
    });

    it('should be defined', () => {
        expect(genreController).toBeDefined();
    });

    it('should create an actor', ()=>{
        expect(genreController.create(stub)).toEqual(
            {
            id : expect.any(Number),
            ...stub
            });
    })

    it('should return an array:findall',()=>{
        expect(genreController.findAll()).toEqual(array);
    })

   it('should return one item:findone',()=>{
       let ids ="1"
       expect(genreController.findOne(ids)).toEqual(
           {
               id:1,
               name:'john'

           })});

    it('should update one item',()=>{
        let id='1';
        let dto = new UpdateGenreDto();
        dto.name='abs'
        expect(genreController.update(id,dto)).toEqual({
            id:1,name:'abs'
        })
    });
    it('should delete an item',()=>{
        let id='1'
        expect(genreController.remove(id)).toEqual([{
            id:1,name:'abs'
        }])
    });

    it('should add an movie to join table',()=>{
        let genid='1'
        let moid='2'
        expect(genreController.put(genid,moid)).toEqual({
            id:1,name:'kjkdsad',movies:[{id:2,name:'godfather'}]
        })
    });

    it('should add an director to join table',()=>{
        let genid='1'
        let dirid='2'
        expect(genreController.goza(genid,dirid)).toEqual({
            id:1,name:'kjkdsad',directors:[{id:2,name:'farhadi'}]
        })
    })

});




