import { expect } from "chai";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../../src/service/user.service";
import { TYPES } from "../../src/ioc/types";
import { AuthService } from "../../src/service/auth.service";
import { UserRepository } from "../../src/repositories/user.repository";

import { getTestContainer } from "../utils/bootstrap";
import { UserDto } from "../../src/models/dto/user/user.dto";
import { config } from "../../src/config/config";

describe("auth - unit", () => {
  const container = getTestContainer();

  let authService: AuthService;
  let userService: UserService;
  let userRepository: UserRepository;
  let request: Request;
  let response: Response;
  let status: number;
  let next: NextFunction;
  let error: unknown;

  function initRequestAndResponse(
    
    request_: any
  ): { request: Request; response: Response; next: NextFunction } {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let request: Request;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let response: Response;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let next: NextFunction;
    (request as unknown) = request_;

    
    (response as any) = {};
    
    (response as any).status = (status_: number) => {
      status = status_;
      
      (response as any).send = (result: any) => result;
      return response;
    };
    
    (response as any).send = (result: any) => result;

    // eslint-disable-next-line prefer-const
    next = (error_: unknown) => {
      error = error_;
    };
    return { request, response, next };
  }

  before(async () => {
    authService = container.get<AuthService>(TYPES.AuthService);
    userService = container.get<UserService>(TYPES.UserService);
  });

  it("auth user request and check password - unit", async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { request, response, next } = initRequestAndResponse({
      body: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
      user: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
    });
    await userService.registerUserRequest(request, response, next);
    request.body = { newPassword: "123123" };
    await authService.changePassword(request, response, next);
    request.body = {
      name: "test1",
      email: "test1@gmail.com",
      password: "123123",
    };
    const result = await authService.authUserRequest(request, response, next);

    
    expect((result as any).user.name).equals("test1");
  });

  it("validate user - unit", async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { request, response, next } = initRequestAndResponse({
      body: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
      user: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
    });
    await userService.registerUserRequest(request, response, next);
    const result = await authService.validateUser("test1@gmail.com");

    
    expect((result as any).name).equals("test1");
  });

  it("check user token - unit", async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { request, response, next } = initRequestAndResponse({
      body: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
      user: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
    });
    const userDto = await userService.registerUserRequest(
      request,
      response,
      next
    );
    const token = await authService.signToken((userDto as any) as UserDto);
    const mathcObject = await authService.verifyToken(
      token,
      config.jwtAppSecret
    );
    // 
    expect((mathcObject as any).user.name).equals("test1");
  });
});
