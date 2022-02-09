import { JudgeEntity } from 'src/judge/entity/judge-entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
  @PrimaryColumn()
  name: string;

  @ManyToMany(() => JudgeEntity, (judge) => judge.roles)
  @JoinTable()
  judges: JudgeEntity[];
}
