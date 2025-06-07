import RoleModel from '../app/Models/RoleModel.js';
import UserModel from '../app/Models/UserModel.js';

export default () => {

    UserModel.belongsTo(RoleModel, {
        foreignKey: "id_role",
        as: "role"
    });

    RoleModel.hasMany(UserModel, {
        foreignKey: "id_role",
        as: "users"
    });

}