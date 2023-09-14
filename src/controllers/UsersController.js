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

  async update(request, response) {
    const { id } = request.params; // Supondo que você está passando o ID do usuário como parâmetro na URL
    const { name, email, password } = request.body;

    try {
      const existingUser = await knex("user").where({ id }).first();

      if (!existingUser) {
        return response.status(404).json({ message: "Usuário não encontrado" });
      }

      if (email !== existingUser.email) {
        // O email é diferente, então podemos atualizar
        await knex("user").where({ id }).update({
          name,
          email,
          password,
        });

        response
          .status(200)
          .json({ message: "Usuário atualizado com sucesso" });
      } else {
        response
          .status(400)
          .json({ message: "O email não pode ser igual ao antigo" });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Erro ao atualizar usuário" });
    }
  }
}

module.exports = UsersController;
