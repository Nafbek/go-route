import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
class Package extends Model {
}
Package.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    driverId: {
        type: DataTypes.INTEGER,
        references: {
            model: "mainDriver",
            key: "id",
        },
    },
    districtName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    packageNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    packageDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "package",
});
export { Package };
