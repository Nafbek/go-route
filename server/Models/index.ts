import { MainDriver } from "./MainDriverModel.js";
import { RouteBySub } from "./RouteBySubModel.js";
import { Stop } from "./StopModel.js";
import { Student } from "./StudentModels.js";
import { Tier } from "./TierModel.js";
import { Package } from "./PackageModel.js";

MainDriver.hasMany(Package, {
  foreignKey: "driver_id",
  onDelete: "CASCADE",
});

Package.belongsTo(MainDriver, {
  foreignKey: "driver_id",
});

Package.hasMany(Tier, {
  foreignKey: "package_id",
  onDelete: "CASCADE",
});

Tier.belongsTo(Package, {
  foreignKey: "package_id",
});

Tier.hasMany(Stop, {
  foreignKey: "tier_id",
  onDelete: "CASCADE",
});

Stop.belongsToMany(Tier, {
  //   foreignKey: "tier_id",
  //   onDelete: "CASCADE",
  through: "StopTier",
});

Stop.hasMany(Student, {
  foreignKey: "stop_id",
  onDelete: "CASCADE",
});

Student.belongsToMany(Stop, {
  through: "StudentStop",
});

export { MainDriver, Package, Tier, Stop, Student };
