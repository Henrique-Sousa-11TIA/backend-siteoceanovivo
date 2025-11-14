const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("oceano.db");

db.serialize(() => {
  // Tabela de usuários
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT UNIQUE,
      senha TEXT
    )
  `);

  // Tabela de ranking
  db.run(`
    CREATE TABLE IF NOT EXISTS ranking (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      jogador TEXT,
      pontos INTEGER
    )
  `);
});

module.exports = db;
        