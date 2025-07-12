import { Router } from "express";
import * as controller from "../../controller/client/tour.controller";

const router: Router = Router();

router.get("/", controller.index);

export const TourRoutes: Router = router;