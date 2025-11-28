const conexao = require('../conexao');

const criarMovimentacao = async (id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento) => {
    // os cifroes retornam os valores de cima
    const query = 'INSERT INTO movimentacoes (id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const valores = [id_usuario, tipo, valor, descricao, data_movimentacao, id_tipo_pagamento];

    // rows retorna o que recebeu
    const  { rows } = await conexao.query(query, valores);
    // o 0 é pq adiciona só 1
    return rows[0];
};

// QUARTO -ADICIONAR AQ O QUE IRA FAZER
// a) selecionar todas as movmentações
const selecionarTodos = async () => {
    const query = 'SELECT * FROM movimentacoes *';
// rows sem 0 zero = adiciona mais, conjunto de resultados
    const { rows } = await conexao.query(query);
    return rows;
}

// b) seleção de todos os registros de movimentações por id de usuário
// reverr
const selecionarMovimentacoesUser = async (id) => {
      const query = 'SELECT * FROM movimentacoes WHERE id_usuario = $1';
    const { rows } = await conexao.query(query, [id]);
    return rows;
}

// // d) alterar uma movimentação
const alterarMovimentacao = async (id, dados) => {
    const {descricao, valor, tipo, id_tipo_pagamento} = dados;
    // como se fosse no banco
    // bloco de string no Javascript = pode usar crase
    const query = `
        UPDATE movimentacoes
        SET descricao = $1, valor = $2, tipo = $3, id_tipo_pagamento = $4
        WHERE id = $5 RETURNING *
    `;
    const { rows } = await conexao.query(query, [descricao, valor, tipo, id_tipo_pagamento, id]);
    return rows[0];
}

// e) deletar movimentacao
const excluirMovimentacao = async (id) => {
    const query = 'DELETE FROM movimentacoes WHERE id = $1';
    await conexao.query(query, [id]);
}

// MODIFICAR, TIRAR TUDO QUE ERA RELACIONADO AO PROJETO ANTIGO
// f) busca movimentações com nomes de usuario e tipo de pagamento
const getMovimentacoesUsuarioTipo = async() => {
    // ta usando alias para as tabelas - m = movimentacao e tp= tipo_pagamento e u = usuarios
    const query = 'SELECT m.id, m.descricao, m.valor, m.tipo, m.data_movimentacao, m.id_usuario, m.id_tipo_pagamento, u.nome, tp.nome_tipo_pagamento FROM movimentacoes m JOIN usuarios u ON m.id_usuario = u.id JOIN tipo_pagamentos tp ON m.id_tipo_pagamento = tp.id_tipo_pagamento';
    const { rows } = await conexao.query(query);
    return rows
}

// EXPORTAR O CONST CRIADO
module.exports = {
    criarMovimentacao,
    alterarMovimentacao,
    selecionarTodos,
    excluirMovimentacao,
    selecionarMovimentacoesUser,
    getMovimentacoesUsuarioTipo,
};