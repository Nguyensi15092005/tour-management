import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import clientRotes from "./routes/client/index.route";
import moment from "moment";

dotenv.config();


const app: Express = express();
const port: number | String = process.env.PORT || 3005;

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// biến toàn cục
app.locals.moment = moment;

//router
clientRotes(app)
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

