const User = require("../models/user");
const postagem = require("../models/postagem");

const bcrypt = require("bcryptjs");

module.exports = class authController {
  static async login(request, response) {
    return response.render("auth/login");
  }

  static async loginPost(request, response) {
    const { nome, senha } = request.body;

    const user = await User.findOne({ where: { nome: nome } });
    if (!user) {
      request.flash("message", "O usuário não foi encontrado");
      response.redirect("/login");
    }

    const passwordCheck = bcrypt.compareSync(senha, user.senha);

    if (!passwordCheck) {
      request.flash("message", "Senha errada");
      response.render("auth/login");
      return;
    }

    request.session.userId = user.id;

    request.flash("message", "Você está logado");

    request.session.save(() => {
      response.redirect("/");
    });
  }

  static async cadastro(request, response) {
    return response.render("auth/cadastro");
  }

  static async cadastroPost(request, response) {
    const { nome, email, senha, confirmsenha } = request.body;

    if (senha != confirmsenha) {
      request.flash("message", "As senhas não estão iguais");
      response.render("auth/cadastro");
      return;
    }
    const checkUserExist = await User.findOne({ where: { email: email } });
    if (checkUserExist) {
      request.flash("message", "O e-mail já está sendo usado");
      response.render("auth/cadastro");
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const criptoSenha = bcrypt.hashSync(senha, salt);

    const user = {
      nome,
      email,
      senha: criptoSenha,
    };

    try {
      const usercreate = await User.create(user);

      request.session.userId = usercreate.id;

      request.flash("message", "Cadastro realizado!");

      request.session.save(() => {
        response.redirect("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(request, response) {
    request.session.destroy();
    response.redirect("/login");
  }
};
