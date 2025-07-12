import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // tên data
  process.env.DATABASE_USERNAME, //username đăng nhập 
  process.env.DATABASE_PASSWORD, // mật khẩu
  {
    host: process.env.DATABASE_LOCALHOST,
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
  console.log('Connect success.');
}).catch((error) => {
  console.error('connect error: ', error);
});

export default sequelize;