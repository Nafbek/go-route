import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/connection.js";

class Stop extends Model {
  public id!: number;
  public stopName!: any | null;
  public stopAddress!: string | null;
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
    destinationAddress: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "stop",
  }
);

export { Stop };
