import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { RoleEnum } from './roles.enum';

@Injectable()
export class RolesService {
  constructor(@InjectRepository(RoleEntity)
  private readonly roleRepo:Repository<RoleEntity>){}


  async addRole(name: RoleEnum) {
    if (![RoleEnum.ADMIN, RoleEnum.JUDGE].includes(name)) {
      throw new BadRequestException('WRONG ROLE');
    }
    const role = await this.roleRepo.findOne({name});
    if (role) {
      console.log('here');
      return role;
    } else {
      let a =this.roleRepo.create({name});
      return this. roleRepo.save(a);
    }
  }


 
}
