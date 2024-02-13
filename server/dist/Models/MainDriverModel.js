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
    passcode: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: function () {
            const passcodeRandom = Math.random().toString(36).slice(-6);
            return passcodeRandom;
        },
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
