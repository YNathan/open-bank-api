import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { UserDto } from "../models/dto/user/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { ErrorCodes } from "../exceptions/error-codes";
import { BadRequestError } from "../exceptions/http-errors/bad-request-error";
import { UserService } from "./user.service";
import { UserTransformer } from "../transformers/user.transformer";
import { User } from "../models/domain/user.entity";
import { TYPES } from "../ioc/types";
import {UuidSupport} from "../support/uuid.support";
import {BcryptSupport} from "../support/bcrypt.support";
import url from 'url';

@injectable()
export class UserServiceImpl implements UserService {
  protected TAG = `[${UserServiceImpl.name}]`;

  constructor(
    @inject(TYPES.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async registerUserRequest(
    request: Request,
    response: Response<UserDto>,
    next: NextFunction
  ): Promise<Response<UserDto>> {
    const { name } = request.body;
    const { email } = request.body;
    const { password } = request.body;

    const alreadyExistUser = await this.userRepository.findByEmail(email);
    if (alreadyExistUser) { 
      const userDto: UserDto = UserTransformer.modelToDto(alreadyExistUser);

      return response.status(200).send(userDto);
    }
   
    const hashedPassword = await BcryptSupport.generate(password, 16.5);
    try {
      const queryResult: User = await this.userRepository.createNew(
        UserTransformer.dtoToModel({
          id: UuidSupport.generateUuid(),
          name,
          email,
          password: hashedPassword
        })
      );

      const userDto: UserDto = UserTransformer.modelToDto(queryResult);

      return response.status(200).send(userDto);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async getUser(
    request: Request,
    response: Response<UserDto>
  ): Promise<Response<UserDto>> {
    const requestedUserId =  url.parse(request.url,true).query.id as string;
    let user = {};
    const requestedUser = await this.userRepository.getById(requestedUserId);
    if (requestedUser) { 
      user = UserTransformer.modelToDto(requestedUser);
    }
    return response.send(user as UserDto);
  }
}
