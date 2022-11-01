import {DataTypes, Model } from "sequelize";
import {AppUser} from "../../client/src/entities/app-user";
import {sequelize} from "../lib/database";

export class DbUser extends Model<AppUser> {
    id: number;
}
DbUser.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
}, { sequelize });
export default DbUser;

