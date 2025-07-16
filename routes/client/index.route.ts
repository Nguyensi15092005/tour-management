import { Express } from "express"
import { TourRoutes } from "./tour.route";
import { CategoryRoutes } from "./category.route";
import { CartRoutes } from "./cart.route";
import { OrderRoutes } from "./order.route";


const clientRotes = (app: Express): void => {
    app.use("/tours", TourRoutes);
    app.use("/categories", CategoryRoutes);
    app.use("/cart", CartRoutes);
    app.use("/order", OrderRoutes);

    


};
export default clientRotes;