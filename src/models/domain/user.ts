import { ObjectID } from "mongodb";
import { PasswordChangeResponseDto } from "../dto/auth/password-change-response.dto";
import { UserDto } from "../dto/user/user.dto";

export interface IUser {
  _id?: ObjectID;
  name?: string;
  email?: string;
  password?: string;
  createdAt?: Date;
  updated_at?: Date;
}
export const Adapter = {
  modelToUserDto(model: IUser): UserDto {
    return {
      id: model._id,
      name: model.name,
      email: model.email,
    };
  },
  modelToPasswordChangeDto(model: IUser): PasswordChangeResponseDto {
    return { id: model._id, email: model.email, changed: true };
  },
};
