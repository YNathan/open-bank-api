

import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../exceptions/http-errors/unauthorized-error";
import { ErrorCodes } from "../exceptions/error-codes";
import { UuidSupport } from "../support/uuid.support";


@injectable()
export class CustomerCreateMiddleware extends BaseMiddleware {
  private TAG = `[${CustomerCreateMiddleware.name}]`;

  requiredFields: string[] = [
    "clientBank",
    "clientID",
    "consentID",
    "customerID",
    "customerPassport",
    "consentTrack",
    "consentStatus",
    "activationStatus",
    "customerSite",
    "consentReusability",
    "acceptedDate",
    "confirmationTimestamp",
    "validFrom",
    "validUntil",
    "modificationTimestamp",
    "cancellationTimestamp",
    "cancellationReason",
    "cancellationInitiator",
    "frequencyPerDay",
    "accountPermissions"];
  
  
  nestedAcountPermissionObjectRequierd = [
    "scope",
    "accountNumberIBAN",
    "openingBranch",
    "accountNumber",
    "productCode",
    "currencyCode",
    "accountStatus",
    "managingBranch"
  ]

  handler(request: Request,
    response: Response,
    next: NextFunction): void {

    for (const field of this.requiredFields) {
      if (UuidSupport.isNou(request.body[field])) {
        next(new UnauthorizedError(
          ErrorCodes.ERROR_BAD_TOKEN,
          `Failed to register user missing request body field: ${field}`
        ));
        return;
      }

      if (field === "accountPermissions") {

        for (const field of this.nestedAcountPermissionObjectRequierd) {
          for (const permissionObj of request.body["accountPermissions"]) { 
            if (UuidSupport.isNou(permissionObj[field])) {
              next(new UnauthorizedError(
                ErrorCodes.ERROR_BAD_TOKEN,
                `Failed to register user missing request body accountPermissions -> field: ${field}`
              ));
              return;
            }
          }
          return;
        }
      }
      next();
    }
  }
}