import path from 'path';

export default (request, response, next) => {
  const arquivo = request.file; // multer coloca o arquivo aqui

  if (!arquivo) {
    return response.status(CONSTANTS.HTTP.BAD_REQUEST)
      .json({ error: 'Arquivo não enviado' });
  }

  const tiposPermitidos = ['.pdf'];
  const tamanhoMaximoBytes = 10 * 1024 * 1024; // 10 MB

  const extensao = path.extname(arquivo.originalname).toLowerCase();

  if (!tiposPermitidos.includes(extensao)) {
    return response.status(CONSTANTS.HTTP.BAD_REQUEST)
      .json({ error: `Tipo de arquivo inválido: ${extensao}` });
  }

  if (arquivo.size > tamanhoMaximoBytes) {
    return response.status(CONSTANTS.HTTP.BAD_REQUEST)
      .json({ error: 'Tamanho máximo permitido é 10MB' });
  }

  return next();
};
