import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const solicitudes = db.define("adoption_requests", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  pet_id: {
    type: Sequelize.BIGINT,
    allowNull: true, // Puede ser nulo si aún no se asignó una mascota
    references: {
      model: 'pets', // nombre de la tabla de mascotas
      key: 'id'
    }
  },
  adopter_id: {
    type: Sequelize.BIGINT,
    allowNull: true, // Puede ser nulo si aún no se asignó un adoptante
    references: {
      model: 'adopters', // nombre de la tabla de adoptantes
      key: 'id'
    }
  },
  request_date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW // Asigna la fecha actual por defecto
  },
  status: {
    type: Sequelize.ENUM('pending', 'approved', 'rejected'),
    allowNull: false
  },
  approval_date: {
    type: Sequelize.DATE,
    allowNull: true // Campo opcional, puede no tener valor
  },
  employee_id: {
    type: Sequelize.BIGINT,
    allowNull: true // Campo opcional, puede no tener valor
  }
}, {
  timestamps: false
});




export { solicitudes }
