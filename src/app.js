import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerAdoptantes } from "./rutas/adoptantesRouter.js";
import {db} from "./database/conexion.js";
import cors from "cors";
//Crear instancia de Express
const app = express();
//Cors
app.use(cors());
//Middleware JSON
app.use(express.json());

//Verificar Conexion Base Datos
db.authenticate().then(()=>{
    console.log(`Conexion a Base de datos correcta`);
}).catch(err=>{
    console.log(`Conexion a Base de datos incorrecta ${err}`);
});


//Definir Rutas
app.get('/', (req, res) => {
    res.send('Hola Sitio Principal');
});

//Llamar rutas de mascotas
app.use("/mascotas",routerMascotas);

//Llamar rutas de adoptantes
app.use("/adoptantes",routerAdoptantes);

//Puerto de Servidor
const PORT=4000;

db.sync().then(()=>{
    //Abri servicio e iniciar el Servidor
    app.listen(PORT,()=>{
        console.log(`Servidor Inicializado en el puerto ${PORT}`);
    })

}).catch(err=>{
    console.log(`Error al Sincronizar base de datos ${err}`);
});





