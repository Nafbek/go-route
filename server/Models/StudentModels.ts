import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

class Student extends Model {
  public id!: number;
  public stopId!: number;
  public studentFirstName!: string;
  public studentLastName!: string | null;
  public studentContactNumber!: string | null;
  public studentDescription!: string | null;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    stopId: {
      type: DataTypes.INTEGER,
      references: {
        model: "stop",
        key: "id",
      },
    },
    studentFirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentLastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    studentContactNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    studentDescription: {
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
    modelName: "student",
  }
);

export { Student };
