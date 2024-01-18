import { dbConfig } from "./config.js";
import { Sequelize } from "sequelize";
import UserModel from "./userData.js";

export const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

// User 모델 정의
export const User = UserModel(sequelize, Sequelize);
