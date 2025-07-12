import express, { Express, Request, Response } from "express";
import sequelize from "./config/database";
import dotenv from "dotenv";
import Tour from "./models/tour.model";

dotenv.config();

sequelize;

const app: Express = express();
const port: number | String = process.env.PORT || 3005;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/tours", async (req: Request, res: Response) => {
  const tours = await Tour.findAll({
    raw: true // ko có các key lung tung
  });
  console.log(tours)
  res.render("client/pages/tours/index", {
    tours: tours
  })
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

