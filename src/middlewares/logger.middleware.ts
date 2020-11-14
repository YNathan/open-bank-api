import { BaseMiddleware } from "inversify-express-utils";
import * as express from "express";
import * as prettyjson from "prettyjson";
import { injectable } from "inversify";
import { logger } from "../utils/logger";

@injectable()
export class LoggerMiddleware extends BaseMiddleware {
  private TAG = `[${LoggerMiddleware.name}]`;

  public handler(
    request: express.Request,
    result: express.Response,
    next: express.NextFunction
  ) {
    logger.info(
      this.TAG,
      prettyjson.render({
        request: {
          method: request.method,
          originalUrl: request.originalUrl,
          body: request.body,
        },
      }),
      next()
    );
  }
}
