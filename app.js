// importaçoes
require("dotenv").config();
const express = require("express");
// const bodyParser = require("body-parser"); // Não precisa se usar express.json() com limit

const { put, del } = require("@vercel/blob"); // SDK do Vercel Blob
const cors = require("cors");
const conexao = require("./conexao");

// indicando onde estao as rotas
const usuariosRoutes = require("./routes/usuariosRoutes");
const movimentacoesRoutes = require("./routes/movimentacoesRoutes");
const categoriasRoutes = require("./routes/categoriasRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const prioridadeRoutes = require("./routes/prioridadeRoutes"); // Novo

const app = express();

// ----------------------------------------------------
// 1. CONFIGURAÇÃO DOS MIDDLEWARES (CORPO DA REQUISIÇÃO E SEGURANÇA)
// ----------------------------------------------------

// CORS: Configuração de origem para permitir o acesso do Front-end Vercel
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://galpaodobem.vercel.app', // Seu Front-end Vercel
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); 
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions)); // Aplica a política CORS
app.use(express.json({ limit: "50mb" })); // Permite JSON no corpo e define limite alto para uploads (Base64)

// ----------------------------------------------------
// 2. DEFINIÇÃO DAS ROTAS
// ----------------------------------------------------

// Rotas Base
app.use("/usuarios", usuariosRoutes);
app.use("/movimentacoes", movimentacoesRoutes);
app.use("/categorias", categoriasRoutes);
app.use("/produtos", produtosRoutes);
app.use("/prioridade", prioridadeRoutes);

// Rota para teste de conexão (root)
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// ----------------------------------------------------
// 3. EXPORTAÇÃO PARA A VERCEL (OBRIGATÓRIO)
// ----------------------------------------------------

module.exports = app;
// O código da função uploadBase64ToStorage deve estar em um lugar onde suas rotas (ex: produtosRoutes) possam usá-la, 
// ou ser incluída em uma exportação separada, se necessário.