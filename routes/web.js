import { Router } from 'express';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


import ListPublicFilesController from '../app/Http/Controllers/ListPublicFilesController.js';
import DateController from '../app/Http/Controllers/DateController.js';
import swagger from '../config/swagger.js';

export default (function () {

    const router = Router();
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Rota para listar arquivos na pasta 'public'
    router.get('/', ListPublicFilesController);

    // Documentação Swagger
    router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagger));

    router.get('/date', DateController);

    router.get('/env', (request, response) => {
        return response.status(CONSTANTS.HTTP.SUCCESS).json({
            env: process.env,
            CONSTANTS: globalThis.CONSTANTS
        })
    });

    return router;

})();
