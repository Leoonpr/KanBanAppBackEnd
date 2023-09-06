const knex = require("../database/knex");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    try {
      // Insira os dados do usuário na tabela 'user' usando o Knex
      const newUser = await knex("user").insert({
        name,
        email,
        password,
      });

      // Responda com os dados do novo usuário
      response
        .status(201)
        .json({ message: "Usuário criado com sucesso", user: newUser });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao criar usuário" });
    }
  }
  
}

module.exports = UsersController;
