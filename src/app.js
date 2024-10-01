import express from "express";
import { routerMascotas } from "./rutas/mascotasRouter.js";
import { routerAdoptantes } from "./rutas/adoptantesRouter.js";
import { routerSolicitudes } from "./rutas/solicitudesRouter.js";
import { routerEmpleados } from "./rutas/empleadosRouter.js";
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
// Definir Rutas
app.get('/', (req, res) => {
    res.send(`
        <h1> 🐾 ¡Bienvenido a Furry Friends! 🐾 </h1>
        <p>El hogar donde los sueños de amistad se hacen realidad.</p>
        <p>En Furry Friends, nos dedicamos a transformar vidas, nuestra misión es rescatar y brindar un nuevo comienzo a aquellos animales que anhelan un cariño sincero. 
        Cada uno de nuestros adorables compañeros peludos está listo para ofrecer amor incondicional y alegrar tu hogar, aquí, cada ladrido y ronroneo cuenta una historia de esperanza y felicidad.</p>
    `);
});


//Llamar rutas de mascotas
app.use("/mascotas",routerMascotas);

//Llamar rutas de adoptantes
app.use("/adoptantes",routerAdoptantes);

//Llamar rutas de solicitudes
app.use("/solicitudes",routerSolicitudes);

//Llamar rutas de empleados
app.use("/empleados",routerEmpleados);

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





