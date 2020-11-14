import {inject, injectable} from "inversify";
import {TYPES} from "../ioc/types";
import {DbManagerService} from "../service/db.manager.service";
import { Customer } from "../models/dto/costumer.dto";
import { CustomerRepository } from "./customer.repository";


@injectable()
export class CustomerRepositoryImpl implements CustomerRepository {

 tableName: string;
  constructor(@inject(TYPES.DbManagerService) private readonly dbManagerService: DbManagerService) {
    this.tableName = Customer.name.toLowerCase();
  }


  public async getAll(): Promise<Customer[]> {
    return await this.dbManagerService.getAllEntities<Customer>(this.tableName);
  }


  public async getById(id: string): Promise<Customer> {
    const user = await this.dbManagerService.getEntityById<Customer>(this.tableName,id);
    return user;
  } 
  
  public async createNew(cstmr: Customer): Promise<Customer> {
    const dbParseCustomer: any = cstmr;
    dbParseCustomer.id = cstmr.customerID;
    return this.dbManagerService.addNew<Customer>(this.tableName, dbParseCustomer);
  }



  public async updateValues(cstmr: Customer): Promise<Customer> {
    return await this.dbManagerService.updateEntity<Customer>(this.tableName,cstmr.customerID, cstmr);
  }

  public async delete(id: string): Promise<boolean> {
    return await this.dbManagerService.deleteById(this.tableName,id);
  }
}
