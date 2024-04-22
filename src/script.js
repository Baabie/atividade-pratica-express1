import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

let veiculos = [];

// Função para gerar um ID único
function generateID() {
  return veiculos.length > 0 ? veiculos[veiculos.length - 1].id + 1 : 1;
}

// Rota para criar um veículo
app.post("/veiculos", (req, res) => {
  const { modelo, marca, ano, cor, preco } = req.body;
  const id = generateID();
  const veiculo = { id, modelo, marca, ano, cor, preco };
  veiculos.push(veiculo);
  res.status(201).json(veiculo);
});

// Rota para ler todos os veículos
app.get("/veiculos", (req, res) => {
  res.json(veiculos);
});

// Rota para filtrar veículos por marca
app.get("/veiculos/filtrar", (req, res) => {
  const { marca } = req.query;
  const veiculosFiltrados = veiculos.filter(
    (veiculo) => veiculo.marca.toLowerCase() === marca.toLowerCase()
  );
  res.json(veiculosFiltrados);
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

// app.listen(3333, () => console.log("Servidor rodando na porta 3333"));
