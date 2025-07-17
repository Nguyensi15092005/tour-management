import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const TourCategory = sequelize.define("TourCategory", {
    tour_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc nhập hay ko
        primaryKey: true, // khóa chính
        references: {
            model: 'tour', //tên bảng mà khóa ngoại tham chiếu đến
            key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
        }
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false, // bắt buộc nhập hay ko
        primaryKey: true, // khóa chính
        references: {
            model: 'categories', //tên bảng mà khóa ngoại tham chiếu đến
            key: 'id', // Tên trường trong bảng mà khóa ngoại tham chiếu đến
        }
    },
}, {
    tableName: "tour_categories",
    timestamps: false, // tự động quản lý createdAt, updatedAt
});


export default TourCategory;