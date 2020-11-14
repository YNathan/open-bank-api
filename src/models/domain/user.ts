
import { PasswordChangeResponseDto } from "../dto/auth/password-change-response.dto";
import { UserDto } from "../dto/user/user.dto";
import { User } from "./user.entity";

export const Adapter = {
  modelToUserDto(model: User): UserDto {
    return {
      id: model.id,
      name: model.name,
      email: model.email,
    };
  },
  modelToPasswordChangeDto(model: User): PasswordChangeResponseDto {
    return { id: model.id, email: model.email, changed: true };
  },
};
