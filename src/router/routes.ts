import express from 'express';
import { createProducts, deleteProducts, filterPrice, filterProducts, getPrecio, getProducts, modifyProducts } from '../controler/controler';


const mainRouter = express.Router();

mainRouter.get('/', (_, res) => {
  res.send('¡Servidor en funcionamiento!');
});


//1.// 

mainRouter.get('/productos', getProducts)

//2.//

mainRouter.get('/precio', getPrecio);

//3.//

mainRouter.put('/modificar/:modelo', modifyProducts);



//4.//

mainRouter.delete('/eliminar/:eliminarModelo', deleteProducts);

//5.//

mainRouter.get('/pais/:paisFiltrado', filterProducts);

//6.//

mainRouter.get('/precio/:precioFiltrado', filterPrice);

//7.//

mainRouter.post('/crearProductos', createProducts);

export { mainRouter };
