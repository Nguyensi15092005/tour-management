import { Router } from "express";
import * as controller from "../../controller/client/tour.controller";

const router: Router = Router();

router.get("/:slugCategory", controller.index);

router.get("/detail/:slugDetail", controller.detail);



export const TourRoutes: Router = router;