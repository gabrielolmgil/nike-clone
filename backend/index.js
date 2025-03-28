const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env['PORT'] || 3000

// Crear conexión con la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: process.env.DB_USER || "root", // Usa variables de entorno para credenciales
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "nike", // También puedes definir el nombre de la base de datos
});

// Conectar a la base de datos
db.connect(err => {
    if (err) {
        console.error('Error de conexión a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.use(cors());
app.use(express.json());

// Ruta para agregar un usuario
app.post('/api/user', async (req, res) => {
    try {
        const { name, password, role } = req.body;

        if (!name || !password || !role) {
            return res.status(400).json({ error: "El nombre, la contraseña y el rol son obligatorios" });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = "INSERT INTO user (name, password, role) VALUES (?, ?, ?)";

        // Usamos Promesas para manejar la respuesta de la base de datos
        const result = await new Promise((resolve, reject) => {
            db.query(query, [name, hashedPassword, role], (err, result) => {
                if (err) {
                    return reject(err); // Rechazar en caso de error
                }
                resolve(result); // Resolver el resultado de la inserción
            });
        });

        const insertId = result.insertId;
        return res.status(201).json({ message: "Usuario creado correctamente", userId: insertId });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/user', (req, res) => {
    const query = "SELECT * FROM user";
    
    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener usuarios:", err);
            return res.status(500).json({ error: "Error al obtener los usuarios" });
        }
        return res.status(200).json(results);
    });
});

// Ruta para obtener un usuario por ID
app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM user WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el usuario:", err);
            return res.status(500).json({ error: "Error al obtener el usuario" });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json(results[0]);
    });
});

// Ruta para eliminar un usuario por ID
app.delete('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM user WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el usuario:", err);
            return res.status(500).json({ error: "Error al eliminar el usuario" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        return res.status(200).json({ message: "Usuario eliminado correctamente" });
    });
});

// Ruta de prueba
app.get('/api/mensaje', (req, res) => {
    return res.json({ mensaje: '¡Hola desde la API en JavaScript!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
