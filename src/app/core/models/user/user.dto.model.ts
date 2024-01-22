import {UserGender} from "./enums/user.gender.enum";
import {UserRole} from "./enums/user.role.enum";

export interface UserDto {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  gender: UserGender;
  role: UserRole;
}
