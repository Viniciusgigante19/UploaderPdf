
import bcrypt from 'bcrypt';
import UserModel from '../../Models/UserModel.js';

export default async (request, response) => {
    const defaultPassword = "123456";

    // Mock data para os usuários
    const users = [
        { nome: 'User1', email: 'user1@example.com', id_role: 2 },
        { nome: 'User2', email: 'user2@example.com', id_role: 1 },
    ];


    try {

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(defaultPassword, 10);
            user.senha = hashedPassword;

            console.log(`Criando usuário: ${user.nome} com email: ${user.email}`);

            await UserModel.create(user);
        }

        return response.status(CONSTANTS.HTTP.SUCCESS_CREATED).json({ message: 'Usuários e papéis criados com sucesso!' });
    } catch (error) {
        return response.status(CONSTANTS.HTTP.SERVER_ERROR).json({ error: 'Erro ao criar usuários ou papéis: ' + error.message });
    }
}