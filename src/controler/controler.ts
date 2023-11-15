import {Response, Request} from 'express'


const productos = [
    {
        nombre: "Pelota",
        modelo: "Modelo1",
        precio: 50,
        paisOrigen: "Argentina"
    },
    {
        nombre: "Celular",
        modelo: "Modelo2",
        precio: 120,
        paisOrigen: "Chile"
    },
    {
        nombre: "Televisor",
        modelo: "Modelo3",
        precio: 150,
        paisOrigen: "EEUU"
    }
];

export function getProducts(_:Request, res:Response) {
    res.send(productos);
};

export function getPrecio(_:Request, res:Response) {
    const mayor100 = productos.filter(producto => producto.precio>99);
    res.send(mayor100);
};

export function modifyProducts(req:Request, res:Response){
    const { modelo } = req.params;
    const nuevoProducto = req.body; 
  
    const indiceParaModificar = productos.findIndex(producto => producto.modelo === modelo);
  
    if (indiceParaModificar === -1) {
      res.status(201).send("No se encontró el modelo, no se puede modificar.");
    } else {
      productos[indiceParaModificar] = nuevoProducto;
      res.send(productos);
    }
  };

  export function deleteProducts(req:Request, res:Response){
    const {eliminarModelo} = req.params;
  
    const indiceparaeliminar = productos.findIndex(producto => producto.modelo === eliminarModelo)
  
    if(indiceparaeliminar === -1){
      res.status(404).send("No se encontro el modelo");
    } else {
      productos.splice(indiceparaeliminar, 1);
      res.send("Producto eliminado");
    }
  };


  export function filterProducts(req:Request, res:Response){
    const { paisFiltrado } = req.params;
  
    const productosPorPais = productos.filter(producto => producto.paisOrigen === paisFiltrado);
  
    if(productosPorPais.length === 0) {
      res.status(404).send("No se encontraron productos de ese país");
    } else {
      res.send(productosPorPais);
    }
  
  };

  export function filterPrice(req:Request, res:Response){
    const {precioFiltrado} = req.params;
  
    const productosPorPrecio = productos.filter(producto => producto.precio === parseInt(precioFiltrado))
  
    if(productosPorPrecio.length === 0){
      res.status(404).send("No se encontro el precio especificado");
    } else {
      res.send("Producto eliminado");
    }
  };

  export function createProducts (req:Request, res:Response) {
    const getProduct = req.body;
    productos.push(getProduct);
    console.log(productos)
    res.status(201).send(productos)
};