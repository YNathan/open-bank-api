

import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/http-errors/unauthorized-error";
import { ErrorCodes } from "../exceptions/error-codes";
import { UuidSupport } from "../support/uuid.support";


@injectable()
export class CustomerUpdateMiddleware extends BaseMiddleware {
  private TAG = `[${CustomerUpdateMiddleware.name}]`;

  requiredFields: string[] = ["customerID"]

  handler(request: Request,
    response: Response,
    next: NextFunction): void {

    for (const field of this.requiredFields) {
      if (UuidSupport.isNou(request.body[field])) {
        next(new UnauthorizedError(
          ErrorCodes.ERROR_BAD_TOKEN,
          `Failed to update customer missing body field: ${field}`
        ));
        return;
      }

   
      next();
    }
  }
}