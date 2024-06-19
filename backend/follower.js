import sequelize from "./db.js";
import { DataTypes } from "@sequelize/core";
import user from "./user.js";
import post from "./post.js";

const follower = sequelize.define(
  "follower",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    following_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // defaultValue: null,
      references: {
        model: user,
        key: "id",
      },
    },
    followed_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // defaultValue: null,
      references: {
        model: user,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

// await user.sync();
// await post.sync();
// user.hasMany(follower, { foreignKey: "following_user_id" });
// user.hasMany(follower, { foreignKey: "followed_user_id" });
// await follower.sync();

export default follower;
