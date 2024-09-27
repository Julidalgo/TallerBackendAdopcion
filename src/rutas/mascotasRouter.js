import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/mascotasController.js";

const routerMascotas = express.Router();

routerMascotas.get('/', (req, res) => {
    res.send('Gestion de Registros de mascotas: (Creación, Busqueda, Actualización y Eliminación)');
});

routerMascotas.post('/crear', (req, res) => {
    crear(req,res);
    
});

routerMascotas.get('/buscar', (req, res) => {
    buscar(req,res);
});

routerMascotas.get('/buscarId/:id', (req, res) => {
    buscarId(req,res);
});

routerMascotas.put('/actualizar/:id', (req, res) => {
    actualizar(req,res);
});

routerMascotas.delete('/eliminar/:id', (req, res) => {
    eliminar(req,res);
});

export {routerMascotas}