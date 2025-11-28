const movimentacaoModel = require('../models/movimentacoesModel');

const adicionarMovimentacao = async (req, res) => {
    const { id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento } = req.body;

    try{
        const movimentacao = await
        movimentacaoModel.criarMovimentacao(id_usuario, tipo, valor,
            descricao, data_movimentacao, id_tipo_pagamento);
            // deu tudo certo
            res.status(201).json(movimentacao)
    }catch (error) {
        res.status(500).json({
            erro: 'Erro ao adicionar movimentação',
            detalhe: error.message
        })
    }
};

// TERCEIRO 
// a) Selecionar todas as movimentações
const selecionarTodos = async (req, res) =>{
    try{
        const movimentacoes = await movimentacaoModel.selecionarTodos();
        res.json(movimentacoes)
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar movimentações', detalhe: error.message})
    }
}

// b) seleção de todos os registros de movimentações por id de usuário
// REVER
const selecionarMovimentacoesUser = async (req, res) => {
    const { id } = req.params;
    try{
        const movimentacoes = await movimentacaoModel.selecionarMovimentacoesUser(id);
        res.json(movimentacoes)
    }catch ( error ){
        res.status(500).json({ erro: 'Erro ao buscar movimentações', 
            detalhe: error.message
        });
    }
};

// d) Alterar movimentações
const alterarMovimentacao = async (req, res) => {
    // se for receber id coloca isso
    const { id } = req.params;
    // ver o que precisa no banco
    const { descricao, valor, tipo, id_tipo_pagamento } = req.body;

    try{
        const movimentacaoAtualizada = await movimentacaoModel.alterarMovimentacao(id, { descricao, valor, tipo, id_tipo_pagamento });
        res.json(movimentacaoAtualizada)
    }catch (error){
        // se der erro, executa isso
        res.status(500).json({ erro: 'Erro ao atualizar movimentação', detalhe: error.message});
    }
}

// e) 
const excluirMovimentacao = async(req, res) => {
    const {id} = req.params;

    try{
        const movimentacao = await movimentacaoModel.excluirMovimentacao(id)
        res.json({ mensagem: 'Movimentação excluida com sucesso'});
    }catch(error){
        res.status(500).json({ erro: 'Erro ao excluir movimentação', detalhe: error.message})
    }
}

// f) selecionar valores para o relatorio ou dashboard
const getMovimentacoesUsuarioTipo = async(req, res) => {
    try{
        const movimentacao = await movimentacaoModel.getMovimentacoesUsuarioTipo();
        res.json(movimentacao);
    }catch(error){
        res.status(500).json({erro: 'Erro ao buscar movimentação', detalhe: error.message});
    }
}

// ADICIONAR A FUNÇÃO CRIADA AQ
module.exports = {
    adicionarMovimentacao,
    selecionarTodos,
    excluirMovimentacao,
    selecionarMovimentacoesUser,
    getMovimentacoesUsuarioTipo,
    alterarMovimentacao,
}