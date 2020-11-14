import {UuidSupport} from "../support/uuid.support";

const appName = "Bank Customer Api";
const serverPort: number = Number(process.env.SERVER_PORT) || 3000;
const fakeDbPath = 'bank-discount-db/data';
const sslKeyPath: string = process.env.SSL_KEY_PATH || "bank-discount-db/certs/key.pem";
const sslCrtPath: string = process.env.SSL_CRT_PATH || "bank-discount-db/certs/cert.pem";
const sslPassPhrase: string = process.env.SSL_PASS_PHRASE || "disdisdis";
const machineName: string = process.env.MACHINE_NAME || `Bank_Customer_Api_Machine_ID#${UuidSupport.generateUuid()}`;

// prettier-ignore
const jwtAppSecret: string = process.env.JWT_APP_SECRET || "jwtAppSecreteHere";
const jwtExpireTime = 604800; // one week
const ssl = !!process.env.SSL;
const allowCors = !!process.env.CORS;
/* eslint no-use-before-define: 2 */
export type Config = {
    serverPort: number;
    appName: string;
    jwtAppSecret: string;
    jwtExpireTime: number;
    ssl: boolean;
    sslKeyPath?: string;
    sslCrtPath?: string;
    fakeDbPath?: string;
    sslPassPhrase?: string;
};

const config = {
    machineName,
    serverPort,
    appName,
    jwtAppSecret,
    jwtExpireTime,
    ssl,
    sslKeyPath,
    sslCrtPath,
    allowCors,
    fakeDbPath,
    sslPassPhrase
};

export {config};
