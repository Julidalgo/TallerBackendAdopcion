import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const adoptantes = db.define("adopters", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  last_name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    unique: true
  },
  phone: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  address: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  birth_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  occupation: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  housing_type: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  has_other_pets: {
    type: Sequelize.BOOLEAN, // True = 1: Es decir "Si", Flase = 0: Es decir "No"
    allowNull: true
  },
  type_of_other_pets: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  adoption_reason: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  timestamps: false
});



export { adoptantes }
