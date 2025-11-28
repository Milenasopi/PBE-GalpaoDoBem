const PrioridadeModel = require("../models/prioridadeModel");

// const registrarInteresse = async (req, res) => {
//     const { id_produto } = req.params; 
//     const { id } = req.body; 

//     if (!id_produto || !id) {
//         return res.status(400).json({ erro: "IDs do produto e do usuário são obrigatórios." });
//     }

//     try {
//         const interesse = await PrioridadeModel.registrarInteresse(id_produto, id);
        
//         if (interesse.error) {
//              return res.status(409).json({ erro: interesse.message }); 
//         }

//         res.status(201).json({ 
//             mensagem: "Interesse registrado com sucesso na fila.",
//             data: interesse
//         });

//     } catch (error) {
//         console.error("Erro ao registrar interesse:", error.message);
//         res.status(500).json({ 
//             erro: "Erro interno do servidor ao registrar interesse.", 
//             detalhe: error.message 
//         });
//     }
// };

const listarInteressadosPorProduto = async (req, res) => {
    const { id_produto } = req.params;

    try {
        const interessados = await PrioridadeModel.listarInteressadosPorProduto(id_produto);
        
        if (interessados.length === 0) {
            return res.status(200).json([]);
        }
        
        res.json(interessados);

    } catch (error) {
        console.error("Erro ao listar interessados:", error.message);
        res.status(500).json({ 
            erro: "Erro ao buscar a lista de interessados.", 
            detalhe: error.message 
        });
    }
};


// const getInteresses = async (req, res) => {
//   try {
//     const Interesses = await PrioridadeModel.getInteresses();
//     res.json(Interesses);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ erro: "Erro ao buscar interesses", detalhe: error.message });
// }
// }

const getPrioridadePorID = async (req, res) => {
    const { id_produto } = req.params;

    try {
        const prioridade = await PrioridadeModel.getPrioridadePorID(id_produto);
        
        if (prioridade.length === 0) {
            return res.status(200).json([]);
        }
        
        res.json(prioridade);

    } catch (error) {
        console.error("Erro ao listar prioridades:", error.message);
        res.status(500).json({ 
            erro: "Erro ao buscar a lista de prioridade.", 
            detalhe: error.message 
        });
    }
};

const adicionarInteresse = async (req, res) => {
    const { id_produto, id } = req.body; 

  
    if (!id_produto || !id ) {
        return res.status(400).json({ erro: "IDs do produto e do usuário são obrigatórios." });
    }

    try {
        const interesse = await PrioridadeModel.adicionarInteresse(id_produto, id);
        
        if (interesse.error) {
            return res.status(409).json({ erro: interesse.message }); 
        }

        res.status(201).json({ 
            mensagem: "Interesse adicionado com sucesso na fila.",
            data: interesse
        });

    } catch (error) {
        console.error("Erro ao adicionar interesse:", error.message);
        res.status(500).json({ 
            erro: "Erro interno do servidor ao adicionar interesse.", 
            detalhe: error.message 
        });
    }
};

const deletarInteresse = async (req, res) => {
  const { codigo } = req.params;

  try {
    // CORREÇÃO: Mudar de deletarProduto para deletarInteresse
    const interesse = await PrioridadeModel.deletarInteresse(codigo); 

    if (interesse.length === 0) {
      return res
        .status(404)
        .json({ erro: `Interesse não existe.` });
    }

    res
      .status(201)
      .json({ Mensagem: `Interesse deletado com sucesso!` });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar interesse",
      detalhe: error.message,
    });
  }
};

module.exports = {
  
    listarInteressadosPorProduto,
    getPrioridadePorID,
    adicionarInteresse,
    deletarInteresse
};