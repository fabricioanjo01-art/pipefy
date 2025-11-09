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

const port = process.env.PORT || 10000;
app.listen(port, () => console.log(`✅ Proxy ativo na porta ${port}`));

app.listen(10000, () => {
  console.log("✅ Proxy rodando na porta 10000");
});
