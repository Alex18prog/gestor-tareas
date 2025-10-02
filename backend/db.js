const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Conexión a la base de datos (archivo tasks.db en la carpeta backend)
const dbPath = path.resolve(__dirname, 'tasks.db');
const db = new sqlite3.Database(dbPath);

// Crear tabla de tareas si no existe
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT NOT NULL
    )
  `);
});

module.exports = db;
