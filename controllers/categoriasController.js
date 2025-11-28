const CategoriaModel = require("../models/categoriasModel");

// 1 - Seleção de todos os tipos de pagamentos
const getCategoria = async (req, res) => {
  try {
    const Categoria = await CategoriaModel.selecionarTodasCategorias();
    res.json(Categoria);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar categoria", detalhe: error.message });
  }
};

// 2 - Inclusão de tipo de pagamentos
const adicionarCategoria = async (req, res) => {
  const { nome_categoria } = req.body;

  try {
    const Categoria = await CategoriaModel.criarCategoria(
      nome_categoria
    );
    res.status(201).json(Categoria);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao adicionar categoria",
      detalhe: error.message,
    });
  }
};

//3 - Atualizar
const atualizaCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  const { nome_categoria } = req.body;

  try {
    const CategoriaAtualizado = await CategoriaModel.alterarCategoria(
      id_categoria,
      {
        nome_categoria,
      }
    );
    res.json(CategoriaAtualizado);
  } catch (error) {
    // se der erro, executa isso
    res.status(500).json({
      erro: "Erro ao alterar categoria",
      detalhe: error.message,
    });
  }
};

// 4 - Deleção
const excluirCategoria = async (req, res) => {
  const { id_categoria } = req.params;

  try {
    const categoria = await CategoriaModel.excluirCategoria(id_categoria);

    if (categoria.length === 0) {
      return res
        .status(404)
        .json({ erro: `Categoria ${id_categoria} não existe.` });
    }

    res
      .status(201)
      .json({ Mensagem: `Categoria ${id_categoria} deletada com sucesso!` });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar categoria",
      detalhe: error.message,
    });
  }
};

// 5 - categoria por id
const getCategoriaPorId = async (req, res) => {
  const { id_categoria } = req.params;
  try {
    const categoria = await CategoriaModel.getCategoriaPorId(id_categoria);
    if (!categoria) {
      return res
        .status(404)
        .json({ erro: "Categoria não encontrado", detalhe: error.message });
    }
    res.json(categoria);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar categoria", detalhe: error.message });
  }
};

module.exports = {
  getCategoria,
  adicionarCategoria,
  atualizaCategoria,
  excluirCategoria,
  getCategoriaPorId
};