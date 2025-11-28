const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

//rotas de usuários
// metodo post = envia info
// get = pegar info
// tem o put para atualizar e delete tbm como método

// form de interesse
router.post('/registrar', usuariosController.registrarUsuario);

// não será usado////////////////////////
// router.post('/login', usuariosController.loginUsuario);

// :id é onde passa o id do usuario que queremos acessar
router.get('/getUsuarioPorId/:id', usuariosController.getUsuarioPorId);

//c) seleção de todos os usuários cadastrados
router.get('/getTodosUsers', usuariosController.getTodosUsers);

// para o questionário ser especifico daquele produto
router.get('/getUsuarioPorProduto/:id_produto', usuariosController.getUsuarioPorProduto);
//obtem os usuários por e-mail
router.get('/getUsuarioPorEmail/:email', usuariosController.getUsuarioPorEmail);

module.exports = router;