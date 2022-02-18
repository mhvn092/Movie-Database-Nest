
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { UnauthorizedFilter } from "../common/filter/unauthorized-filter.filter";
import { JwtGuard } from "../common/guard/jwt.guard";
import { RoleGuard } from "../common/guard/role.guard";
import { JudgeService } from "../judge/judge.service";
import { LoggerService } from "../logger/logger.service";
import { CreateJudgeDto } from "./dtos/CreateJudgeDto.dto";
import { LoginDto } from "./dtos/LoginDto.dto";
import { UpdateJudgeDto } from "./dtos/UpdateJudgeDto.dto";
import { JudgeController } from "./judge.controller";




describe('judge Controller', () => {
    let judgeController: JudgeController;
    let judgeService: JudgeService;
    let authService:AuthService;
    let loggerService:LoggerService;

   const mockJudgeService = {
        create: jest.fn().mockImplementation((name:CreateJudgeDto)=>{return {id:1, ...name}}),
        findAll: jest.fn(() => array),
        updateRole: jest.fn().mockImplementation((id, update:UpdateJudgeDto)=>
        {let a=array.find((item)=>item.id=+id); a.roles=update.roles; return a;}),
        remove: jest.fn().mockImplementation((id)=>{let a=array.find((item)=>item.id=+id);
        return array.splice(array.indexOf(a),1);}),
        BestMovie: jest.fn().mockImplementation((judgid,movid)=>{let a=array.find((item)=>item.id=+judgid);
            let b=movie.find((item)=>item.id=+movid); return {...a,BestMovie:b}}),
        BestActor:jest.fn().mockImplementation((judgid,actid)=>{let a=array.find((item)=>item.id=+judgid);
            let b=actor.find((item)=>item.id=+actid); return {...a,BestActor:b}}),
        BestDirector:jest.fn().mockImplementation((judgid,dirid)=>{let a=array.find((item)=>item.id=+judgid);
            let b=director.find((item)=>item.id=+dirid); return {...a,BestDirector:b}}),
    }
    let stub = {name : 'john',username:'ajs',password:'sadasdddddddd',roles:['admin']};
    let array= [{id:1,...stub},{id:2,name:'kjkdsad',username:'ajsw',password:'sadasasdasddddddddd',roles:['judge']}];
    let movie = [{id:1, name: 'godfather'},{id:2, name:'lotr'}];
    let director = [ { id:1,name:'farhadi'},{id:2,name:'capolla'}];
    let actor = [{ id:1,name:'jafari'},{id:2,name:'shokoohi'}];
    const mockauthservice = {
        createToken: jest.fn((user:LoginDto)=>{
                return 'jkahsdkajsdhk.kjasdhkjasdhk.alskjdlkasjdlkasd'
            })
        }

    const mockLoggerService={}
    const mockfilter= {}

    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [JudgeController],
            providers: [JudgeService,
            {provide:UnauthorizedFilter, useValue:mockfilter},
            {provide:AuthService, useValue:mockauthservice},
            {provide:LoggerService,useValue:mockLoggerService},
            {provide:JwtGuard, useValue: jest.fn().mockImplementation(()=>true)},
            {provide:RoleGuard, useValue:jest.fn().mockImplementation(()=>true)}
        ],
        }).overrideProvider(JudgeService).useValue(mockJudgeService).compile();

        authService=app.get<AuthService>(AuthService);
        judgeService= app.get<JudgeService>(JudgeService);
        loggerService=app.get<LoggerService>(LoggerService);
        judgeController = app.get<JudgeController>(JudgeController);
        
    });

    it('should be defined', () => {
        expect(judgeController).toBeDefined();
    });

    it('should create a judeg', ()=>{
        expect(judgeController.create(stub)).toEqual(
            {
            id : expect.any(Number),
            ...stub
            });
    })

    it('should return an array:findall',()=>{
        expect(judgeController.findAll()).toEqual(array);
    })

    it('should update one item',()=>{
        let id='1';
        let dto = new UpdateJudgeDto();
        dto.roles=['abs']
        expect(judgeController.update(id,dto)).toEqual({
            id:1,name:'john',
            username:'ajs',password:'sadasdddddddd',
             roles:['abs']
        })
    });
    it('should delete an item',()=>{
        let id='1'
        expect(judgeController.remove(id)).toEqual([{
            id:1,name:'john',password: "sadasdddddddd",username: "ajs",roles:['abs']
        }])
    });

    it('should add an movie to join column',()=>{
        let jugid='1'
        let moid='2'
        expect(judgeController.movie(jugid,moid)).toEqual({
            id:1,name:'kjkdsad',username:'ajsw',
            password:'sadasasdasddddddddd',roles:['judge'],
            BestMovie:{id:2,name:'godfather'}
        })
    });

    it('should add an actor to join column',()=>{
        let jugid='1'
        let actid='2'
        expect(judgeController.actor(jugid,actid)).toEqual({
            id:1,name:'kjkdsad',username:'ajsw',
            password:'sadasasdasddddddddd',roles:['judge'],
            BestActor:{id:2,name:'jafari'}
        })
    });

    it('should add an director to join column',()=>{
        let jugid='1'
        let dirid='2'
        expect(judgeController.director(jugid,dirid)).toEqual({
            id:1,name:'kjkdsad',username:'ajsw',
            password:'sadasasdasddddddddd',roles:['judge'],
            BestDirector:{id:2,name:'farhadi'}
        })
    });


    it('should return the fake token', ()=>{
        let log = new LoginDto();
        log.username = 'john';
        log.password = 'sadasdddddddd'
        expect( judgeController.Login(log)).toEqual('jkahsdkajsdhk.kjasdhkjasdhk.alskjdlkasjdlkasd');
        expect(authService.createToken).toBeCalled();
    });
});




