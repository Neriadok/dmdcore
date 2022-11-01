import {DataTypes, Model} from "sequelize";
import {AppUser} from "../../client/src/entities/app-user";
import {sequelize} from "../lib/database";

export class DbUser extends Model<AppUser> {
    id: number;
    uid: string;
    name: string;
}

DbUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uid: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User'
    },
}, {sequelize});
export default DbUser;

