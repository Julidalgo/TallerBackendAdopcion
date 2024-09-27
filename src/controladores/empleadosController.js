import { empleados } from "../modelos/empleadosModelo.js";

// Crear un Empleado
const crear = (req, res) => {

    // Validar campos requeridos
    if (!req.body.full_name || !req.body.position || !req.body.email) {
        return res.status(400).send({
            mensaje: "Los campos 'full_name', 'position' y 'email' no pueden estar vacíos."
        });
    }

    // Construir el dataset para el Empleado
    const dataset = {
        full_name: req.body.full_name,
        position: req.body.position,
        email: req.body.email,
        phone: req.body.phone || null,  // Campo opcional
        hire_date: req.body.hire_date || null // Campo opcional
    };

    // Usar Sequelize para crear el recurso en la base de datos
    empleados.create(dataset)
        .then((resultado) => {
            res.status(201).json({
                mensaje: "Registro de Empleado creado con éxito",
                data: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro de Empleado no creado: ${err.message}`
            });
        });
};




//Buscar Empleado
const buscar = (req, res) => {
    empleados.findAll().then((resultado) => {
        res.status(200).json(resultado);
    }).catch((err) => {
        res.status(500).json({
            mensaje: `No se encontraron registros ::: ${err}`
        });
    });
}


//buscar por ID
const buscarId = (req, res) => {

    const id = req.params.id;
    if (id == null) {
        res.status(400).json({
            mensaje: "El id Empleado no puede estar vacio"
        });
        return;
    }
    else {
        empleados.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);
        }).catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros de Empleado ::: ${err}`
            });
        });

    }

}



// Actualizar Empleado
const actualizar = (req, res) => {
    const id = req.params.id;
    
    // Verificar que al menos uno de los campos a actualizar esté presente
    if (!req.body.full_name && !req.body.position && !req.body.email) {
        return res.status(400).json({
            mensaje: "No se encontraron datos de Empleado para actualizar"
        });
    }

    // Crear un objeto con los datos a actualizar
    const dataset = {
        full_name: req.body.full_name || null,  // Campo opcional
        position: req.body.position || null,    // Campo opcional
        email: req.body.email || null,          // Campo opcional
        phone: req.body.phone || null,          // Campo opcional
        hire_date: req.body.hire_date || null   // Campo opcional
    };

    // Usar Sequelize para actualizar el recurso en la base de datos
    empleados.update(dataset, { where: { id } })
        .then((resultado) => {
            if (resultado[0] === 0) {
                return res.status(404).json({
                    mensaje: "Empleado no encontrado"
                });
            }
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro de Empleado actualizado"
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro de Empleado: ${err.message}`
            });
        });
};



//Eliminar Empleado
const eliminar = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(203).json({
            message: "Debe ingresar un ID de Empleado!",
        });
        return;
    }
    
    empleados.destroy({ where: { id: id } })
        .then((result) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: `Registro con id ${id} Eliminado Correctamente`
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar Registro de Empleado ::: ${err}`
            });
        });
};



export { crear, buscar, buscarId, actualizar, eliminar }