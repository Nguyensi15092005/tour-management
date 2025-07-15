import { Express } from "express"
import { TourRoutes } from "./tour.route";
import { CategoryRoutes } from "./category.route";
import { CartRoutes } from "./cart.route";


const clientRotes = (app: Express): void => {
    app.use("/tours", TourRoutes);
    app.use("/categories", CategoryRoutes);
    app.use("/cart", CartRoutes);


};
export default clientRotes;