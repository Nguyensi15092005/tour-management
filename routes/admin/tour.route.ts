import { Router } from "express";

const router: Router = Router();

import * as controller from "../../controller/admin/tour.controller";

router.get("/", controller.index);

export const tourRoutes: Router = router;