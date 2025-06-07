import { Router } from 'express';
import VerifyPdf from '../app/Http/Middlewares/VerifyPdfMiddleware.js';
import UploadPdf from '../app/Http/Controllers/UploadDocumentoController.js';
import MulterMiddleware from '../app/Http/Middlewares/MulterMiddleware.js'; 

export default (() => {
    const router = Router();

    router.post('/users/pdf', MulterMiddleware.single('pdf'), VerifyPdf, UploadPdf);

    return router;
})();
