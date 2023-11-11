import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

class Tier extends Model {
  public id!: number;
  public tierAnchor_school!: string | null;
  public timeStart!: Date;
  public timeEnd!: Date;
  public totalRiders!: number | null;
  public runningDays!: string | null;
}

Tier.init(
  {
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    package_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "package",
        key: "id",
      },
    },
    routeNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    shift: {
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
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "tier",
  }
);

export { Tier };
