# 1 - passo: Tenha o Docker Desktop instalado na sua máquina.

https://docs.docker.com/get-started/get-docker/

Selecione-o baseado em seu sistema operacional e siga as instruções.

# 2 - passo: Clone o repositório em sua máquina.
  Tenha o Git instalado para isto.
  Abra o terminal Git Bash e execute o comando:



    `(Bash)
            Git Clone (nome_do_repositório)
    `



    Agora em seguida faça use o comando 
    `(Bash)
            cd UPLOAD-PDF
    `



    e por fim
    `(Bash)
            Code . UPLOAD-PDF
    `;

# 3 - passo: Altere o nome do arquivo.
      Altere o nome do arquivo (.env.example) para apenas (.env)
       e inclua as informações para as variaveis 

       JWT_SECRET=super_secreta
       POSTGRES_PASSWORD=minha_senha
       POSTGRES_USER=meu_usuario
 
# 4 - passo: Inicie o projeto em sua máquina com o app Docker já aberto.

    Execute o comando no diretório UPLOAD-PDF:

    `(Bash)
            docker-compose up --build
    `;

## A seguir como usar a aplicação.

Se sua aplicação já está rodando acesse Apis Swagger: http://localhost:3000/docs   

Use as rotas primeiro para criar o usuário, em seguida efetue o login e copie o token,
agora use a terceira e ultima rota anexando um Pdf com seu token.

GET http://localhost:3000/criar-usuarios está rota no insomnia cria o usuário.

POST http://localhost:3000/login esta rota no insomnia efetua o login mas para isso tenha no body:

{
  "email": "user1@example.com",
  "senha": "123456"
}


POST http://localhost:3000/api/users/pdf esta rota anexa o pdf e o salva na tabela documentos,

        anexe o Pdf no body e coloque o tipo em multi = form-data 

            e depois em Auth selecione Bearer Token 
            
            e cole o Token exato.