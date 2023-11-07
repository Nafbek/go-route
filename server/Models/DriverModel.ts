import {Model, DataTypes} from 'sequelize'
import sequelize from '../config/connnection'

class Driver extends Model {
    public id!: number;
    public driverFirstName!: string | null;
    public driverLastName !: string | null;
    public phoneNumber !: number | null;
    public password !: string | null;

}

Driver.init(
   {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    driverFirstName: {
        type: DataTypes.STRING,
        allowNull: true,

    },
    driverLastName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true,
    },

   }, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Driver',
   }
)

export {Driver}