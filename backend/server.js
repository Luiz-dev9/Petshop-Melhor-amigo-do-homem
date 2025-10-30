const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/cadastro", (req, res) => {
  const { nome, email, telefone, animal, motivo } = req.body;

  // 1️⃣ Verificação correta dos campos
  if (!nome || !email || !telefone || !animal || !motivo) {
    return res.status(400).json({ error: "Por favor, preencha todos os campos obrigatórios." });
  }

  // 2️⃣ Query ajustada com os nomes certos dos campos e variáveis
  db.query(
    "INSERT INTO tb_agendamentos (nome, email, telefone, animal_nome, descri) VALUES (?, ?, ?, ?, ?)",
    [nome, email, telefone, animal, motivo],
    (err, results) => {
      if (err) {
        console.error("Erro ao inserir no banco:", err);
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "Cadastro realizado com sucesso!",
        id: results.insertId,
      });
    }
  );
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
