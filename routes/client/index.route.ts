import { Express } from "express"
import { TourRoutes } from "./tour.route";
import { CategoryRoutes } from "./category.route";


const clientRotes = (app: Express): void => {
    app.use("/tours", TourRoutes);
    app.use("/categories", CategoryRoutes);
};
export default clientRotes;