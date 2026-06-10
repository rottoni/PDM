# Sobre o repositório

Esse repositório contém as aulas e práticas da disciplina de Programação de Dispositivos Móveis


# Sobre o projeto APP Gestão Financeira

Esse é um projeto avaliativo de um aplicação full-stack funcional de gerencimento de contas
Os arquivos desse projeto estão no diretório atividade-2

- Backend: está contido na pasta gestao-financeira-api
- Frontend: está contido na pasta gestao-financeira-app


# Como rodar o APP Gestão Financeira

Segue um tutorial de como rodar a aplicação


## 1. Rodar o backend (API)

Primeiramente, é necessário subir o backend

```bash
cd atividade-2/gestao-financeira-api
npm install
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

A API estará rodando em http://localhost:3000


## 2. Validar backend com o Postman

Essa etapa é apenas avaliativa, não é necessário validar o backend para rodar a aplicação
Contanto, é interessante que verifique que os arquivos estejam funcionando como esperado

1. Importe a coleção do Postman em atividade-2/gestao-financeira-api/postman/api.postman_collection.json
2. Teste a seguintes requesições:

    - 1. GET {{baseUrl}}/
    - Resposta esperada: { "ok": true, "name": "gestao-financeira-api" }


    - 2. GET {{baseUrl}}/categories
    - Deve trazer as 5 categorias inseridas pelo seed.
    - Copie o id da categoria income


    - 3. POST {{baseUrl}}/categoriesBody:
    ```bash
    {
    "name": "health",
    "displayName": "Saúde",
    "icon": "favorite",
    "background": "#FFB6B6",
    "isIncome": false
    }
    ```
    - Resposta esperada: 201 Created com o objeto criado (incluindo o id gerado).


    - 4. PUT {{baseUrl}}/categories/:id (substitua :id pelo retornado em 10.3)Body:
    ```bash 
    { "displayName": "Saúde e Bem-estar" }
    ```

    - 5. DELETE {{baseUrl}}/categories/:id
    - Resposta esperada: 204 No Content.
    - Tente excluir uma categoria padrão (ex.: income) e confirme que vem código 400.


    - 6. POST {{baseUrl}}/transactions
    ```bash
    Body (use o id da categoria income capturado em 10.2):
    {
    "description": "Salário de outubro",
    "value": 3500.50,
    "date": "2026-04-29",
    "categoryId": "COLE_AQUI_O_ID_DA_CATEGORIA"
    }
    ```
    - Resposta esperada: 201 Created já com category aninhada.


    - 7. GET {{baseUrl}}/transactions
    - Deve listar a transação criada com a category expandida.

    - 8. DELETE {{baseUrl}}/transactions/:id
    - Resposta esperada: 204 No Content.

    - 9. POST {{baseUrl}}/transactions com body inválido:
    ```bash
    { "description": "" }
    ```
    - Deve voltar 400 com "error": "Dados inválidos" e a lista de problemas em details — é o Zod barrando a entrada.


Se todas as requesições estiverem respondendo como esperado a aplciação foi instalada corretamente
Link contendo os prints das requesições: https://drive.google.com/drive/folders/1ig6H6_GteSYg9HZAmK7R0yCBBI5-BMpM?usp=sharing 


## 3. Rodar o front-end

Para rodar o front, é necessário continuar com o back-end funcionando
Crie um segundo terminal e insira os seguintes comandos

```bash
cd atividade-2/gestao-financeira-app
npm install
npx expo install
npx expo start
```

O front-end será aberto na porta http://localhost:8081
Assim, com o front-end e o back-end rodando, a aplicação estará operacional