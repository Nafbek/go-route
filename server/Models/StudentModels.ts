import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

class Student extends Model {
  public id!: number;
  public studentFirstName!: string | null;
  public studentLastName!: string | null;
  public studentContactNumber!: number | null;
}

Student.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    stop_id: {
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
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "student",
  }
);

export { Student };