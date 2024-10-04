import { Request, Response } from 'express';
import { AppDataSource } from './db'; // Asegúrate de tener correctamente configurado AppDataSource
import { Product } from './product';
import { User } from './user';

// Función para añadir productos a la base de datos
export const addProductsToDB = async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const newProduct = productRepository.create(req.body); // Crea un nuevo producto con los datos del request
    await productRepository.save(newProduct); // Guarda el producto en la base de datos
    res.status(201).send('Producto agregado correctamente');
  } catch (error) {
    res.status(500).send('Error al agregar producto');
  }
};

// Función para obtener productos de la base de datos
export const getProducts = async (req: Request, res: Response) => {
  try {
    const productRepository = AppDataSource.getRepository(Product);
    const products = await productRepository.find(); // Obtiene todos los productos
    res.send(products);
  } catch (error) {
    res.status(500).send('Error al obtener productos');
  }
};

// Función para registrar usuarios en la base de datos
export const addUserToDB = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const newUser = userRepository.create(req.body); // Crea un nuevo usuario con los datos del request
    await userRepository.save(newUser); // Guarda el usuario en la base de datos
    res.status(201).send('Usuario registrado correctamente');
  } catch (error) {
    res.status(500).send('Error al registrar usuario');
  }
};

// Función para el inicio de sesión de los usuarios
export const loginUser = async (req: Request, res: Response) => {
  try {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOneBy({ username: req.body.username }); // Busca el usuario por nombre de usuario
    if (user && user.password === req.body.password) {
      res.status(200).send('Usuario logueado correctamente');
    } else {
      res.status(401).send('Credenciales incorrectas');
    }
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
};
