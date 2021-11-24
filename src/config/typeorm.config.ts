import {ConnectionOptions} from "typeorm";

export default {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: ['dist/**/*.entity.{js,ts}'],
    synchronize: false,
    logging: true,
    migrationsRun: false,
    migrations: [
        'dist/src/database/migrations/*.{js,ts}'
    ],
    cli: {
        entitiesDir: "src/entity",
        migrationsDir: "src/database/migrations"
    }
} as ConnectionOptions