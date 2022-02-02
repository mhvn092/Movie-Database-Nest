import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('token')
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @PrimaryColumn()
    name:string;
}
