import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";

class Tier extends Model {
  public id!: number;
  public package_id!: number | null;
  public tierAnchor_school!: string | null;
  public shift!: string;
  public schoolContactNumber!: string | null;
  public routeNumber!: string;
  public timeStart!: string;
  public timeEnd!: string;
  public totalRiders!: number | null;
  public runningDays!: string | null;
  public totalMiles!: number | null;
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    packageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "package",
        key: "id",
      },
      allowNull: true,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeEnd: {
      type: DataTypes.STRING,
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
    totalMiles: {
      type: DataTypes.FLOAT,
      allowNull: true,
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
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "tier",
  }
);

export { Tier };
