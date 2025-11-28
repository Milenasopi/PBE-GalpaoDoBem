const conexao = require("../conexao");
const bcrypt = require("bcrypt");

const criarUsuario = async (nome, email, telefone) => {
  // os 3 cifroes indicam que vão pegar os tres valores: nome, email, senha
  const query =
    "INSERT INTO usuarios (nome, email, telefone ) VALUES ($1, $2, $3) RETURNING id, nome, email, telefone";
  const valores = [nome, email, telefone];

  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

// recebendo email do controller
// recebe a query do conexao
// const buscarUsuarioPorEmail = async (email) => {
//   const query = "SELECT id, nome, email, senha FROM usuarios WHERE email = $1";
//   const { rows } = await conexao.query(query, [email]);
//   return rows[0];
// };

// aq recebe o id
const buscarUsuarioPorId = async (id) => {
  const query = "SELECT id, nome, email, telefone FROM usuarios WHERE id = $1";
  const { rows } = await conexao.query(query, [id]);
  return rows[0];
};

// a criptografia
const gerarSenhaHash = async (senha) => {
  return bcrypt.hash(senha, 10);
};

const compararSenhas = async (senha, senhaHash) => {
  return bcrypt.compare(senha, senhaHash);
};

// model - usar o id_usuario
// c) seleção de todos os usuários cadastrados
const getTodosUsers = async (id_usuario) => {
  const query = "SELECT * FROM usuarios";
  const { rows } = await conexao.query(query);
  return rows;
};

// getUsuarioPorProduto
const getUsuarioPorProduto = async (id_produto) => {
  const query =
    "SELECT id_produto, nome, email, telefone  FROM usuarios WHERE id_produto = $1";
  const { rows } = await conexao.query(query, [id_produto]);
  return rows[0];
};

// getUsuarioPorProduto
const getUsuarioPorEmail = async (email) => {
  const query = "SELECT * FROM usuarios WHERE email = $1";
  const { rows } = await conexao.query(query, [email]);
  return rows[0];
};

module.exports = {
  criarUsuario,
  buscarUsuarioPorId,
  gerarSenhaHash,
  compararSenhas,
  getTodosUsers,
  getUsuarioPorProduto,
  getUsuarioPorEmail,
};
