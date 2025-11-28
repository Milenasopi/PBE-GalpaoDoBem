const express = require('express');
const router = express.Router();
const movimentacoesController = require('../controllers/movimentacoesController')

router.post('/adicionar', movimentacoesController.adicionarMovimentacao);

// SEGUNDO - criar router post vendo o metodo que será usado e nome
// a) selecionar todas as movimentações
router.get('/selecionarTodos', movimentacoesController.selecionarTodos);

// b) seleção de todos os registros de movimentações por id de usuário
router.get('/selecionarMovimentacoesUser/:id', movimentacoesController.selecionarMovimentacoesUser);

// d) Com o RAPHA | alteração de movimentação -- update com métod put, justamente p/ alterar
// tem q passar o id como parametro pro programa entender qual alterar
router.put('/alterarMovimentacao/:id', movimentacoesController.alterarMovimentacao);

// e) Deletar movimentação, metodo delete com o parametro id para saber qual deletar sem deletar tudo
router.delete('/excluirMovimentacao/:id', movimentacoesController.excluirMovimentacao);

// f) select p/ geração de relatório ou dashboard (Rota de relatório)
router.get('/getMovimentacoesUsuarioTipo', movimentacoesController.getMovimentacoesUsuarioTipo);


module.exports = router;