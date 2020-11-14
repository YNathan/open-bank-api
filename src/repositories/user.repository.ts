import { User } from "../models/domain/user.entity";

export interface UserRepository {
  createNew(newUsr: User): Promise<User>;

  findByEmail(email: string): Promise<User>;

  getById(id: string): Promise<User>;

  updateValues(usr: User): Promise<User>;


}
