import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const empleados = db.define("employees", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  full_name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  position: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  phone: {
    type: Sequelize.TEXT,
    allowNull: true // Puede ser nulo si no se proporciona un número de teléfono
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true // El email debe ser único
  },
  hire_date: {
    type: Sequelize.DATE,
    allowNull: true // Puede ser nulo si no se proporciona una fecha de contratación
  }
}, {
  timestamps: false
});


export { empleados }
