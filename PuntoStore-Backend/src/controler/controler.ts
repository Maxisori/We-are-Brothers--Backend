import { Response, Request } from 'express'
import { AppDataSource, db, Producto, udb } from '../persistance/db';
import { Product } from '../persistance/product';
import { User } from '../persistance/user';

export const getProducts = async (_: Request, res: Response) => {
    const products = await AppDataSource.manager.find(Product);
    res.json(products);
}

export const addProductsToDB = async () => {
    db.map(async (p: Producto) => {
        const newProduct = new Product(p.img, p.name, p.price, p.quantity);
        await AppDataSource.manager.save(newProduct);
    });
}

export const addUserToDB = async () => {    
    //const { formData } = req.body;

    udb.map(async (u: User) => {
        const newUser = new User(u.username, u.email, u.password, u.password2);
        await AppDataSource.manager.save(newUser);
    });
}

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const user = await AppDataSource.manager.findOne(User, { where: { username, password } });
    if (user) {
        res.json({
            success: true,
            msg: "Iniciaste sesion exitosamente"
        });       
    } else {
        res.status(401).json({
            success: false,
            msg: "Erroro al iniciar sesion"
        })
    }
}