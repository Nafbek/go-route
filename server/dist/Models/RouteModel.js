import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
class TripRoute extends Model {
}
TripRoute.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    driver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    routeNumber: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    packageName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    routeDescription: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "TripRoute"
});
export { TripRoute };
