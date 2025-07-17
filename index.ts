import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import part from "path";
import bodyParser from "body-parser";
import clientRotes from "./routes/client/index.route";
import moment from "moment";
import adminRoutes from "./routes/admin/index.route";
import { systemConfig } from "./config/system";

dotenv.config();


const app: Express = express();
const port: number | String = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

// tinymce
app.use(
  "/tinymce",
  express.static(part.join(__dirname, "node_modules", "tinymce"))
);
// end tinymce


// biến toàn cục
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefexAdmin;

//router

adminRoutes(app);
clientRotes(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

