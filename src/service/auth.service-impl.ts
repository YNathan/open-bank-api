import * as jwt from "jsonwebtoken";

import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../ioc/types";
import { logger } from "../logger/logger";
import { IUser } from "../models/domain/user";
import { User } from "../models/domain/user.entity";
import { UserDto } from "../models/dto/user/user.dto";
import { BcryptSupport } from "../support/bcrypt.support";
import { UserRepository } from "../repositories/user.repository";
import { ErrorCodes } from "../exceptions/error-codes";
import { BadRequestError } from "../exceptions/http-errors/bad-request-error";
import { UnauthorizedError } from "../exceptions/http-errors/unauthorized-error";
import { UuidSupport } from "../support/uuid.support";
import { AuthService } from "./auth.service";
import { TokenUserResponseDto } from "../models/dto/user/token-user-response.dto";
import { UserTransformer } from "../transformers/user.transformer";

@injectable()
export class AuthServiceImpl implements AuthService {
  protected TAG = `[${AuthServiceImpl.name}]`;

  @inject(TYPES.Config)
  private config;

  constructor(
    @inject(TYPES.UserRepository)
    private readonly authRepository: UserRepository
  ) {}

  public async authUserRequest(
    request: Request,
    response: Response<TokenUserResponseDto>,
    next: NextFunction
  ): Promise<Response<TokenUserResponseDto>> {
    const { email } = request.body;
    const { password } = request.body;

    if (UuidSupport.isNou(email) || UuidSupport.isNou(password)) {
      next(
        new BadRequestError(
          ErrorCodes.ERROR_MISSING_PARAMETERS,
          "Missing parameters"
        )
      );
    }

    const userFromDatabase: User = await this.authRepository.findByEmail(email);

    try {
      if (!userFromDatabase) {
        next(
          new BadRequestError(
            ErrorCodes.ERROR_BAD_CREDENTIALS,
            "Wrong credentials."
          )
        );
      }

      const isMatch = await this.validatePassword(
        password,
        userFromDatabase.password
      );
      if (!isMatch) {
        next(
          new UnauthorizedError(
            ErrorCodes.ERROR_BAD_CREDENTIALS,
            "Wrong credentials."
          )
        );
      }
      const user: UserDto = UserTransformer.modelToDto(userFromDatabase);
      const token: string = await this.signToken(user);
      return response.send({ token, user });
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  // eslint-disable-next-line consistent-return
  public async unauthUserRequest(
    request: Request,
    response: Response<UserDto>,
    next: NextFunction
  ): Promise<Response<UserDto>> {
    const { email } = request.body;
    const { password } = request.body;

    if (UuidSupport.isNou(email) || UuidSupport.isNou(password)) {
      next(
        new BadRequestError(
          ErrorCodes.ERROR_MISSING_PARAMETERS,
          "Missing parameters"
        )
      );
    }

    const userFromDatabase: User = await this.authRepository.findByEmail(email);

    try {
      if (!userFromDatabase) {
        next(
          new BadRequestError(
            ErrorCodes.ERROR_BAD_CREDENTIALS,
            "Wrong credentials."
          )
        );
      }

      const isMatch = await this.validatePassword(
        password,
        userFromDatabase.password
      );
      if (!isMatch) {
        next(
          new UnauthorizedError(
            ErrorCodes.ERROR_BAD_CREDENTIALS,
            "Wrong credentials."
          )
        );
      }
      const user: UserDto = UserTransformer.modelToDto(userFromDatabase);

      // TODO changng the token or remove it
      const token: string = await this.signToken(user);
      return response.send(user);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async validateUser(email: string): Promise<boolean | IUser> {
    const user: IUser = await this.authRepository.findByEmail(email);
    try {
      if (!user) {
        return false;
      }
      return user;
    } catch (error) {
      logger.error(this.TAG, error.message);
    }
  }

  public validatePassword(password: string, userPassword: string): boolean {
    return BcryptSupport.compare(password, userPassword);
  }

  public signToken(user: UserDto) {
    return jwt.sign({ user }, this.config.jwtAppSecret, {
      expiresIn: this.config.jwtExpireTime,
    });
  }

  public verifyToken(token: string, secret: string): string {
    return jwt.verify(token, secret);
  }

  public checkIfTokenApproved(token: string): boolean {
    return !!jwt.verify(token, this.config.jwtAppSecret);
  }

  public async changePassword(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<UserDto> {

    const { newPassword } = request.body.password;

    if (UuidSupport.isNou(newPassword)) {
      next(
        new BadRequestError(
          ErrorCodes.ERROR_MISSING_PARAMETERS,
          "Missing Parameters"
        )
      );
    }

    const hash = await BcryptSupport.generate(newPassword, 16.5);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentUser = (request as any).user as User;
    currentUser.password = hash;
    const updatedUser = await this.authRepository.updateValues(currentUser);
    return  UserTransformer.modelToDto(updatedUser);
  }

  // eslint-disable-next-line consistent-return
  public async validateTokenRequest(
    request: Request,
    response: Response<boolean>,
    next: NextFunction
  ): Promise<Response<boolean>> {
    const token: string = request.headers.authorization as string;
    let isApproved: boolean;
    try {
      isApproved = await this.checkIfTokenApproved(token);
      return response.send(isApproved);
    } catch (error) {
      next(error);
    }
  }
}
