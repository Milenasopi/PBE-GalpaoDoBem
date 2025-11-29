const ProdutosModel = require("../models/produtosModel");
const { put, del } = require("@vercel/blob");

// 1 - Seleção de todos
const getProdutos = async (req, res) => {
  try {
    const Produtos = await ProdutosModel.selecionarTodosProdutos();
    res.json(Produtos);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar produtos", detalhe: error.message });
  }
};

// 2 - Inclusão
const adicionarProduto = async (req, res) => {
  const {
    nome_produto,
    preco_produto,
    descricao_produto,
    imagem_produto,
    id_categoria,
  } = req.body;

  try {      
    
    const Produto = await ProdutosModel.criarProduto(
      nome_produto,
      preco_produto,
      descricao_produto,
      imagem_produto,
      id_categoria
    );
    res.status(201).json(Produto);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao adicionar produto",
      detalhe: error.message,
    });
  }
};

// // upload de imagem para o vercel Blob
// const uploadBase64ToStorage = async (dataUrl) => {
//   console.log(dataUrl);
//   if (!dataUrl || !dataUrl.startsWith("data:")) {
//     console.log("entrou no erro");
//     throw new Error("Formato de Base64 inválido.");
//   }

//   const parts = dataUrl.split(";base64,");

//   if (parts.length !== 2) {
//     throw new Error("Base64 malformado.");
//   }
//   const mimeType = parts[0].split(":")[1];
//   const base64Data = parts[1];

//   const fileBuffer = Buffer.from(base64Data, "base64");

//   // Nomes de variáveis
//   const extensaoMapeada = {
//     "image/png": "png",
//     "image/jpeg": "jpg",
//     "application/pdf": "pdf",
//     "image/svg+xml": "svg",
//   };
//   const extensao = extensaoMapeada[mimeType] || "bin";

//   // Gera nome de arquivo único (chave única no Vercel Blob)
//   const NomeArquivo = `${Date.now()}-${Math.random()
//     .toString(36)
//     .substring(2, 9)}.${extensao}`;

//   // Salva no Vercel Blob
//   const resultado = await put(NomeArquivo, fileBuffer, {
//     access: "public", // Permite acesso público via URL
//     contentType: mimeType, // Define o tipo de conteúdo
//   });

//   // Retorna a URL pública gerada pelo Vercel Blob
//   return resultado.url;
// };

//3 - Atualizar produto (1)
const atualizaProduto = async (req, res) => {
  const { id_produto } = req.params;
  const { nome_produto } = req.body;
  const { preco_produto } = req.body;
  const { descricao_produto } = req.body;
  const { imagem_produto } = req.body;
  const { id_categoria } = req.body;

  try {
    const ProdutoAtualizado = await ProdutosModel.alterarProduto(id_produto, {
      nome_produto,
      preco_produto,
      descricao_produto,
      imagem_produto,
      id_categoria,
    });
    res.json(ProdutoAtualizado);
  } catch (error) {
    // se der erro, executa isso
    res.status(500).json({
      erro: "Erro ao alterar produto",
      detalhe: error.message,
    });
  }
};

//Atualizar Produto (2)
// const atualizaProduto = async (req, res) => {
//     const { id_produto } = req.params;
    
//     // Desestrutura os dados, incluindo a imagem
//     const { 
//         nome_produto, 
//         preco_produto, 
//         descricao_produto, 
//         imagem_produto, // Pode ser Base64 novo ou a URL antiga
//         id_categoria 
//     } = req.body;

//     let ImageUrl = imagem_produto; // Assume que é a URL antiga por padrão
    
//     try {
//         // 1. Lógica de Upload da Imagem:
//         // Verifica se a string da imagem é um Base64 (indicando que foi alterada no front)
//         if (imagem_produto && imagem_produto.startsWith('data:')) {
//             console.log("Nova imagem em Base64 detectada. Fazendo upload para Vercel Blob...");
//             ImageUrl = await uploadBase64ToStorage(imagem_produto);
//             console.log("Upload para Vercel Blob concluído. URL:", ImageUrl);
//         }

//         // 2. Chama o Model com a URL (nova ou antiga)
//         const ProdutoAtualizado = await ProdutosModel.alterarProduto(id_produto, {
//             nome_produto,
//             preco_produto,
//             descricao_produto,
//             imagem_produto: ImageUrl, // Passa a URL (e não o Base64) para o banco
//             id_categoria,
//         });
        
//         // 3. Resposta de sucesso
//         res.json(ProdutoAtualizado);
        
//     } catch (error) {
//         // 4. Tratamento de Erro (Garante que o JSON é retornado, evitando o erro <!DOCTYPE)
//         console.error("ERRO CRÍTICO ao alterar produto:", error.message);
//         res.status(500).json({
//             erro: "Erro ao alterar produto",
//             detalhe: error.message,
//         });
//     }
// };

// 4 - Deleção
const excluirProduto = async (req, res) => {
  const { id_produto } = req.params;

  try {
    const produto = await ProdutosModel.excluirProduto(id_produto);

    if (produto.length === 0) {
      return res
        .status(404)
        .json({ erro: `Produto ${id_produto} não existe.` });
    }

    res
      .status(201)
      .json({ Mensagem: `Produto ${id_produto} deletado com sucesso!` });
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao deletar produto",
      detalhe: error.message,
    });
  }
};

// 5 - Por id
const getProdutoPorId = async (req, res) => {
  const { id_produto } = req.params;
  try {
    const produto = await ProdutosModel.buscarProdutoPorId(id_produto); // Sua função no Model
    if (!produto) {
      return res.status(404).json({ Mensagem: "Produto não encontrado." });
    }
    res.json(produto);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar produto", detalhe: error.message });
  }
};
// EU MUDEI O DE CIMA

// 6 - Seleção de produtos recentes

const getProdutosRecentes = async (req, res) => {
  try {
    // Chamada para a função que seleciona os produtos recentes do modelo
    const produtos = await ProdutosModel.getProdutosRecentes();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar produtos recentes",
      detalhe: error.message,
    });
  }
};

// 7 - Buscar Produto
const buscarProduto = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: "Termo de busca não fornecido." });
    }
    const produtosEncontrados = await ProdutosModel.buscarProduto(q);
    console.log("fim");
    res.json(produtosEncontrados);
  } catch (error) {
    console.error("Erro na busca de produtos:", error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
};

// 8 - produtos por categoria
const getProdutoPorCategoria = async (req, res) => {
  const { id_categoria } = req.params;
  try {
    const produto = await ProdutosModel.getProdutoPorCategoria(id_categoria);
    if (!produto) {
      return res
        .status(404)
        .json({ erro: "Produto não encontrado", detalhe: error.message });
    }
    res.json(produto);
  } catch (error) {
    res
      .status(500)
      .json({ erro: "Erro ao buscar produto", detalhe: error.message });
  }
};

module.exports = {
  getProdutos,
  adicionarProduto,
  atualizaProduto,
  excluirProduto,
  getProdutoPorId,
  getProdutosRecentes,
  buscarProduto,
  getProdutoPorCategoria,
  uploadBase64ToStorage,
};
