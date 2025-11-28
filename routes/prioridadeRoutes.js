const express = require("express");
const router = express.Router();
const prioridadeController = require("../controllers/prioridadeController");

// router.post("/registrar/:id_produto", prioridadeController.registrarInteresse);

router.get(
  "/produto/:id_produto",
  prioridadeController.listarInteressadosPorProduto
);

router.get("/listarInteressadosPorProduto", prioridadeController.listarInteressadosPorProduto);

router.get("/getPrioridadePorID/:id_produto", prioridadeController.getPrioridadePorID);

router.post("/adicionarInteresse", prioridadeController.adicionarInteresse);

router.delete("/deletarInteresse/:codigo", prioridadeController.deletarInteresse);

//listarInteressadosPorProduto

//router.get(
// "/produto/:id_produto", prioridadeController.listarInteressadosPorProduto
// );

module.exports = router;
