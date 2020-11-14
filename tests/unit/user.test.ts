import { expect } from "chai";
import { NextFunction, request, Request, response, Response } from "express";
import { next } from "inversify-express-utils";
import { TYPES } from "../../src/ioc/types";
import { UserService } from "../../src/service/user.service";
import { UserRepository } from "../../src/repositories/user.repository";
import { UserRepositoryMock } from "../../src/repositories/user.repository-mock";
import { UserTransformer } from "../../src/transformers/user.transformer";
import { getTestContainer } from "../utils/bootstrap";
import { User } from "../../src/models/domain/user.entity";

describe("user - unit", () => {
  const container = getTestContainer();

  let userService: UserService;
  let error: unknown;
  let status: number;

  function initRequestAndResponse(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    request_: any
  ): { request: Request; response: Response; next: NextFunction } {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let request: Request;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let response: Response;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    let next: NextFunction;
    (request as unknown) = request_;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any) = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).status = (status_: number) => {
      status = status_;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (response as any).send = (result: any) => result;
      return response;
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response as any).send = (result: any) => result;

    // eslint-disable-next-line prefer-const
    next = (error_: unknown) => {
      error = error_;
    };
    return { request, response, next };
  }

  before(async () => {
    userService = container.get<UserService>(TYPES.UserService);
  });

  it("create - unit", async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { request, response, next } = initRequestAndResponse({
      body: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
    });

    const result = await userService.registerUserRequest(
      request,
      response,
      next
    );

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).name).equals("test1");
  });

  it("get user as dto - unit", async () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { request, response, next } = initRequestAndResponse({
      user: {
        name: "test1",
        email: "test1@gmail.com",
        password: "123123",
      },
    });

    const result = await userService.getUser(request, response, next);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((result as any).name).equals("test1");
  });
});
