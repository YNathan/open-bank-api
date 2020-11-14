import { Request, Response, NextFunction } from "express";
import { UserDto } from "../models/dto/user/user.dto";

export interface UserService {
  registerUserRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<UserDto>>;

  getUser(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<UserDto>>;
}
