import { mascotas } from "../modelos/mascotasModelo.js";

// Crear un recurso Mascota
const crear = (req, res) => {

    // Validar campos requeridos
    if (!req.body.name || !req.body.species || !req.body.status) {
        return res.status(400).send({
            mensaje: "Los campos 'name', 'species' y 'status' no pueden estar vacíos."
        });
    }

    // Construir el dataset para la mascota
    const dataset = {
        name: req.body.name,
        species: req.body.species,
        breed: req.body.breed || null,  // Campo opcional
        age: req.body.age || null,      // Campo opcional
        description: req.body.description || null, // Campo opcional
        status: req.body.status,
        gender: req.body.gender || null, // Campo opcional
        size: req.body.size || null,    // Campo opcional
        weight: req.body.weight || null, // Campo opcional
        entry_date: req.body.entry_date || null, // Campo opcional
        vaccinated: req.body.vaccinated || null, // Campo opcional
        neutered: req.body.neutered || null, // Campo opcional
        medical_conditions: req.body.medical_conditions || null, // Campo opcional
        available_for_adoption: req.body.available_for_adoption || null // Campo opcional
    };

    // Usar Sequelize para crear el recurso en la base de datos
    mascotas.create(dataset)
        .then((resultado) => {
            res.status(201).json({
                mensaje: "Registro de Mascota creado con éxito",
                data: resultado
            });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Registro de Mascota no creado: ${err.message}`
            });
        });
};


//Buscar Mascotas
const buscar = (req, res) => {
    mascotas.findAll().then((resultado) => {
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
            mensaje: "El id Mascota no puede estar vacio"
        });
        return;
    }
    else {
        mascotas.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);
        }).catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros de Mascota ::: ${err}`
            });
        });

    }

}



//Actualizar Mascota
const actualizar = (req, res) => {
    const id = req.params.id;
    if (!req.body.name && !req.body.species && !req.body.status) {
        res.status(400).json({
            mensaje: "No se encontraron Datos de Mascota para Actualizar"
        });
        return;

    }
    else {
        const name = req.body.name;
        const species = req.body.species;
        const breed = req.body.breed || null;  // Campo opcional
        const age = req.body.age || null;      // Campo opcional
        const description = req.body.description || null; // Campo opcional
        const status = req.body.status;
        const gender = req.body.gender || null; // Campo opcional
        const size = req.body.size || null;    // Campo opcional
        const weight = req.body.weight || null; // Campo opcional
        const entry_date = req.body.entry_date || null; // Campo opcional
        const vaccinated = req.body.vaccinated || null; // Campo opcional
        const neutered = req.body.neutered || null; // Campo opcional
        const medical_conditions = req.body.medical_conditions || null; // Campo opcional
        const available_for_adoption = req.body.available_for_adoption || null; // Campo opcional

        mascotas.update({
            name,
            species,
            breed,
            age,
            description,
            status,
            gender,
            size,
            weight,
            entry_date,
            vaccinated,
            neutered,
            medical_conditions,
            available_for_adoption
        }, { where: { id } }).then((resultado) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro de Mascota Actualizado"
            });

        }).catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar Registro de Mascota ::: ${err}`
            });

        });
    }


}

//Eliminar Mascota
const eliminar = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(203).json({
            message: "Debe ingresar un ID de Mascota!",
        });
        return;
    }
    //implementing delete function
    mascotas.destroy({ where: { id: id } })
        .then((result) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: `Registro con id ${id} Eliminado Correctamente`
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar Registro de Mascota ::: ${err}`
            });
        });
};



export { crear, buscar, buscarId, actualizar, eliminar }