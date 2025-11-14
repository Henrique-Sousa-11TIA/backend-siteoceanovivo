const express = require("express");
const app = express();

app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Porta onde o servidor vai rodar
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});




const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());


// ------------------ CADASTRO ------------------
app.post("/cadastro", (req, res) => {
  const { nome, email, senha } = req.body;

  db.run(
    "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
    [nome, email, senha],
    (err) => {
      if (err) return res.json({ erro: "Email já cadastrado!" });
      res.json({ sucesso: true });
    }
  );
});


// ------------------ LOGIN ------------------
app.post("/login", (req, res) => {
  const { email, senha } = req.body;

  db.get(
    "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
    [email, senha],
    (err, usuario) => {
      if (!usuario) return res.json({ erro: "Email ou senha incorretos!" });
      res.json({ sucesso: true, nome: usuario.nome });
    }
  );
});


// ------------------ RANKING: ENVIAR PONTOS ------------------
app.post("/ranking", (req, res) => {
  const { jogador, pontos } = req.body;

  db.run(
    "INSERT INTO ranking (jogador, pontos) VALUES (?, ?)",
    [jogador, pontos],
    () => {
      res.json({ sucesso: true });
    }
  );
});


// ------------------ RANKING: OBTER LISTA AO VIVO ------------------
app.get("/ranking", (req, res) => {
  db.all(
    "SELECT jogador, pontos FROM ranking ORDER BY pontos DESC LIMIT 10",
    (err, rows) => {
      res.json(rows);
    }
  );
});


// ------------------ INICIAR SERVIDOR ------------------
app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});
