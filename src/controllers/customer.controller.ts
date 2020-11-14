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

import {ApiPath, ApiOperationGet} from "swagger-express-ts";
import {Request, Response, NextFunction} from "express";
import {TYPES} from "../ioc/types";
import {inject} from "inversify";

import { CustomerService } from "../service/customer.service";
import { Customer } from "../models/dto/costumer.dto";


@ApiPath({
    path: "/customer",
    name: "Customer",
})
@controller("/customer", TYPES.LoggerMiddleware)
export class CustomerController implements interfaces.Controller {
    @injectHttpContext private readonly _httpContext: interfaces.HttpContext;

    @inject(TYPES.CustomerService) private readonly customerService: CustomerService;


    @httpPost("/create",TYPES.GuardMiddleware, TYPES.CustomerCreateMiddleware)
    private createCustomer(
        @request() request_: Request,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer>> {
        return this.customerService.createNewCustomer(request_, response_, next_);
    }

    @ApiOperationGet({
        description: "Get the customer Model",
        summary: "Get customer",
        security: {apiKeyHeader: []},
        responses: {
            200: {description: "Success", model: "Customer"},
            401: {description: "unauthorized, no token provided in headers"},
        },
    })
    @httpGet("/", TYPES.GuardMiddleware)
    private getOneCustomer(
        @request() request_: Request,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer>> {
        return this.customerService.getOneCustomer(request_, response_, next_);
    }

    @ApiOperationGet({
        description: "Get the customer Model",
        summary: "Get customer",
        security: {apiKeyHeader: []},
        responses: {
            200: {description: "Success", model: "Customer"},
            401: {description: "unauthorized, no token provided in headers"},
        },
    })
    @httpGet("/All", TYPES.GuardMiddleware)
    private getAllCustomers(
        @request() request_: Request,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer[]>> {
        return this.customerService.getAllCustomer(request_, response_, next_);
    }
}
