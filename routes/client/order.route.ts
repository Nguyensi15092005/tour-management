import { Router } from "express";
import * as controller from "../../controller/client/order.controller";

const router: Router = Router();

router.post("/", controller.index);

router.get("/success", controller.orderSuccess);






export const OrderRoutes: Router = router;