import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

class MainDriver extends Model {
  public id!: number;
  public driverFirstName!: string | null;
  public driverLastName!: string | null;
  public driverContactNumber!: number | null;
  public password!: string;
}

MainDriver.init(
  {
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
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "mainDriver",
  }
);

export { MainDriver };
