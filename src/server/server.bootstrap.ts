import { Application } from "express";
import { IBootstrap } from "./bootstrap.interface";
import http from 'http';
import env from "../core/environment/env";

export default class implements IBootstrap{

    constructor(private app: Application){}

    init(): Promise<any> {
        return new Promise((resolve, reject) => {
            const server = http.createServer(this.app);
            server
                .listen(env.PORT)
                .on('listening', () => {
                    console.log(`Server on port ${env.PORT}`)
                    resolve(`Server on port ${env.PORT}`)
                })
                .on('error', (err) => {
                    console.log(`Error: ${err}`)
                    reject(`Error: ${err}`)
                })
        })
    }
    close(): void {
        process.exit(1);
    }


}