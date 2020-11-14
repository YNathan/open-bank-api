import { BaseMiddleware } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../ioc/types";
import { ErrorCodes } from "../exceptions/error-codes";
import { UnauthorizedError } from "../exceptions/http-errors/unauthorized-error";
import { Config } from "../config/config";
import { AuthService } from "../service/auth.service";

@injectable()
export class GuardMiddleware extends BaseMiddleware {
  private TAG = `[${GuardMiddleware.name}]`;

  @inject(TYPES.Config)
  private config: Config;

  @inject(TYPES.AuthService)
  private authService: AuthService;

  // eslint-disable-next-line consistent-return
  public handler(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const token = request.headers.authorization as string;
    if (!token) {
      return next(
        new UnauthorizedError(ErrorCodes.ERROR_BAD_TOKEN, "No token provided")
      );
    }

    try {
      const decodedToken = this.authService.verifyToken(
        token,
        this.config.jwtAppSecret
      );
      
      (request as any).user = decodedToken.user;
      
      (request as any).token = decodedToken;
      next();
    } catch {
      next(
        new UnauthorizedError(
          ErrorCodes.ERROR_BAD_TOKEN,
          "Failed to authenticate token."
        )
      );
    }
  }
}
