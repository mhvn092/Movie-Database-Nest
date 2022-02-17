import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { JudgeEntity } from '../../judge/entity/judge-entity';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => JudgeEntity, (judge) => judge.roles)
  @JoinTable()
  judges: JudgeEntity[];
}
