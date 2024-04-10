import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
class Tier extends Model {
}
Tier.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: true,
        autoIncrement: true,
    },
    tierAnchor_school: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    schoolContactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    packageId: {
        type: DataTypes.INTEGER,
        references: {
            model: "package",
            key: "id",
        },
    },
    routeNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    shift: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeStart: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeEnd: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalRiders: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    runningDays: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    totalMiles: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    routeDescription: {
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
    modelName: "tier",
});
export { Tier };
