import express from 'express';
import { AppDataSource } from './persistance/db';
import { mainRouter } from './router/routes';
import { Product } from './persistance/product';
import { User } from './persistance/user';
import cors from 'cors';
import { config } from 'dotenv';
import pool from './persistance/db';  // Este sería el pool de la conexión MySQL

config();

// Mostrar las variables de entorno (opcional para verificar)
const database = process.env.DATABASE_NAME;
console.log(database);
const username = process.env.DATABASE_USERNAME;
console.log(username);
const password = process.env.DATABASE_PASSWORD;
console.log(password);
const host = process.env.DATABASE_HOST;
console.log(host);

// Inicializar Express
const app = express();
const port = 8080;

// Configuración de CORS y middleware
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "https://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origins, X-Requested-Width, Content, Accept");
  next();
});

app.use(cors());
app.use(express.json());
app.use('/', mainRouter);

// Inicialización de la Base de Datos
AppDataSource.initialize()
  .then(async () => {
    console.log('Base de datos conectada');

    // Productos
    const validation_product = AppDataSource.manager.getRepository(Product);
    const product_exist = await validation_product.find();
    if (product_exist.length === 0) {
      const product1 = new Product(
        'https://imgs.search.brave.com/AUibPgk1Z25t3UbUVU16XIMVyeyjZFfVYgmDhKU-L3I/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91bmRl/cndhdmVicmFuZC5j/b20vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMDUvRFNDMDc4/OTQtMS5qcGc',
        'Remera Oversize negra', 5000, 5
      );
      const product2 = new Product(
        'https://imgs.search.brave.com/Mei0Rs5phPofNkohB7JNLD8vyxOB-Jj_a1erHE9qHog/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9odHRw/Mi5tbHN0YXRpYy5j/b20vRF9OUV9OUF84/NTY4NzctTUxBNTIx/MjUxMDc2NjBfMTAy/MDIyLVcud2VicA',
        'Remera Oversize blanca', 5000, 1
      );
      await AppDataSource.manager.save([product1, product2]);
      console.log('Productos iniciales guardados:', [product1, product2]);
    }

    // Usuarios
    const validation_user = AppDataSource.manager.getRepository(User);
    const user_exist = await validation_user.find();
    if (user_exist.length === 0) {
      const user1 = new User('prueba123', 'prueba@gmail.com', '12345678');
      await AppDataSource.manager.save([user1]);
      console.log('Usuarios iniciales guardados:', [user1]);
    }

    // Levantar el servidor
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error inicializando la base de datos:', err);
    throw err;
  });

// Ruta para registro de usuarios (vinculando con el frontend)
app.post('/register', async (req, res) => {
  const { usuario, contrasena, correoElectronico } = req.body;
  try {
    const query = 'INSERT INTO usuarios (usuario, contrasena, correoElectronico) VALUES (?, ?, ?)';
    const [result] = await pool.execute(query, [usuario, contrasena, correoElectronico]);
    res.status(201).json({ message: 'Usuario registrado con éxito', id: (result as any).insertId });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ message: 'Error al registrar el usuario' });
  }
});

// Ruta para obtener productos (para mostrar en el frontend)
app.get('/products', async (req, res) => {
  try {
    const [products] = await pool.execute('SELECT * FROM productos');
    res.json(products);
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error al obtener productos' });
  }
});
