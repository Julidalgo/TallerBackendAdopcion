import express from "express";

const routerMascotas = express.Router();

routerMascotas.get('/', (req, res) => {
    res.send('Hola Sitio de Mascotas');
});

routerMascotas.post('/crear', (req, res) => {
    res.send('Crear Mascota');
});

routerMascotas.get('/buscar', (req, res) => {
    res.send('Buscar Mascota');
});

routerMascotas.put('/actualizar/:id', (req, res) => {
    res.send('Actualizar Mascota');
});

routerMascotas.delete('/eliminar/:id', (req, res) => {
    res.send('Eliminar Mascota');
});

export {routerMascotas}