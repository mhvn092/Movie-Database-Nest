import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JudgeService } from "../../judge/judge.service";
import {  RoleConstant } from "../decorator/role.decorator";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector,
    @Inject(JudgeService) private readonly judgeService
 ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride(RoleConstant, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRole) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const judge = await this.judgeService.role(user.id);
  
    return judge.roles.some((role) => requiredRole.includes(role.name));

  }
}