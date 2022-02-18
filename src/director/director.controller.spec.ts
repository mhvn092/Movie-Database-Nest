import { Test, TestingModule } from "@nestjs/testing";
import { JwtGuard } from "../common/guard/jwt.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { JudgeService } from "../judge/judge.service";
import { DirectorController } from "./director.controller";
import { DirectorService } from "./director.service";
import { CreateDirectorDto } from "./dto/create-director.dto";
import { UpdateDirectorDto } from "./dto/update-director.dto";



describe('director Controller', () => {
    let directorController: DirectorController;
    let directorService: DirectorService;
    let judgeService: JudgeService;

   const mockdirectorService = {
        create: jest.fn().mockImplementation((name:CreateDirectorDto)=>{return {id:1, ...name}}),
        findAll: jest.fn(() => array),
        findOne: jest.fn().mockImplementation((num)=>{ return array.find((item)=>item.id=+num)}),
        update: jest.fn().mockImplementation((id, update)=>
        {let a=array.find((item)=>item.id=+id); a.name=update.name; return a;}),
        remove: jest.fn().mockImplementation((id)=>{let a=array.find((item)=>item.id=+id);
        return array.splice(array.indexOf(a),1);}),
        addMovie: jest.fn().mockImplementation((dirid,movid)=>{let a=array.find((item)=>item.id=+dirid);
            let b=movie.find((item)=>item.id=+movid); return {...a,movies:[b]} }),
        addGenre: jest.fn().mockImplementation(((dirid,genid)=>{let a=array.find((item)=>item.id=+dirid);
            let b=genre.find((item)=>item.id=+genid); return {...a,genres:[b]}}))
        
    }
    let stub = {name : 'john'};
    let array= [{id:1,...stub},{id:2,name:'kjkdsad'}];
    let movie = [{id:1, name: 'godfather'},{id:2, name:'lotr'}];
    let genre = [{id:1, name:'action'},{id:2, name:"drama"}]
    const mockjudgeservice = {}


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [DirectorController],
            providers: [DirectorService,
            {provide:JudgeService, useValue:mockjudgeservice},
            {provide:JwtGuard, useValue: jest.fn().mockImplementation(()=>true)},
            {provide:RoleGuard, useValue:jest.fn().mockImplementation(()=>true)}
        ],
        }).overrideProvider(DirectorService).useValue(mockdirectorService).compile();

        directorService = app.get<DirectorService>(DirectorService);
        judgeService= app.get<JudgeService>(JudgeService);
        
        directorController = app.get<DirectorController>(DirectorController);
        
    });

    it('should be defined', () => {
        expect(directorController).toBeDefined();
    });

    it('should create an director', ()=>{
        expect(directorController.create(stub)).toEqual(
            {
            id : expect.any(Number),
            ...stub
            });
    })

    it('should return an array:findall',()=>{
        expect(directorController.findAll()).toEqual(array);
    })

   it('should return one item:findone',()=>{
       let ids ="1"
       expect(directorController.findOne(ids)).toEqual(
           {
               id:1,
               name:'john'

           })});

    it('should update one item',()=>{
        let id='1';
        let dto = new UpdateDirectorDto();
        dto.name='abs'
        expect(directorController.update(id,dto)).toEqual({
            id:1,name:'abs'
        })
    });
    it('should delete an item',()=>{
        let id='1'
        expect(directorController.remove(id)).toEqual([{
            id:1,name:'abs'
        }])
    })

    it('should add an movie to join column',()=>{
        let diid='1'
        let moid='2'
        expect(directorController.put(diid,moid)).toEqual({
            id:1,name:'kjkdsad',movies:[{id:2,name:'godfather'}]
        })
    })

    it('should add an movie to join column',()=>{
        let diid='1'
        let genid='1'
        expect(directorController.genre(diid,genid)).toEqual({
            id:1,name:'kjkdsad',genres:[{id:1,name:'action'}]
        })
    })


});




