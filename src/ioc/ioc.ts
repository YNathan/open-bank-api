import "reflect-metadata";
import getDecorators from "inversify-inject-decorators";
import { Container, inject } from "inversify";
import {
  autoProvide,
  provide,
  fluentProvide,
  buildProviderModule,
} from "inversify-binding-decorators";
import { EventEmitter } from "events";
import { interfaces } from "inversify-express-utils";
import { GuardMiddleware } from "../middlewares/guard.middleware";
import { LoggerMiddleware } from "../middlewares/logger.middleware";
import { Config, config } from "../config/config";
import { TYPES } from "./types";
import { UserServiceImpl } from "../service/user.service-impl";
import { AuthService } from "../service/auth.service";
import { UserRepository } from "../repositories/user.repository";
import { AuthServiceImpl } from "../service/auth.service-impl";
import { UserService } from "../service/user.service";
// eslint-disable-next-line
// @ts-ignore
import { AuthController } from "../controllers/auth.controller";
import { UserRepositoryImpl } from "../repositories/user.repository-impl";
import { CustomerRepository } from "../repositories/customer.repository";
import {  CustomerRepositoryImpl } from "../repositories/customer.repository-impl";
import {CustomerController} from "../controllers/customer.controller";
import {UserController} from "../controllers/user.controller";
import { DbManagerService } from "../service/db.manager.service";
import { CustomerService } from "../service/customer.service";
import {CustomerServiceImpl} from "../service/customer.service-impl";
import {DbManagerServiceImpl} from "../service/db.manager.service-impl";
import { UserRegisterMiddleware } from "../middlewares/user.register.middleware";
import {CustomerCreateMiddleware} from "../middlewares/customer.create.middleware";

const container = new Container({
  defaultScope: "Singleton",
});
container.load(buildProviderModule());
const decObject = getDecorators(container, false);
const { lazyInject } = decObject;

const provideNamed = (identifier, name) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fluentProvide(identifier).whenTargetNamed(name).done();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const provideSingleton = (identifier: any) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  fluentProvide(identifier).inSingletonScope().done();

const loadContainer = (isProductionMode = false): Container => {
  container.bind<Config>(TYPES.Config).toConstantValue(config);
  container.bind<AuthController>(TYPES.AuthController).to(AuthController);
  container
    .bind<interfaces.Controller>("Controller")
    .to(AuthController)
    .whenTargetNamed("AuthController");
  container
      .bind<interfaces.Controller>("Controller")
      .to(CustomerController)
      .whenTargetNamed("CustomerController");
  container
      .bind<interfaces.Controller>("Controller")
      .to(UserController)
      .whenTargetNamed("UserController");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  container.bind<any>(TYPES.EventEmitter).toConstantValue(new EventEmitter());
  container.bind<GuardMiddleware>(TYPES.GuardMiddleware).to(GuardMiddleware);
  container.bind<LoggerMiddleware>(TYPES.LoggerMiddleware).to(LoggerMiddleware);
  container.bind<UserRegisterMiddleware>(TYPES.UserRegisterMiddleware).to(UserRegisterMiddleware);
  container.bind<CustomerCreateMiddleware>(TYPES.CustomerCreateMiddleware).to(CustomerCreateMiddleware);

  container.bind<AuthService>(TYPES.AuthService).to(AuthServiceImpl);
  container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
  container.bind<CustomerService>(TYPES.CustomerService).to(CustomerServiceImpl);
  
  container.bind<DbManagerService>(TYPES.DbManagerService).to(DbManagerServiceImpl);
  if (isProductionMode) {
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);
    container.bind<CustomerRepository>(TYPES.CustomerRepository).to(CustomerRepositoryImpl);
  } else {
    // container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryMock);
  }

  return container;
};

export {
  lazyInject,
  container,
  autoProvide,
  provide,
  provideSingleton,
  provideNamed,
  inject,
  loadContainer,
};

