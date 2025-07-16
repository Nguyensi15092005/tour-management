import { Router } from "express";
import * as controller from "../../controller/client/order.controller";

const router: Router = Router();

router.post("/", controller.index);




export const OrderRoutes: Router = router;