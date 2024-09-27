import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/solicitudesController.js";

const routerSolicitudes = express.Router();

routerSolicitudes.get('/', (req, res) => {
    res.send('Gestion de Registros de solicitudes: (Creación, Busqueda, Actualización y Eliminación)');
});

routerSolicitudes.post('/crear', (req, res) => {
    crear(req,res);
    
});

routerSolicitudes.get('/buscar', (req, res) => {
    buscar(req,res);
});

routerSolicitudes.get('/buscarId/:id', (req, res) => {
    buscarId(req,res);
});

routerSolicitudes.put('/actualizar/:id', (req, res) => {
    actualizar(req,res);
});

routerSolicitudes.delete('/eliminar/:id', (req, res) => {
    eliminar(req,res);
});

export {routerSolicitudes}