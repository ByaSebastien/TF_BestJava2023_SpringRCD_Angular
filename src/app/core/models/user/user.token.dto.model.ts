import {UserDto} from "./user.dto.model";

export interface UserTokenDto {
  user: UserDto;
  token: string;
}
