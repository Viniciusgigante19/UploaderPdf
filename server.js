import chalk from 'chalk';
import express from 'express';

import "./bootstrap/app.js";
import routes from "./routes/routes.js";
import initRelations from './config/sequelize_relations.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';  // Importa o swagger configurado

const app = express();

// Middlewares para tratar JSON e dados URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Inicializar as relações do banco (Sequelize)
initRelations();

// Rota para a interface do Swagger UI usando o swaggerSpec importado
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicializar as rotas
app.use("/", routes);

// Configuração da porta
const webPort = process.env.PORT || 3000;
const nodePort = process.env.NODE_PORT || webPort;
const port = 3000;

console.log(chalk.blue(`Container: ${process.env.IS_CONTAINER}`));

app.listen(nodePort, () => {
  console.log(chalk.green(`Servidor: http://localhost:${webPort}`));
  console.log(chalk.yellow(`Apis Swagger: http://localhost:${port}/docs`));
});
