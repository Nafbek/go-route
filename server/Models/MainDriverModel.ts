import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

class MainDriver extends Model {
  public id!: number;
  public driverFirstName!: string;
  public driverLastName!: string | null;
  public driverContactNumber!: string | null;
  public driverSecondContactNumber!: string | null;
  public password!: string;

  // getFullName() {
  //   return [this.driverFirstName, this.driverLastName].join(" ");
  // }
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
    driverSecondContactNumber: {
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
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "maindriver",
  }
);

export { MainDriver };
