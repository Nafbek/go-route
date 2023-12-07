import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";
class RouteBySub extends Model {
}
RouteBySub.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    driver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "mainDriver",
            key: "id",
        },
    },
    subDriver_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "mainDriver",
            key: "id",
        },
    },
    routeNumber: {
        type: DataTypes.STRING,
        references: {
            model: "tier",
            key: "id",
        },
    },
    packageNumber: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reasonsOfSubstitution: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'timeRemoved',
    modelName: "routeBySub",
});
export { RouteBySub };
