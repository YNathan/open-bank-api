import { inject, injectable } from "inversify";
import { Request, Response, NextFunction } from "express";
import { ErrorCodes } from "../exceptions/error-codes";
import { BadRequestError } from "../exceptions/http-errors/bad-request-error";
import { TYPES } from "../ioc/types";
import url from "url";
import { Customer } from "../models/dto/costumer.dto";
import { CustomerService } from "./customer.service";
import { CustomerRepository } from "../repositories/customer.repository";

@injectable()
export class CustomerServiceImpl implements CustomerService {
  protected TAG = `[${CustomerServiceImpl.name}]`;

  constructor(
    @inject(TYPES.CustomerRepository)
    private readonly customerRepository: CustomerRepository
  ) {}

  public async getOneCustomer(
    id: string,
    response: Response<Customer>
  ): Promise<Response<Customer>> {
    const requestedCustomer = await this.customerRepository.getById(id);

    return response.send(requestedCustomer);
  }

  public async createNewCustomer(
    request: Request,
    response: Response<Customer>,
    next: NextFunction
  ): Promise<Response<Customer>> {
    try {
      let alreadyExistCustomer = await this.customerRepository.getById(
        (request.body as Customer).customerID
      );
      if (!alreadyExistCustomer) {
        alreadyExistCustomer = await this.customerRepository.createNew(
          request.body as Customer
        );
      }
      return response.status(200).send(alreadyExistCustomer);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async deleteCustomer(
    id: string,
    response: Response<boolean>,
    next: NextFunction
  ): Promise<Response<boolean>> {
    try {
      const user = await this.customerRepository.getById(id);
      let isExistAndDeleted = false;
      if (user) {
        isExistAndDeleted = await this.customerRepository.delete(id);
      }
      return response.status(200).send(isExistAndDeleted);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async getAllCustomer(
    request: Request,
    response: Response<Customer[]>,
    next: NextFunction
  ): Promise<Response<Customer[]>> {
    try {
      const customers = await this.customerRepository.getAll();
      return response.status(200).send(customers);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async updateCustomerAccountPermissionPermissionStatus(
    request: Request,
    response: Response<Customer>,
    next: NextFunction
  ): Promise<Response<Customer>> {
    try {
      const updatedCustomer = await this.customerRepository.updateValues(
        request.body
      );
      return response.status(200).send(updatedCustomer);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async update(
    request: Request,
    response: Response<Customer>,
    next: NextFunction
  ): Promise<Response<Customer>> {
    try {
      const updatedCustomer = await this.customerRepository.updateValues(
        request.body
      );
      return response.status(200).send(updatedCustomer);
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }

  public async updateCustomer(
    request: Request,
    response: Response<Customer>,
    next: NextFunction
  ): Promise<Response<Customer>> {
    try {
      const customerToUpdate = await this.customerRepository.getById(
        (request.body as Customer).customerID
      );
      if (customerToUpdate) {
        const updatedCustomer = await this.customerRepository.updateValues(
          request.body
        );
        return response.status(200).send(updatedCustomer);
      }
    } catch (error) {
      next(new BadRequestError(ErrorCodes.ERROR_UNKNOWN, error.message));
    }
  }
}
