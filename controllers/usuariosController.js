const usuarioModel = require("../models/usuariosModel");

const registrarUsuario = async (req, res) => {
  const { nome, email, telefone,  } = req.body;

  try {
    const usuario = await usuarioModel.criarUsuario(
      nome,
      email,
      telefone,
    );
    
    res.status(201).json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao registrar usuário", detalhe: error.message });
  }
};

// const loginUsuario = async (req, res) => {
//   const { email, senha } = req.body;
//   try {
//     const usuario = await usuarioModel.buscarUsuarioPorEmail(email);
//     // ! na frente é negação
//     if (!usuario) {
//       return res.status(401).json({ erro: "Usuário não encontrado" });
//     }
//     // aqui é se encontrou o email, ai vai comparar as senhas
//     const senhaValida = await usuarioModel.compararSenhas(senha, usuario.senha);
//     if (!senhaValida) {
//       return res.status(401).json({ erro: "Senha inválida" });
//     }

//     res.json({
//       mensagem: "Login realizado com sucesso",
//       usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email },
//     });

//     // const token = usuarioModel.gerarTokenJWT(usuario.id);
//     // res.json({ token, usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }});
//   } catch (error) {
//     res.status(500).json({ erro: "Erro no login", detalhe: error.message });
//   }
// };

const getUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioModel.buscarUsuarioPorId(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ erro: "Usuário não encontrado", detalhe: error.message });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
  }
};

// c) seleção de todos os usuários cadastrados
const getTodosUsers = async (req, res) => {
  try {
    const usuarios = await usuarioModel.getTodosUsers();
    res.json(usuarios);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuários", detalhe: error.message });
  }
};

// getUsuarioPorProduto
const getUsuarioPorProduto = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await usuarioModel.getUsuarioPorProduto(id);
    if (!usuario) {
      return res
        .status(404)
        .json({ erro: "Usuário não encontrado", detalhe: error.message });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
  }
};

const getUsuarioPorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const usuario = await usuarioModel.getUsuarioPorEmail(email);
    if (!usuario) {
      return res
        .status(404)
        .json({ erro: "Usuário não encontrado", detalhe: error.message });
    }
    res.json(usuario);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar usuário", detalhe: error.message });
  }
};

// funções que vão ser usadas em outros lugares
module.exports = {
  registrarUsuario,
  getUsuarioPorId,
  getTodosUsers,
  getUsuarioPorProduto,
  getUsuarioPorEmail
};
