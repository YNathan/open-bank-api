import {
    interfaces,
    controller,
    request,
    response,
    next,
    injectHttpContext,
    httpGet,
    httpPost,
    httpDelete,
    requestParam,
} from "inversify-express-utils";

import {ApiPath, ApiOperationGet, ApiOperationDelete} from "swagger-express-ts";
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
        path: '/one/{id}',
        description: "Get a customer by id",
        summary: "delete customer",
        parameters: {
            path: {
                id: {
                    description: 'Id of version',
                    required: true,
                },
            },
        },
        security: {apiKeyHeader: []},
        responses: {
            200: {description: "Success", model: "Customer"},
            401: {description: "unauthorized, no token provided in headers"},
        },
    })
    @httpGet("/one/:id", TYPES.GuardMiddleware)
    private getOneCustomer(
        @requestParam("id") id: string,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer>> {
        return this.customerService.getOneCustomer(id, response_, next_);
    }

    @ApiOperationGet({
        description: "Get all customer",
        summary: "Get customer",
        security: {apiKeyHeader: []},
        responses: {
            200: {description: "Success", model: "Customer"},
            401: {description: "unauthorized, no token provided in headers"},
        },
    })
    @httpGet("/all", TYPES.GuardMiddleware)
    private getAllCustomers(
        @request() request_: Request,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer[]>> {
        return this.customerService.getAllCustomer(request_, response_, next_);
    }

    @ApiOperationDelete({
        path: '/{id}',
        summary: "delete customer",
        parameters: {
            path: {
                id: {
                    description: 'Id of version',
                    required: true,
                },
            },
        },
        responses: {
            200: {description: "Success"},
            401: {description: "unauthorized, no token provided in headers"},
        },
    })
    @httpDelete("/:id", TYPES.GuardMiddleware)
    private deleteCustomer(
        @requestParam("id") id: string,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<boolean>> {
        return this.customerService.deleteCustomer(id, response_, next_);
    }


    @httpPost("/update",TYPES.GuardMiddleware, TYPES.CustomerUpdateMiddleware)
    private updateCustomer(
        @request() request_: Request,
        @response() response_: Response,
        @next() next_: NextFunction
    ): Promise<Response<Customer>> {
        return this.customerService.update(request_, response_, next_);
    }
}
