const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const { log } = require('console');

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
app.post('/api/register', async (req, res) => {
    console.log("Solicitud POST recibida en /api/register");
    try {
        const { name, password, role } = req.body;
        
        if (!name || !password || !role) {
            console.log("Datos incompletos:", req.body);
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

app.post('/api/login', async (req, res) => { 
    console.log("Solicitud POST recibida en /api/login");

    try {
        const { name, password } = req.body;

        console.log("Datos recibidos:", req.body);
        if (!name || !password ) {
            console.log("Datos incompletos:", req.body);
            return res.status(400).json({ error: "El nombre, la contraseña y el password son obligatorios" });
        }

        const query = "Select * from  user where name = ?";

        const user = await new Promise((resolve, reject) => {
            db.query(query, [name], (err, result) => {
                if (err) return reject(err);
                resolve(result[0]); // Solo necesitamos un usuario
            });
        });
        console.log(user);

        if (!user) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }

    
        return res.status(200).json({ message: "Login exitoso", userName: user.name, role: user.role });
        
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

app.post('/api/setProduct', async (req, res) => {
    console.log("Solicitud POST recibida en /api/setProduct");
    
    try {
        const { reference, name, price, description, check, type, img } = req.body;
        console.log(reference, name, price, description, check, type, img)
        // Validación de datos
        if (!reference || !name || !price || !description || check === undefined || !type || !img) {
            console.log("Datos incompletos:", req.body);
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const query = "INSERT INTO product (reference, name, price, description, `check`, type, img) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        const result = await new Promise((resolve, reject) => {
            db.query(query, [reference, name, price, description, check, type, img], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });

        const insertId = result.insertId;
        return res.status(201).json({ message: "Producto creado correctamente", productId: insertId });
    } catch (error) {
        console.error("Error en el servidor:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

// Ruta para obtener todos los usuarios
app.get('/api/getProduct', (req, res) => {
    const query = "SELECT * FROM product";
    
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

// Ruta para eliminar un producto por ID
app.delete('/api/product/:reference', (req, res) => {
    const { reference } = req.params;
    const query = "DELETE FROM product WHERE reference = ?";
    
    db.query(query, [reference], (err, results) => {
        if (err) {
            console.error("Error al eliminar el producto:", err);
            return res.status(500).json({ error: "Error al eliminar el producto" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        return res.status(200).json({ message: "Producto eliminado correctamente" });
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
