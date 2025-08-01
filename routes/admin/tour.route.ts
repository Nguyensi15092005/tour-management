import { Router } from "express";
import multer from "multer";

const router: Router = Router();

import * as controller from "../../controller/admin/tour.controller";
import * as uploadCloud from "../../middlewares/admin/uploadClou.middleware";
const upload = multer();

router.get("/", controller.index);

router.get("/create", controller.create);
router.post(
    "/create",
    upload.fields([
        { name: 'images', maxCount: 10 }
    ]), 
    uploadCloud.uploadFields,
    controller.createPost
);



export const tourRoutes: Router = router;