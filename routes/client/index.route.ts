import { Express } from "express"
import { TourRoutes } from "./tour.route";
const clientRotes = (app: Express): void => {
    app.use("/tours", TourRoutes);
};
export default clientRotes;