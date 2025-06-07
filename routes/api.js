import { Router } from 'express';
import middlewareMulterPdf from './RotaPdf.js';


export default (function () {

    const router = Router();

    //Users
    router.use("/",middlewareMulterPdf);

    return router;

})();
