import 'dotenv/config';
export declare const appSettings: {
    port: number;
    development: string;
    mainLanguage: string;
    maxFileSize: {
        admin: number;
        front: number;
    };
    jwt: {
        secret: string;
        expireIn: string;
        refreshSecret: string;
        refreshExpireIn: string;
        issuer: string;
    };
    openIdConnect: {
        sessionSecret: string;
    };
    mongoose: {
        uri: string;
    };
    s3: {
        accessKey: string;
        secretKey: string;
        bucket: string;
        folder: string;
        region: string;
        distribution: string;
    };
    redis: {
        heathCheck: boolean;
        host: string;
        port: number;
        username: string;
        password: string;
    };
};
