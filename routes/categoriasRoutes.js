const express = require("express");
const router = express.Router();
const categoriasController = require("../controllers/categoriasController");

// 1 - Seleção de todos os tipos de pagamentos
router.get("/getCategorias", categoriasController.getCategoria);

// 2 - Inclusão de tipo de pagamentos
router.post("/adicionarCategoria", categoriasController.adicionarCategoria);

// 3 - Atualizar tipo de pagamentos
router.put(
  "/atualizaCategoria/:id_categoria",
  categoriasController.atualizaCategoria
);

// 4 - Deleção de tipo de pagamentos
router.delete(
  "/excluirCategoria/:id_categoria",
  categoriasController.excluirCategoria
);

// 5 - Por Id
router.get('/getCategoriaPorId/:id_categoria', categoriasController.getCategoriaPorId);

module.exports = router;
