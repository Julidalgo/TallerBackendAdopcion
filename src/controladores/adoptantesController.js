import { adoptantes } from "../modelos/adoptantesModelo.js";

// Crear un  Adoptante
const crear = (req, res) => {

    // Validar campos requeridos
    if (!req.body.first_name || !req.body.last_name || !req.body.email) {
        return res.status(400).send({
            mensaje: "Los campos 'first_name', 'last_name' y 'email' no pueden estar vacíos."
        });
    }

    // Construir el dataset para el adoptante
    const dataset = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone || null,  // Campo opcional
        address: req.body.address || null, // Campo opcional
        birth_date: req.body.birth_date || null, // Campo opcional
        occupation: req.body.occupation || null, // Campo opcional
        housing_type: req.body.housing_type || null, // Campo opcional
        has_other_pets: req.body.has_other_pets || null, // Campo opcional
        type_of_other_pets: req.body.type_of_other_pets || null, // Campo opcional
        adoption_reason: req.body.adoption_reason || null // Campo opcional
    };

    // Usar Sequelize para crear el recurso en la base de datos
    adoptantes.create(dataset)
        .then((resultado) => {
            res.status(201).json({
                mensaje: "Registro de Adoptante creado con éxito",
                data: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro de Adoptante no creado: ${err.message}`
            });
        });
};



//Buscar Adoptante
const buscar = (req, res) => {
    adoptantes.findAll().then((resultado) => {
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
            mensaje: "El id Adoptante no puede estar vacio"
        });
        return;
    }
    else {
        adoptantes.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);
        }).catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros de Adoptante ::: ${err}`
            });
        });

    }

}



// Actualizar Adoptante
const actualizar = (req, res) => {
    const id = req.params.id;
    if (!req.body.first_name && !req.body.last_name && !req.body.email) {
        res.status(400).json({
            mensaje: "No se encontraron datos de Adoptante para actualizar"
        });
        return;
    } else {
        const first_name = req.body.first_name || null;  // Campo opcional
        const last_name = req.body.last_name || null;    // Campo opcional
        const email = req.body.email || null;            // Campo opcional
        const phone = req.body.phone || null;            // Campo opcional
        const address = req.body.address || null;        // Campo opcional
        const birth_date = req.body.birth_date || null;  // Campo opcional
        const occupation = req.body.occupation || null;  // Campo opcional
        const housing_type = req.body.housing_type || null; // Campo opcional
        const has_other_pets = req.body.has_other_pets || null; // Campo opcional
        const type_of_other_pets = req.body.type_of_other_pets || null; // Campo opcional
        const adoption_reason = req.body.adoption_reason || null; // Campo opcional

        adoptantes.update({
            first_name,
            last_name,
            email,
            phone,
            address,
            birth_date,
            occupation,
            housing_type,
            has_other_pets,
            type_of_other_pets,
            adoption_reason
        }, { where: { id } })
        .then((resultado) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro de Adoptante actualizado"
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro de Adoptante: ${err.message}`
            });
        });
    }
}


//Eliminar Adoptante
const eliminar = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(203).json({
            message: "Debe ingresar un ID de Adoptante!",
        });
        return;
    }
    
    adoptantes.destroy({ where: { id: id } })
        .then((result) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: `Registro con id ${id} Eliminado Correctamente`
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar Registro de Adoptante ::: ${err}`
            });
        });
};



export { crear, buscar, buscarId, actualizar, eliminar }