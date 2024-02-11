import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";
class Stop extends Model {
}
Stop.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    tier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "tier",
            key: "id",
        },
    },
    stopName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    stopAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pickupTime_home: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    dropoffTime_home: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    destinationAddress: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    pickupTime_school: {
        type: DataTypes.TIME,
        allowNull: true,
    },
    dropoffTime_school: {
        type: DataTypes.TIME,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "stop",
});
export { Stop };
