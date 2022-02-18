import { Test, TestingModule } from "@nestjs/testing";
import { AwardsController } from "./awards.controller";
import { AwardsService } from "./awards.service";


describe('Awards Controller', () => {
    let awardsController: AwardsController;
    let awardsService: AwardsService;

   const mockawardsService = {
        BestMovie: jest.fn(()=> 'godfather'),
        BestActor: jest.fn(()=>'amir jafari'),
        BestDriector:jest.fn(()=>'asghar farhadi')
    }


    beforeAll(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [AwardsController],
            providers: [AwardsService]
           }).overrideProvider(AwardsService).useValue(mockawardsService).compile();

        awardsService = app.get<AwardsService>(AwardsService);
        awardsController = app.get<AwardsController>(AwardsController);
        
    });

    it('should be defined', () => {
        expect(awardsController).toBeDefined();
    });

    it('should return greeting',()=>{
        expect(awardsController.a()).toEqual('<h1>hello World, Welcome to this Year Awards</h1>');
    });


    it('should return best movie', async ()=>{
       expect(await awardsController.b()).toBe(`This year Best Movie Winner Is godfather`);
    });


    it('should return best actor', async ()=>{
        expect(await awardsController.c()).toBe(`This year Best Actor Winner Is amir jafari`);
    });


    it('should return best director', async ()=>{
        expect(await awardsController.d()).toBe(`This year Best Director Winner Is asghar farhadi`);
    });
    
});




