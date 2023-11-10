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
    tierAnchor: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    timeEnd: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    totalRiders: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    runningDays: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Tier"
});
export { Tier };
