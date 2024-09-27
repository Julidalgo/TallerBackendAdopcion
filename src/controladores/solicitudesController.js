import { solicitudes } from "../modelos/solicitudesModelo.js";
import { mascotas } from "../modelos/mascotasModelo.js"; // Importa también el modelo de mascotas
import { adoptantes } from "../modelos/adoptantesModelo.js"; // Importa el modelo de adoptantes
import { empleados } from "../modelos/empleadosModelo.js"; // Importa el modelo de empleados

const crear = async (req, res) => {
    try {
        // Validar que pet_id, adopter_id y employee_id existan en el cuerpo de la solicitud
        if (!req.body.pet_id) {
            return res.status(400).send({
                mensaje: "La mascota debe existir."
            });
        }

        if (!req.body.adopter_id) {
            return res.status(400).send({
                mensaje: "El adoptante debe existir."
            });
        }

        if (!req.body.employee_id) {
            return res.status(400).send({
                mensaje: "El empleado debe existir."
            });
        }

        // Buscar la mascota en la tabla pets
        const mascota = await mascotas.findOne({ where: { id: req.body.pet_id } });
        if (!mascota) {
            return res.status(404).send({
                mensaje: "La mascota no existe en la base de datos."
            });
        }

        // Buscar el adoptante en la tabla adopters
        const adoptante = await adoptantes.findOne({ where: { id: req.body.adopter_id } });
        if (!adoptante) {
            return res.status(404).send({
                mensaje: "El adoptante no existe en la base de datos."
            });
        }

        // Buscar el empleado en la tabla employees
        const empleado = await empleados.findOne({ where: { id: req.body.employee_id } });
        if (!empleado) {
            return res.status(404).send({
                mensaje: "El empleado no existe en la base de datos."
            });
        }

        // Crear el objeto dataset para la solicitud de adopción
        const dataset = {
            pet_id: req.body.pet_id,
            adopter_id: req.body.adopter_id,
            request_date: req.body.request_date || new Date(), // Usa la fecha actual si no se proporciona
            status: req.body.status || 'pending', // Estado por defecto
            approval_date: req.body.approval_date || null, // Campo opcional
            employee_id: req.body.employee_id // ID del empleado que gestiona la solicitud
        };

        // Usar Sequelize para crear el recurso en la base de datos
        const resultado = await solicitudes.create(dataset);
        return res.status(201).json({
            mensaje: "Registro de Solicitud de Adopción creado con éxito",
            data: resultado
        });
    } catch (err) {
        return res.status(500).json({
            mensaje: `Error al crear la Solicitud de Adopción: ${err.message}`
        });
    }
};





//Buscar Solicitud de Adopción
const buscar = (req, res) => {
    solicitudes.findAll().then((resultado) => {
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
            mensaje: "El id Solicitud de Adopción no puede estar vacio"
        });
        return;
    }
    else {
        solicitudes.findByPk(id).then((resultado) => {
            res.status(200).json(resultado);
        }).catch((err) => {
            res.status(500).json({
                mensaje: `No se encontraron registros de Solicitud de Adopción ::: ${err}`
            });
        });

    }

}



// Actualizar Solicitud de Adopción
const actualizar = (req, res) => {
    const id = req.params.id;

    if (!req.body.pet_id && !req.body.adopter_id && !req.body.employee_id && !req.body.status) {
        res.status(400).json({
            mensaje: "No se encontraron datos de Solicitud de Adopción para actualizar"
        });
        return;
    } else {
        const pet_id = req.body.pet_id || null;          // Campo opcional
        const adopter_id = req.body.adopter_id || null;  // Campo opcional
        const employee_id = req.body.employee_id || null; // Campo opcional
        const request_date = req.body.request_date || null; // Campo opcional
        const status = req.body.status || null;            // Campo opcional
        const approval_date = req.body.approval_date || null; // Campo opcional
        // No se necesitan los campos de adoptante ya que se están utilizando otros

        solicitudes.update({
            pet_id,
            adopter_id,
            employee_id,
            request_date,
            status,
            approval_date
        }, { where: { id } })
        .then((resultado) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: "Registro de Solicitud de Adopción actualizado"
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al actualizar registro de Solicitud de Adopción: ${err.message}`
            });
        });
    }
}



//Eliminar Solicitud de Adopción
const eliminar = (req, res) => {
    const id = req.params.id;
    if (id == null) {
        res.status(203).json({
            message: "Debe ingresar un ID de Solicitud de Adopción!",
        });
        return;
    }
    
    solicitudes.destroy({ where: { id: id } })
        .then((result) => {
            res.status(200).json({
                tipo: 'success',
                mensaje: `Registro con id ${id} Eliminado Correctamente`
            });
        })
        .catch((err) => {
            res.status(500).json({
                tipo: 'error',
                mensaje: `Error al eliminar Registro de Solicitud de Adopción ::: ${err}`
            });
        });
};



export { crear, buscar, buscarId, actualizar, eliminar }