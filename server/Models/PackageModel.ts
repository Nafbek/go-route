import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

class Package extends Model {
  public id!: number;
  public driver_id!: number | null;
  public routeNumber!: string | null;
  public packageName!: string | null;
  public routeDescription!: string | null;
}

Package.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    driver_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "mainDriver",
        key: "id",
      },
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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "package",
  }
);

export { Package };
