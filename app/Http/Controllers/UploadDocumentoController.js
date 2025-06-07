import path from 'path';
import fs from 'fs/promises';
import DocumentoModel from '../../Models/DocumentModel.js';
import CONSTANTS from '../../../config/constants.js';

export default async (request, response) => {
    const arquivo = request.file; // multer usa request.file para single upload
    const idUser = request.user.id;

    if (!idUser) {
        return response.status(CONSTANTS.HTTP.NOT_FOUND)
            .json({ error: 'Usuário não encontrado' });
    }

    if (!arquivo) {
        return response.status(CONSTANTS.HTTP.BAD_REQUEST)
            .json({ error: 'Arquivo não enviado' });
    }

    const newName = `${Date.now()}_${arquivo.originalname.replace(/\s+/g, '_')}`;
    const caminhoAtual = arquivo.path;
    const pastaDestino = path.join(CONSTANTS.DIR, 'storage', 'documents');
    const caminhoFinal = path.join(pastaDestino, newName);

    try {
        await fs.mkdir(pastaDestino, { recursive: true });
        await fs.rename(caminhoAtual, caminhoFinal);

        // grava o documento no banco
        await DocumentoModel.create({
            caminho: newName,
            id_user: idUser
        });

        return response.json({
            mensagem: 'Documento enviado com sucesso!',
            arquivo: newName
        });

    } catch (err) {
        console.error(err);
        try { await fs.unlink(caminhoFinal); } catch {}

        return response.status(CONSTANTS.HTTP.SERVER_ERROR)
            .json({ error: 'Erro ao salvar documento' });
    }
};
