import { Response, Request } from 'express'
import { AppDataSource, udb } from '../persistance/db';
import { Product } from '../persistance/product';
import { User } from '../persistance/user';
import { Cart } from '../persistance/cart';

export const getProducts = async (_: Request, res: Response) => {
    const products = AppDataSource.manager.getRepository(Product);
    const final = await products.find()
    res.json(final);
}

export const addProductsToDB = async (req: Request, res: Response) => {
    const { jsonifiedCart } = req.body;

    const cartEntity = new Cart(jsonifiedCart);

    await AppDataSource.manager.save(Cart, cartEntity);

    return res.status(201).json({ message: 'Carrito registrado exitosamente' });
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