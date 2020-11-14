import { v1 as uuidv1 } from "uuid";

export class UuidSupport {
  public static generateUuid(): string {
    return uuidv1();
  }

  static isNou(object: unknown): boolean {
    return object === undefined || object === null;
  }
}
