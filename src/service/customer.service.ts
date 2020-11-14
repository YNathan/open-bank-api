import { Request, Response, NextFunction } from "express";
import { Customer } from "../models/dto/costumer.dto";

export interface CustomerService {
  getAllCustomer(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<Customer[]>>;

  getOneCustomer(
    id: string,
    response: Response,
    next: NextFunction
  ): Promise<Response<Customer>>;

  createNewCustomer(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<Customer>>;

  updateCustomerAccountPermissionPermissionStatus (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<Response<Customer>>;

  update(
    request: Request,
    response: Response,
    next: NextFunction):
  Promise<Response<Customer>>; 

  deleteCustomer(
    id: string,
    response: Response,
    next: NextFunction
  ): Promise<Response<boolean>>;


}
