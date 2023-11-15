"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./router/routes");
const app = (0, express_1.default)();
const port = 8080;
app.use('/', routes_1.mainRouter);
app.use((_, res) => {
    res.status(404).send('Error 404 - Página no encontrada');
});
app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});
