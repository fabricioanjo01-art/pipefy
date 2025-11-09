const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Habilita CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Proxy para o servidor alvo
app.use("/", createProxyMiddleware({
  target: "http://34.198.204.124:9002",
  changeOrigin: true,
  ws: true,
  onProxyReq: (proxyReq, req, res) => {
    // Remove HTTPS redirect dos serviços que esperam HTTP
    proxyReq.setHeader("X-Forwarded-Proto", "http");
  }
}));

const PORT = process.env.PORT || 10000; // usa a porta do Render ou 10000 localmente
app.listen(PORT, () => {
    console.log(`✅ Proxy ativo na porta ${PORT}`);
});
