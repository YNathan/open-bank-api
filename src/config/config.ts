import {UuidSupport} from "../support/uuid.support";


/* eslint no-use-before-define: 0 */
// prettier-ignore
// Env vars...
const appName = "Bank Customer Api";
const serverPort: number = Number(process.env.SERVER_PORT) || 3000;
// prettier-ignore
const letsEncryptHttpPort: number = Number(process.env.LETS_ENCRYPT_HTTP_PORT) || 8080;
// prettier-ignore
const letsEncryptHttpsPort: number = Number(process.env.LETS_ENCRYPT_HTTPS_PORT) || 8443;
// prettier-ignore
const fakeDbPath = 'bank-discount-db/data';
// prettier-ignore
const sslKeyPath: string = process.env.SSL_KEY_PATH || "bank-discount-db/certs/key.pem";
// prettier-ignore
const sslCrtPath: string = process.env.SSL_CRT_PATH || "bank-discount-db/certs/cert.pem";
// prettier-ignore
const sslPassPhrase: string = process.env.SSL_PASS_PHRASE || "disdisdis";


// prettier-ignore
const machineName: string = process.env.MACHINE_NAME || UuidSupport.generateUuid();
// prettier-ignore
const letsEncryptCertPath: string = process.env.LETS_ENCRYPT_CERT_PATH || "/tmp/acme-challenges";
// prettier-ignore
const letsEncryptMail: string = process.env.LETS_ENCRYPT_MAIL || "john.doe@example.com";

// prettier-ignore
const jwtAppSecret: string = process.env.JWT_APP_SECRET || "jwtAppSecreteHere";
const jwtExpireTime = 604800; // one week
const ssl = !!process.env.SSL;
const allowCors = !!process.env.CORS;
const letsEncrypt: boolean = process.env.LETS_ENCRYPT === "true" || false;
/* eslint no-use-before-define: 2 */
export type Config = {
    serverPort: number;
    letsEncryptHttpPort: number;
    letsEncryptHttpsPort: number;
    appName: string;
    letsEncryptMail: string;
    letsEncryptCertPath: string;
    jwtAppSecret: string;
    jwtExpireTime: number;
    ssl: boolean;
    letsEncrypt: boolean;
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
    letsEncrypt,
    letsEncryptHttpPort,
    letsEncryptHttpsPort,
    letsEncryptCertPath,
    letsEncryptMail,
    allowCors,
    fakeDbPath,
    sslPassPhrase
};

export {config};
