import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

class Stop extends Model {
  public id!: number;
  public stopName!: string | null;
  public stopAddress!: string;
  public pickDropTime_home!: Date;
  public pickDropTime_school!: Date;
}

Stop.init(
  {
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
    pickDropTime_home: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    destinationAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pickDropTime_school: {
      type: DataTypes.TIME,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: 'timeRemoved',
    modelName: "stop",
  }
);

export { Stop };
