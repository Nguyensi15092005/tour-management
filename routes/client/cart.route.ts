import { Router } from "express";
import * as controller from "../../controller/client/cart.controller";

const router: Router = Router();

router.get("/", controller.index);

router.post("/list-json", controller.listJson);


export const CartRoutes: Router = router;