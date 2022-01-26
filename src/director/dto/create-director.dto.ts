import { IsString } from "class-validator";

export class CreateDirectorDto {
    @IsString()
    name:string;
}
