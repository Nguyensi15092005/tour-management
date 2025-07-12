import express, {Express, Request, Response} from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";

dotenv.config();

sequelize;

const app: Express = express();
const port: number | String = process.env.PORT || 3005;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/tours", (req: Request, res: Response)=>{
    res.send("OK")
});
app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})

