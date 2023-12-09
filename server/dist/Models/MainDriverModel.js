import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
class MainDriver extends Model {
}
MainDriver.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    driverFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    driverLastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    driverContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    driverSecondContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "maindriver",
});
export { MainDriver };
