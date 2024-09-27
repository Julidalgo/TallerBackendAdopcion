import Sequelize from "sequelize";
import { db } from "../database/conexion.js";


const mascotas = db.define("pets", {
  id: {
    type: Sequelize.BIGINT,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  species: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  breed: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.ENUM('available', 'adopted'),
    allowNull: false
  },
  gender: {
    type: Sequelize.ENUM('masculino', 'femenino'),
    allowNull: true
  },
  size: {
    type: Sequelize.ENUM('pequeño', 'mediano', 'grande'),
    allowNull: true
  },
  weight: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: true
  },
  entry_date: {
    type: Sequelize.DATE,
    allowNull: true
  },
  vaccinated: {
    type: Sequelize.BOOLEAN,  // True = 1: Es decir "Si", Flase = 0: Es decir "No"
    allowNull: true
  },
  neutered: {
    type: Sequelize.BOOLEAN, // True = 1: Es decir "Si", Flase = 0: Es decir "No"
    allowNull: true
  },
  medical_conditions: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  available_for_adoption: { // True = 1: Es decir "Si", Flase = 0: Es decir "No"
    type: Sequelize.BOOLEAN,
    allowNull: true
  }

}, {
  timestamps: false
});


export { mascotas }
