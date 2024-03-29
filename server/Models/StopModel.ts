import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

class Stop extends Model {
  public id!: number;
  public tierId!: number;
  public stopName!: string | null;
  public stopAddress!: string;
  public pickupTime_home!: Date;
  public dropoffTime_home!: Date;
  public destinationAddress!: string;
  public pickupTime_school!: Date;
  public dropoffTime_school!: Date;
}

Stop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    tierId: {
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
      type: DataTypes.DATE,
      allowNull: false,
    },
    dropoffTime_home: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    destinationAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickupTime_school: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dropoffTime_school: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "stop",
  }
);

export { Stop };
