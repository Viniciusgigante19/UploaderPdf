import dotenv from 'dotenv';
dotenv.config(); // <- Isso precisa vir ANTES de qualquer uso de process.env

import { Sequelize } from 'sequelize';


export default (function () {

    const env = process.env;

    const port = (env.IS_CONTAINER === "TRUE") ? (env.POSTGRES_PORT) : (6789);

    const host = (env.IS_CONTAINER === "TRUE") ? (env.POSTGRES_HOST) : ("localhost");

    const conection = new Sequelize(
        env.POSTGRES_DB,
        env.POSTGRES_USER,
        env.POSTGRES_PASSWORD,
        {
            host: host,
            port: port,
            dialect: 'postgres'
        }
    );

    return conection;

})();