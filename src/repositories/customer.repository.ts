import { Customer } from "../models/dto/costumer.dto";

export interface CustomerRepository {

  getAll(): Promise<Customer[]>;

  getById(id: string): Promise<Customer>;

  createNew(newCstmr: Customer): Promise<Customer>;

  updateValues(cstmr: Customer): Promise<Customer>;

  delete(id: string): Promise<boolean>;


}
