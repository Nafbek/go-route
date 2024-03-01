import { MainDriver } from "./MainDriverModel.js";
import { Stop } from "./StopModel.js";
import { Student } from "./StudentModels.js";
import { Tier } from "./TierModel.js";
import { Package } from "./PackageModel.js";
//Driver and package association
MainDriver.hasMany(Package, {
    foreignKey: "driverId",
    onDelete: "CASCADE",
});
Package.belongsTo(MainDriver, {
    foreignKey: "driverId",
});
Package.hasMany(Tier, {
    foreignKey: "packageId",
    onDelete: "CASCADE",
});
Tier.belongsTo(Package, {
    foreignKey: "packageId",
});
Tier.hasMany(Stop, {
    foreignKey: "tierId",
    onDelete: "CASCADE",
});
Stop.belongsToMany(Tier, {
    foreignKey: "stopId",
    //   onDelete: "CASCADE",
    as: "StopOnTier",
    through: "StopTier",
});
Stop.hasMany(Student, {
    foreignKey: "stopId",
    onDelete: "CASCADE",
});
Student.belongsToMany(Stop, {
    as: "StudentAtStop",
    through: "StudentStop",
    foreignKey: "studentId",
});
export { MainDriver, Package, Tier, Stop, Student };
