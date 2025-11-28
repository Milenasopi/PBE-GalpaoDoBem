const conexao = require("../conexao");

// 1 - Seleção de todos os tipos de pagamentos
const selecionarTodasCategorias = async () => {
  const query = "SELECT * FROM categorias";
  const { rows } = await conexao.query(query);
  return rows;
};

// 2 - Inclusão de tipo de pagamentos
const criarCategoria = async (nome_categoria) => {
  const query =
    "INSERT INTO categorias (nome_categoria) VALUES ($1) RETURNING *";
  const valores = [nome_categoria];
  const { rows } = await conexao.query(query, valores);
  return rows[0];
};

// 3 - Atualizar tipo de pagamentos
const alterarCategoria = async (id_categoria, dados) => {
  const { nome_categoria } = dados;
  const query = `
        UPDATE categorias
        SET nome_categoria = $1
        WHERE id_categoria = $2 RETURNING *
    `;
  const { rows } = await conexao.query(query, [nome_categoria, id_categoria]);
  return rows[0];
};

// 4 - Deleção de tipo de pagamentos
const excluirCategoria = async (id_categoria) => {
  const query = "DELETE FROM categorias WHERE id_categoria = $1 RETURNING *";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};

// 5 - Por id
const getCategoriaPorId = async (id_categoria) => {
  const query =
    "SELECT id_categoria, nome_categoria FROM categorias WHERE id_categoria = $1";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows[0];
};

module.exports = {
  selecionarTodasCategorias,
  criarCategoria,
  alterarCategoria,
  excluirCategoria,
  getCategoriaPorId
};