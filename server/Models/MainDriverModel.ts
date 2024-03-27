import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
import * as bcrypt from "bcrypt";

class MainDriver extends Model {
  public id!: number;
  public driverFirstName!: string;
  public driverLastName!: string | null;
  public driverContactNumber!: string | null;
  public driverSecondContactNumber!: string | null;
  public passcode!: string;
  getFullName() {
    return [this.driverFirstName, this.driverLastName].join(" ");
  }

  async isCorrectPasscode(passcode: string): Promise<boolean> {
    return await bcrypt.compare(passcode, this.passcode);
  }
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
    passcode: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: function () {
        const passcodeRandom = Math.random().toString(36).slice(-5);
        return passcodeRandom;
      },
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

MainDriver.beforeSave(async (maindriver) => {
  if (maindriver.changed("passcode")) {
    const saltRounds = 8;
    maindriver.passcode = await bcrypt.hash(
      maindriver.getDataValue("passcode"),
      saltRounds
    );
  }
});

export { MainDriver };
