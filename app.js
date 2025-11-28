// importaçoes
require("dotenv").config();
const express = require("express");

const bodyParser = require("body-parser");
const { put, del } = require("@vercel/blob"); // NOVO: SDK do Vercel Blob

// /// vercel///
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { put, del } = require('@vercel/blob'); // NOVO: SDK do Vercel Blob
// require('dotenv').config();
// const db = require('./conexao');

// // const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(cors());

// // Configura o body-parser para JSON e permite payloads grandes
// app.use(bodyParser.json({ limit: '50mb' }));
/// ///

// comunicar com o front
const cors = require("cors");
const conexao = require("./conexao");
// indicando onde estao as rotas
const usuariosRoutes = require("./routes/usuariosRoutes");
const movimentacoesRoutes = require("./routes/movimentacoesRoutes");
//milena
const categoriasRoutes = require("./routes/categoriasRoutes");
///
const produtosRoutes = require("./routes/produtosRoutes");

const app = express();

// Middlewares
app.use(cors()); //Habilita CORS - para front eu acho
app.use(express.json()); //Permite receber JSON no body das requisições
// Configura o body-parser para JSON e permite payloads grandes
app.use(bodyParser.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));

//rotas (PRIMEIRO)
app.use("/usuarios", usuariosRoutes);
app.use("/movimentacoes", movimentacoesRoutes);
// milena
app.use("/categorias", categoriasRoutes);
///

app.use("/produtos", produtosRoutes);

// as rotasssssssssss
//Rota para teste de conexão
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// PRIORIDADE ///////////////////////

const prioridadeRoutes = require("./routes/prioridadeRoutes"); //

// app.use(express.json());

app.use("/produtos", produtosRoutes);
app.use("/prioridade", prioridadeRoutes);

// ////////////////////

/// vercel ///
// --- FUNÇÃO AUXILIAR DE UPLOAD DE BASE64 PARA VERCEL BLOB ---
// const uploadBase64ToStorage = async (dataUrl) => {
//     if (!dataUrl || !dataUrl.startsWith('data:')) {
//         throw new Error("Formato de Base64 inválido.");
//     }

//     const parts = dataUrl.split(';base64,');
//     if (parts.length !== 2) {
//         throw new Error("Base64 malformado.");
//     }
//     const mimeType = parts[0].split(':')[1];
//     const base64Data = parts[1];
//     const fileBuffer = Buffer.from(base64Data, 'base64');

//     // Nomes de variáveis
//     const extensaoMapeada = {
//         'image/png': 'png',
//         'image/jpeg': 'jpg',
//         'image/svg+xml': 'svg',
//         'image/webp': 'webp',
//     };
//     const extensao = extensaoMapeada[mimeType] || 'bin';

//     // Gera nome de arquivo único (chave única no Vercel Blob)
//     const NomeArquivo = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${extensao}`;

//     // Salva no Vercel Blob
//     const resultado = await put(NomeArquivo, fileBuffer, {
//         access: 'public', // Permite acesso público via URL
//         contentType: mimeType // Define o tipo de conteúdo
//     });

//     // Retorna a URL pública gerada pelo Vercel Blob
//     return resultado.url;
// };
/ /; //

//Inicia o servidor
// const port = 3000;
// app.listen(port, () => {
//   console.log(`Servidor executado em http://localhost:${port}`);
// });
