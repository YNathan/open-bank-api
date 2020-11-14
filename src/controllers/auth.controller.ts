/* eslint-disable @typescript-eslint/indent */
// eslint-disable import/no-cycle
import {
  interfaces,
  controller,
  request,
  response,
  next,
  injectHttpContext,
  httpPost,
} from "inversify-express-utils";
import { ApiPath, ApiOperationPost } from "swagger-express-ts";
import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { TYPES } from "../ioc/types";
import { TokenUserResponseDto } from "../models/dto/user/token-user-response.dto";
import { UserDto } from "../models/dto/user/user.dto";
import {AuthService} from "../service/auth.service";

@ApiPath({
  path: "/auth",
  name: "Auth",
})
@controller("/auth")
export class AuthController implements interfaces.Controller {
  @injectHttpContext private readonly _httpContext: interfaces.HttpContext;

  @inject(TYPES.AuthService) private readonly authService: AuthService;

  @ApiOperationPost({
    description: "Login",
    summary: "User Login",
    path: "/login",
    parameters: {
      body: { model: "LoginRequestDto" },
    },
    responses: {
      200: {
        description: "Success",
        model: "LoginResponseDto",
      },
      400: { description: "Parameters fail", model: "ErrorResponseDto" },
    },
  })
  @httpPost("/login")
  private login(
    @request() request_: Request,
    @response() response_: Response<TokenUserResponseDto>,
    @next() next_: NextFunction
  ): Promise<Response<TokenUserResponseDto>> {
    return this.authService.authUserRequest(request_, response_, next_);
  }

  @ApiOperationPost({
    description: "Logout",
    summary: "User Logout",
    path: "/logout",
    parameters: {},
    security: { apiKeyHeader: [] },
    responses: {
      200: {
        description: "Success",
        model: "LoginResponseDto",
      },
      400: { description: "Parameters fail", model: "ErrorResponseDto" },
    },
  })
  @httpPost("/logout", TYPES.GuardMiddleware)
  private logout(
    @request() request_: Request,
    @response() response_: Response,
    @next() next_: NextFunction
  ): Promise<Response<UserDto>> {
    return this.authService.unauthUserRequest(request_, response_, next_);
  }

  @ApiOperationPost({
    description: "change password",
    summary: "User change password",
    path: "/change_password",
    parameters: {
      body: { model: "passwordChangeRequestDto" },
    },
    security: { apiKeyHeader: [] },
    responses: {
      200: {
        description: "Success",
        model: "PasswordChangeResponseDto",
      },
      400: { description: "Parameters fail", model: "ErrorResponseDto" },
      401: { description: "No token provided", model: "ErrorResponseDto" },
    },
  })
  @httpPost("/change_password", TYPES.GuardMiddleware)
  private changePassword(
    @request() request_: Request,
    @response() response_: Response,
    @next() next_: NextFunction
  ): Promise<UserDto> {
    return this.authService.changePassword(request_, response_, next_);
  }
}
