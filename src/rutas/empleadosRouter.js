import express from "express";
import {crear,buscar,buscarId,actualizar,eliminar} from "../controladores/empleadosController.js";

const routerEmpleados = express.Router();

routerEmpleados.get('/', (req, res) => {
    res.send('Gestion de Registros de empleados: (Creación, Busqueda, Actualización y Eliminación)');
});

routerEmpleados.post('/crear', (req, res) => {
    crear(req,res);
    
});

routerEmpleados.get('/buscar', (req, res) => {
    buscar(req,res);
});

routerEmpleados.get('/buscarId/:id', (req, res) => {
    buscarId(req,res);
});

routerEmpleados.put('/actualizar/:id', (req, res) => {
    actualizar(req,res);
});

routerEmpleados.delete('/eliminar/:id', (req, res) => {
    eliminar(req,res);
});

export {routerEmpleados}