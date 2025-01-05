import { DataTypes } from "sequelize";
import connection from "./connectionDb";


export const registerUser = connection.define('loginUsers', {
    id : {
        primaryKey: true,
        autoIncrement: true,
        type : DataTypes.INTEGER
    },
    userName : {
        primaryKey: false,
        allowNull: false,
        type : DataTypes.STRING
    },
    email : {
        primaryKey: false,
        allowNull: false,
        type : DataTypes.STRING
    },
    password : {
        primaryKey: false,
        allowNull: false,
        type : DataTypes.STRING
    },
    loginUserId : {
        primaryKey: true,
        allowNull: false,
        type : DataTypes.INTEGER
    },
    createdAt : {
        type: DataTypes.DATE,
        allowNull: false
    },
    updatedAt : {
        type: DataTypes.DATE,
        allowNull: false
    }
})