var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/connection.js";
import * as bcrypt from "bcrypt";
class MainDriver extends Model {
    getFullName() {
        return [this.driverFirstName, this.driverLastName].join(" ");
    }
    isCorrectPasscode(passcode) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(passcode, this.passcode);
        });
    }
}
MainDriver.init({
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
}, {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    paranoid: true,
    deletedAt: "timeRemoved",
    modelName: "maindriver",
});
MainDriver.beforeSave((maindriver) => __awaiter(void 0, void 0, void 0, function* () {
    if (maindriver.changed("passcode")) {
        const saltRounds = 8;
        maindriver.passcode = yield bcrypt.hash(maindriver.getDataValue("passcode"), saltRounds);
    }
}));
export { MainDriver };
