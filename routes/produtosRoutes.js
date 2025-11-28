const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

// 1 - Seleção de todos 
router.get("/getProdutos", produtosController.getProdutos);

// 2 - Inclusão 
router.post("/adicionarProduto", produtosController.adicionarProduto);

// 3 - Atualizar 
router.put(
  "/atualizaProduto/:id_produto",
  produtosController.atualizaProduto
);

// 4 - Deleção 
router.delete("/excluirProduto/:id_produto", produtosController.excluirProduto);

// 5 - Por Id (mudeiii)
router.get("/getProdutoPorId/:id_produto", produtosController.getProdutoPorId);
// 6 - Produtos recentes
router.get('/getProdutosRecentes', produtosController.getProdutosRecentes);

// 7 - barra de pesquisa
router.get('/buscar', produtosController.buscarProduto);

//  8 - Produtos por categoria
router.get('/getProdutoPorCategoria/:id_categoria', produtosController.getProdutoPorCategoria);


module.exports = router;