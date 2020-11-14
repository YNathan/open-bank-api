import { Request, Response, NextFunction } from "express";
import { UserDto } from "../models/dto/user/user.dto";
import { TokenUserResponseDto } from "../models/dto/user/token-user-response.dto";
import { User } from "../models/domain/user.entity";

export interface AuthService {
  authUserRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<TokenUserResponseDto>>;

  unauthUserRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<UserDto>>;

  validateUser(email: string): Promise<boolean | User>;

  validatePassword(password: string, userPassword: string): boolean;

  signToken(user: UserDto);

  verifyToken(token: string, secret: string);

  checkIfTokenApproved(token: string);

  changePassword(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<UserDto>;

  validateTokenRequest(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<boolean>>;
}
