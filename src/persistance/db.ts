import { DataSource } from "typeorm";
import { Product } from "./product";
import { User } from "./user";
import "reflect-metadata";
import "dotenv/config";

// TypeORM DataSource configuration
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: 3306,
    username: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'LaDuplicadora',
    synchronize: true, // Cambia a false en producción
    logging: true, // Puedes desactivar el logging si no lo necesitas
    entities: [Product, User], 
    subscribers: [],
    migrations: []
});

// Si deseas mantener el pool de conexiones, puedes usarlo así:
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: process.env.DATABASE_HOST || 'localhost',
    user: process.env.DATABASE_USERNAME || 'root',
    password: process.env.DATABASE_PASSWORD || '',
    database: process.env.DATABASE_NAME || 'LaDuplicadora',
});

export default pool;

// Tipos de producto y usuario para otras partes de la aplicación
export type Producto = {
    id: number;
    img: string;
    name: string;
    price: number;
    quantity: number;
};

export type Usuario = {
    id: number;
    username: string;
    email: string;
    password: string;
    password2: string;
};

// Datos de prueba (mock) si lo necesitas
export const db: Array<Producto> = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        name: "Remera Ovesize",
        price: 3000,
        quantity: 1,
    },
];

export const udb: Array<Usuario> = [
    {
        id: 1,
        username: "Maci",
        email: "Maci@gmail.com",
        password: "maci123",
        password2: "maci123"
    }
];
