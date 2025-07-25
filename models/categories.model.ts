import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Category = sequelize.define("Category", {
    id: {
        type: DataTypes.INTEGER, 
        autoIncrement: true, //tự động tăng,
        allowNull: false, // bắt buộc nhập hay ko
        primaryKey: true, // khóa chính
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING(500)
    },
    description: {
        type: DataTypes.TEXT('long')
    },
    status: {
        type: DataTypes.STRING(20),
    },
    position: {
        type: DataTypes.INTEGER
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    deletedAt: {
        type: DataTypes.DATE
    }
}, {
    tableName: "categories",
    timestamps: true, // tự động quản lý createdAt, updatedAt
});

export default Category;