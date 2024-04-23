import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

let vehicles = [];

// Função para gerar um ID único
function generateID() {
  return vehicles.length > 0 ? vehicles[vehicles.length - 1].id + 1 : 1;
}

// 1 - Endpoint para criar veículo
app.post("/vehicles", (req, res) => {
  const { modelo, marca, ano, cor, preco } = req.body;
  const id = generateID();
  const vehicle = { id, modelo, marca, ano, cor, preco };
  vehicles.push(vehicle);
  res.status(201).json(vehicle);
});

// 2 - Endpoint para ler todos os veículos
app.get("/vehicles", (req, res) => {
  res.json(vehicles);
});

// 3 - Endpoint para filtrar veículos por marca
app.get("/vehicles/filtrar", (req, res) => {
  const { marca } = req.query;
  const filteredVehicles = vehicles.filter(
    (vehicle) => vehicle.marca.toLowerCase() === marca.toLowerCase()
  );
  res.json(filteredVehicles);
});

app.listen(3333, () => console.log("Servidor rodando na porta 3333"));
