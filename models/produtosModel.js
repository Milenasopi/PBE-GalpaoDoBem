const conexao = require("../conexao");

// 1 - Seleção
const selecionarTodosProdutos = async () => {
  const query = "SELECT * FROM produtos";
  const { rows } = await conexao.query(query);
  return rows;
};

// 2 - Inclusão
const criarProduto = async (
  nome_produto,
  preco_produto,
  descricao_produto,
  ImageUrl,
  id_categoria
) => {
  const query =
    "INSERT INTO produtos (nome_produto, preco_produto, descricao_produto, imagem_produto, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const valores = [
    nome_produto,
    preco_produto,
    descricao_produto,
    ImageUrl,
    id_categoria
  ];
  const { rows } = await conexao.query(query, valores);
  console.log("gravou");
  return rows[0];
};

// 3 - Atualizar
const alterarProduto = async (id_produto, dados) => {
  const { nome_produto, preco_produto, descricao_produto, imagem_produto, id_categoria } =
    dados;
  const query = `
          UPDATE produtos
        SET
            nome_produto = $2,
            preco_produto = $3,
            descricao_produto = $4,
            imagem_produto = $5,
            id_categoria = $6
        WHERE id_produto = $1
        RETURNING *
    `;
  const { rows } = await conexao.query(query, [
    id_produto,
    nome_produto,
    preco_produto,
    descricao_produto,
    imagem_produto,
    id_categoria
  ]);
  return rows[0];
};

// 4 - Deleção
const excluirProduto = async (id_produto) => {
  const query = "DELETE FROM produtos WHERE id_produto = $1 RETURNING *";
  const { rows } = await conexao.query(query, [id_produto]);
  return rows;
};

// 5 - Por id
const buscarProdutoPorId = async (id_produto) => {
  const query =
    "SELECT * FROM produtos WHERE id_produto = $1";
  const { rows } = await conexao.query(query, [id_produto]);
  return rows[0];
};

// 6 - Produtos recentes

const getProdutosRecentes = async () => {
  const query = "SELECT * FROM produtos ORDER BY id_produto DESC LIMIT 5"; //mudar para uns 5

  const { rows } = await conexao.query(query);
  return rows;
};

// 7 - Essa função já está correta para a busca completa.
const buscarProduto = async (termoDeBusca) => {
  const querySQL = `
        SELECT id_produto, nome_produto, preco_produto, descricao_produto
        FROM produtos
        WHERE nome_produto ILIKE $1
    `;
  const searchTerm = `%${termoDeBusca}%`;
  console.log(querySQL);
  console.log(searchTerm);
  const { rows } = await conexao.query(querySQL, [searchTerm]);
  return rows;
};

// 8 - Produtos por categoria
const getProdutoPorCategoria = async (id_categoria) => {
  const query =
    "SELECT id_produto, nome_produto, preco_produto, descricao_produto, imagem_produto FROM produtos WHERE id_categoria = $1";
  const { rows } = await conexao.query(query, [id_categoria]);
  return rows;
};


module.exports = {
  selecionarTodosProdutos,
  criarProduto,
  alterarProduto,
  excluirProduto,
  buscarProdutoPorId,
  getProdutosRecentes,
  buscarProduto,
  getProdutoPorCategoria
};