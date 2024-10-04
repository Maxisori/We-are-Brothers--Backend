import { Router, Request, Response } from 'express';
import { addProductsToDB, addUserToDB, getProducts, loginUser } from '../persistance/controles'; // Cambié la ruta para que apunte al archivo nuevo

const mainRouter = Router();

// Ruta de prueba
mainRouter.get('/', (_: Request, res: Response) => {
  res.send('Hola');
});

// Rutas para productos, registro y login
mainRouter.get('/producto', getProducts);
mainRouter.post('/anadir', addProductsToDB);
mainRouter.post('/registro', addUserToDB);
mainRouter.post('/login', loginUser);

export { mainRouter };
