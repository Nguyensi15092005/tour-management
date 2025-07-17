import { DataTypes } from "sequelize";
import slugify from "slugify";
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
        allowNull: true
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

Tour.beforeCreate((item) => {
    console.log("✅ Hook beforeCreate chạy"); // Thêm dòng này
    item["slug"] = slugify(`${item["title"]}-${Date.now()}`, { 
        lower: true,       // chuyển thành chữ thường, mặc định là `false` 
        strict: true,      // xóa các ký tự đặc biệt ngoại trừ replacement, mặc định là `false`  
    })
});

export default Tour