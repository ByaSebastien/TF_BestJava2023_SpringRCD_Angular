import {UserGender} from "./enums/user.gender.enum";

export interface RegisterFormModel {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  gender: UserGender;
}
