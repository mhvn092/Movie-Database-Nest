import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "src/roles/roles.enum";

export const RoleConstant = 'role';

export const Role = (...roles: RoleEnum[]) => {
  return SetMetadata(RoleConstant, roles);
};