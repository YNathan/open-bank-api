import {inject, injectable} from "inversify";
import {DbManagerService} from "./db.manager.service";
import * as path from 'path';
import {existsSync, readdirSync, readFileSync, writeFileSync} from "fs";
import {TYPES} from "../ioc/types";
import {Config} from "../config/config";
import { mkdir } from "shelljs";

interface IFileObj {
    name: string;
    content: any;
}

@injectable()
export class DbManagerServiceImpl implements DbManagerService {

    private dbPath: string;
    private fakeDb: any = {};

    constructor(@inject(TYPES.Config) private readonly config: Config) {
        this.dbPath = path.resolve((global as any).appRootDir, this.config.fakeDbPath);
        this.loadAllData();
        // will reload the data every 6 sec
        setInterval(() => {
            this.loadAllData();
        }, 6000);
    }


    addNew<T>(tableName: string, entity: T): Promise<T> {
        if(!this.fakeDb[tableName]){
            this.fakeDb[tableName] = {};
        }
        console.log((entity as any).id);
        this.fakeDb[tableName][(entity as any).id] = entity;
        this.updateDb(tableName);
        return Promise.resolve(entity);
    }

    updateEntity<T>(tableName: string, entityId: string, newEntity: T): Promise<T> {
        for (const keyToUpdate of Object.keys(this.fakeDb[tableName][entityId])) {
            this.fakeDb[tableName][entityId][keyToUpdate] = newEntity[keyToUpdate];
        }
        this.updateDb(tableName);
        return Promise.resolve(this.fakeDb[tableName][entityId]);
    }

    deleteEntity<T>(tableName: string, entity: T): Promise<boolean> {
        delete this.fakeDb[tableName][(entity as any).id];
        this.updateDb(tableName);
        return Promise.resolve(true);
    }

    getAllEntities<T>(tableName: string): Promise<T[]> {
        const entities: any[] = [];
        if (this.fakeDb[tableName]) { 
            for (const key of Object.keys(this.fakeDb[tableName])) {
                entities.push(this.fakeDb[tableName][key])
            }
        }
        return Promise.resolve(entities as T[]);
    }

    getEntityById<T>(tableName: string, id: string): Promise<T> {
        let returnedObj: T = undefined;
        if (this.fakeDb[tableName]) { 
            returnedObj = this.fakeDb[tableName][id] as T;
        }
        return Promise.resolve(returnedObj);
    }

    deleteById(tableName: string, id: string): Promise<boolean> {
        delete this.fakeDb[tableName][id];
        this.updateDb(tableName);
        return Promise.resolve(true);
    }


    // file handler function
    loadAllData(): void {
        const filesPathes = this.dynamicGetAllJsonsName();
        for (const path of filesPathes) {
            const fileObj = this.loadJson(path);
            this.fakeDb[fileObj.name.split(".json").join("")] = fileObj.content;
        }
    }

    dynamicGetAllJsonsName(): string[] {
        let paths: string[] = [];
        if (!existsSync(this.dbPath)) {
             mkdir('-p', this.dbPath);
        } else {
            try {
                paths = readdirSync(this.dbPath);
            } catch (e) {
                console.log('Unable to scan directory: ' + e);
            }
        }
        return paths;

    }

    loadJson(jsonFilePath: string): IFileObj {
        const data = readFileSync(`${this.dbPath}/${jsonFilePath}`);
        const dataAsString = data.toString();
        const fileObjToReturn: IFileObj = {
            name: jsonFilePath,
            content: JSON.parse(dataAsString)
        }
        return fileObjToReturn;
    }


    updateDb(tableName: string): void {
        try {
            writeFileSync(`${this.dbPath}/${tableName}.json`, JSON.stringify(this.fakeDb[tableName]));
        } catch (e) {
            console.log(e);
        }
    }

}
