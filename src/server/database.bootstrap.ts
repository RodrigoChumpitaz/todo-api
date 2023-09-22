import { DataSource } from "typeorm";
import { IBootstrap } from "./bootstrap.interface";
import env, { IDbConfig } from "../core/environment/env";

export default class DatabaseBootstrap implements IBootstrap{
    private static dbInstance: DataSource;
    init(): Promise<any> {
        const dbConfig: IDbConfig = env.DB_CONFIG;
        const datataSource = new DataSource({
            type: 'mysql',
            ...dbConfig,
            migrations: [],
            subscribers: []
        });
        DatabaseBootstrap.dbInstance = datataSource;
        return datataSource.initialize();
    }
    close(): void {
        DatabaseBootstrap.dbInstance?.destroy();
    }

    static get AppDataSource(): DataSource{
        return DatabaseBootstrap.dbInstance;
    }

}