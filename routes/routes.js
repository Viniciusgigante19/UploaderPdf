import { Router } from 'express';
import express from 'express';

import api from './api.js';
import web from './web.js';
import JwtAuthMiddleware from '../app/Http/Middlewares/JwtAuthMiddleware.js';
import LoginJwtController from '../app/Http/Controllers/LoginJwtController.js';
import CriarUsuariosController from '../app/Http/Controllers/CriarUsuariosController.js';
import LogMiddleware from '../app/Http/Middlewares/LogMiddleware.js';

export default (function () {

    const router = Router();

    /** Usado para servir json */
    router.use(express.json());

    router.use(express.urlencoded({ extended: true }));

    // Apis
    router.use('/api', JwtAuthMiddleware, LogMiddleware, api);
    router.post('/login', LoginJwtController);
    router.get('/criar-usuarios', CriarUsuariosController);

    ////
    router.use('/', web);

    /** Se nenhuma rota for encontrada, 404 neles! */
    router.use((request, response) => {
        response.status(CONSTANTS.HTTP.NOT_FOUND).json({ error: "Not found" });
    });

    return router;

})();
