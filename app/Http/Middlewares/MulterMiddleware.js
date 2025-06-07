import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Caminho absoluto para a pasta 'storage/' na raiz
const storageDir = path.resolve('storage');

// Garante que a pasta 'storage/' exista
if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
}

// Configuração do multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, storageDir); // Salva diretamente em /storage
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now();
        const nomeSanitizado = file.originalname.replace(/\s+/g, '_');
        cb(null, `${timestamp}_${nomeSanitizado}`);
    }
});

const fileFilter = (req, file, cb) => {
    cb(null, true); // Aqui você pode filtrar tipos, se quiser
};

export default multer({ storage, fileFilter });
