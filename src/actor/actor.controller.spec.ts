import { ActorController } from "./actor.controller";
import { ActorService } from "./actor.service";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtGuard } from "../common/guard/jwt.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { JudgeService } from "../judge/judge.service";
import { CreateActorDto } from "./dto/create-actor.dto";
import { UpdateActorDto } from "./dto/update-actor.dto";
import { any } from "joi";



describe('Actor Controller', () => {
    let actorController: ActorController;
    let actorService: ActorService;
    let judgeService: JudgeService;

   const mockactorService = {
        create: jest.fn().mockImplementation((name:CreateActorDto)=>{return {id:1, ...name}}),
        findAll: jest.fn(() => array),
        findOne: jest.fn().mockImplementation((num)=>{ return array.find((item)=>item.id=+num)}),
        update: jest.fn().mockImplementation((id, update)=>
        {let a=array.find((item)=>item.id=+id); a.name=update.name; return a;}),
        remove: jest.fn().mockImplementation((id)=>{let a=array.find((item)=>item.id=+id);
        return array.splice(array.indexOf(a),1);}),
        addMovie: jest.fn().mockImplementation((actid,movid)=>{let a=array.find((item)=>item.id=+actid);
            let b=movie.find((item)=>item.id=+movid); return {...a,movies:[b]} })
    }
    let stub = {name : 'john'};
    let array= [{id:1,...stub},{id:2,name:'kjkdsad'}];
    let movie = [{id:1, name: 'godfather'},{id:2, name:'lotr'}];
    const mockjudgeservice = {}


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ActorController],
            providers: [ActorService,
            {provide:JudgeService, useValue:mockjudgeservice},
            {provide:JwtGuard, useValue: jest.fn().mockImplementation(()=>true)},
            {provide:RoleGuard, useValue:jest.fn().mockImplementation(()=>true)}
        ],
        }).overrideProvider(ActorService).useValue(mockactorService).compile();

        actorService = app.get<ActorService>(ActorService);
        judgeService= app.get<JudgeService>(JudgeService);
        
        actorController = app.get<ActorController>(ActorController);
        
    });

    it('should be defined', () => {
        expect(actorController).toBeDefined();
    });

    it('should create an actor', ()=>{
        expect(actorController.create(stub)).toEqual(
            {
            id : expect.any(Number),
            ...stub
            });
    })

    it('should return an array:findall',()=>{
        expect(actorController.findAll()).toEqual(array);
    })

   it('should return one item:findone',()=>{
       let ids ="1"
       expect(actorController.findOne(ids)).toEqual(
           {
               id:1,
               name:'john'

           })});

    it('should update one item',()=>{
        let id='1';
        let dto = new UpdateActorDto();
        dto.name='abs'
        expect(actorController.update(id,dto)).toEqual({
            id:1,name:'abs'
        })
    });
    it('should delete an item',()=>{
        let id='1'
        expect(actorController.remove(id)).toEqual([{
            id:1,name:'abs'
        }])
    })

    it('should add an item to join column',()=>{
        let acid='1'
        let moid='2'
        expect(actorController.put(acid,moid)).toEqual({
            id:1,name:'kjkdsad',movies:[{id:2,name:'godfather'}]
        })
    })

});




