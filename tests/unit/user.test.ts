import { expect } from "chai";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../../src/ioc/types";
import { UserService } from "../../src/service/user.service";
import { getTestContainer } from "../utils/bootstrap";

describe("user - unit", () => {
  const container = getTestContainer();

  let userService: UserService;
  let error: unknown;
  let status: number;

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

    
    expect((result as any).name).equals("test1");
  });
});
