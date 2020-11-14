import {
  interfaces,
  controller,
  request,
  response,
  next,
  injectHttpContext,
  httpGet,
  httpPost,
} from "inversify-express-utils";

import {ApiPath, ApiOperationGet, ApiOperationPut, ApiOperationPost} from "swagger-express-ts";
import { Request, Response, NextFunction } from "express";
import { TYPES } from "../ioc/types";
import { UserDto } from "../models/dto/user/user.dto";
import {inject} from "inversify";
import {UserService} from "../service/user.service";

@ApiPath({
  path: "/user",
  name: "User",
})
@controller("/user", TYPES.LoggerMiddleware)
export class UserController implements interfaces.Controller {

  @inject(TYPES.UserService) private readonly userService: UserService;

  @injectHttpContext private readonly _httpContext: interfaces.HttpContext;


  @httpPost("/register",TYPES.UserRegisterMiddleware)
  private registerUser(
    @request() request_: Request,
    @response() response_: Response,
    @next() next_: NextFunction
  ): Promise<Response<UserDto>> {
    return this.userService.registerUserRequest(request_, response_, next_);
  }

  @ApiOperationGet({
    description: "Get the User Model",
    summary: "Get User",
    security: { apiKeyHeader: [] },
    responses: {
      200: { description: "Success", model: "UserDto" },
      401: { description: "unauthorized, no token provided in headers" },
    },
  })
  @httpGet("/", TYPES.GuardMiddleware)
  private getUser(
    @request() request_: Request,
    @response() response_: Response,
    @next() next_: NextFunction
  ): Promise<Response<UserDto>> {
    return this.userService.getUser(request_, response_, next_);
  }
}
