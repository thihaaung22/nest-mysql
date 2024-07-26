import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import settings from "./settings";
import { join } from "path";

export const ormconfig: TypeOrmModuleOptions & SeederOptions & DataSourceOptions = {
    type: "mariadb",
    host: settings.DATABASE.HOST,
    port: parseInt(settings.DATABASE.PORT, 10) || 3306,
    username: settings.DATABASE.USERNAME,
    password: settings.DATABASE.PASSWORD,
    database: settings.DATABASE.NAME,
    synchronize: true,
    logging: false,
    entities: [join(__dirname, "/../entities/**/*.entity{.ts,.js}")],
}