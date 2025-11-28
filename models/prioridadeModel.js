const conexao = require("../conexao"); 

// const registrarInteresse = async (id_produto, id) => {
//     try {
//         const resultPosicao = await conexao.query(
//             `SELECT COALESCE(MAX(posicao), 0) + 1 AS proxima_posicao FROM prioridade WHERE id_produto = $1`,
//             [id_produto]
//         );
//         const proximaPosicao = resultPosicao.rows[0].proxima_posicao;
        
//         const check = await conexao.query(
//             `SELECT * FROM prioridade WHERE id_produto = $1 AND id = $2`,
//             [id_produto, id]
//         );
        
//         if (check.rows.length > 0) {
//             return { error: true, message: "Usuário já manifestou interesse neste produto." };
//         }

//         const query = `
//             INSERT INTO prioridade (posicao, id_produto, id)
//             VALUES ($1, $2, $3)
//             RETURNING *;
//         `;
//         const result = await conexao.query(query, [proximaPosicao, id_produto, id]);
//         return result.rows[0];

//     } catch (error) {
//         console.error("Erro no Model ao registrar interesse:", error);
//         throw error;
//     }
// };

const listarInteressadosPorProduto = async (id_produto) => {
    try {
        const query = `
            SELECT 
                p.posicao, 
                p.data , 
                p.horario , 
                u.nome,
                u.email,
                u.telefone
            FROM prioridade p
            JOIN usuarios u ON p.id = u.id
            WHERE p.id_produto = $1
            ORDER BY p.posicao ASC, p.horario ASC; 
        `;
        const result = await conexao.query(query, [id_produto]);
        return result.rows;

    } catch (error) {
        console.error("Erro no Model ao listar interessados:", error);
        throw error;
    }
};

const getPrioridadePorID = async (id) => {
 try {
        const query = `
        SELECT 
            prioridade.codigo,
            prioridade.posicao, 
            prioridade.data, 
            prioridade.horario, 
            usuarios.nome ,
            usuarios.email,
            usuarios.telefone
        FROM prioridade 
        JOIN usuarios ON usuarios.id = prioridade.id 
        WHERE prioridade.id_produto = $1;
        `;
        const result = await conexao.query(query, [id]);
        return result.rows;

    } catch (error) {
        console.error("Erro no Model ao listar prioridade:", error);
        throw error;
    }
};

const adicionarInteresse = async (id_produto, id) => {
    try {
        const resultPosicao = await conexao.query(
            `SELECT COALESCE(MAX(posicao), 0) + 1 AS proxima_posicao FROM prioridade WHERE id_produto = $1`,
            [id_produto]
        );
        const proximaPosicao = resultPosicao.rows[0].proxima_posicao;
        
        const check = await conexao.query(
            `SELECT * FROM prioridade WHERE id_produto = $1 AND id = $2`,
            [id_produto, id]
        );
        
        if (check.rows.length > 0) {
            return { error: true, message: "Usuário já manifestou interesse neste produto." };
        }

        const query = `
            INSERT INTO prioridade (posicao, id_produto, id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const result = await conexao.query(query, [proximaPosicao, id_produto, id]);
        return result.rows[0];

    } catch (error) {
        console.error("Erro no Model ao registrar interesse:", error);
        throw error;
    }
};


const deletarInteresse = async (codigo) => {
  const query = "DELETE FROM prioridade WHERE codigo = $1 RETURNING *";
  const { rows } = await conexao.query(query, [codigo]);
  return rows;
};


module.exports = {
    // registrarInteresse,
    listarInteressadosPorProduto,
    getPrioridadePorID, 
    adicionarInteresse,
    deletarInteresse,
};