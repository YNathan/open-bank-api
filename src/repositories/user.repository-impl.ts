import {inject, injectable} from "inversify";
import { User } from "../models/domain/user.entity";
import { UserRepository } from "./user.repository";
import {TYPES} from "../ioc/types";
import {DbManagerService} from "../service/db.manager.service";
import {getManager} from "typeorm";


@injectable()
export class UserRepositoryImpl implements UserRepository {

 tableName: string;
  constructor(
      @inject(TYPES.DbManagerService)
      private readonly dbManagerService: DbManagerService
  ) {
    this.tableName = User.name.toLowerCase();
  }

  public async createNew(newUsr: User): Promise<User> {
    console.log(User.name);
    return this.dbManagerService.addNew<User>(this.tableName, newUsr);
  }

  public async findByEmail(email: string): Promise<User> {
    let usrToReturn: User;
    const allUsers = await this.dbManagerService.getAllEntities<User>(this.tableName);
    for(const usr of allUsers){
      if(usr.email === email){
        usrToReturn = usr;
      }
    }
    return usrToReturn;
  }

  public async getById(id: string): Promise<User> {
    const user = await this.dbManagerService.getEntityById<User>(this.tableName,id);
    return user;
  }

  public async updateValues(usr: User): Promise<User> {
    const updatedUsr = await this.dbManagerService.updateEntity<User>(getManager().getRepository(User).metadata.tableName,usr.id, usr);
    return updatedUsr;
  }
}
