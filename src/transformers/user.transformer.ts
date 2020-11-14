import { UserDto } from "../models/dto/user/user.dto";
import { User } from "../models/domain/user.entity";
import { PasswordChangeResponseDto } from "../models/dto/auth/password-change-request.dto";

export const UserTransformer = {
  modelToDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email || "",
    };
  },
  dtoToModel(userDto: UserDto): User {
    return {
      id: userDto.id,
      name: userDto.name,
      email: userDto.email,
      created_at: new Date(),
      updated_at: new Date(),
      password: userDto.password,
      hasId: undefined,
      recover: undefined,
      softRemove: undefined,
      reload: undefined,
      remove: undefined,
      save: undefined,
    };
  },

  modelToPasswordChangeDto(model: User): PasswordChangeResponseDto {
    return { newPassword: model.password || "" };
  },
};
