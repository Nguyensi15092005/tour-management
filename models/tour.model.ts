import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Tour = sequelize.define("Tour", {
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
    code: {
        type: DataTypes.STRING(10),
    },
    images: {
        type: DataTypes.TEXT('long')
    },
    price: {
        type: DataTypes.INTEGER
    },
    discount: {
        type: DataTypes.INTEGER
    },
    information: {
        type: DataTypes.TEXT('long')
    },
    schedule: {
        type: DataTypes.TEXT('long')
    },
    timeStart: {
        type: DataTypes.DATE
    },
    stock: {
        type: DataTypes.INTEGER
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
    tableName: "tour",
    timestamps: true, // tự động quản lý createdAt, updatedAt
});

export default Tour