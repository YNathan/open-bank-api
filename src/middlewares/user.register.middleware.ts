import {injectable} from "inversify";
import {BaseMiddleware} from "inversify-express-utils";
import {NextFunction, Request, Response} from "express";
import {UnauthorizedError} from "../exceptions/http-errors/unauthorized-error";
import {ErrorCodes} from "../exceptions/error-codes";

@injectable()
export class UserRegisterMiddleware extends BaseMiddleware {
    private TAG = `[${UserRegisterMiddleware.name}]`;

    requiredFields: string[] = ['email', 'password', 'name'];

    handler(request: Request,
            response: Response,
            next: NextFunction): void {

        for (const field of this.requiredFields) {
            if (!request.body[field]) {
                next(new UnauthorizedError(
                    ErrorCodes.ERROR_BAD_TOKEN,
                    `Failed to register user missing request body field: ${field}`
                ))
                return;
            }
        }
        next();
    }
}
