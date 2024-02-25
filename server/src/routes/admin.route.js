import express from "express";
import tokenMiddleware from "../middlewares/token.middleware.js";
import adminController from "../controllers/admin.controller.js";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";

const router = express.Router();

router.post(
    "/add",
    tokenMiddleware.auth,
    body("mediaId")
        .exists().withMessage("mediaId is required"),
    body("isAvailable")
        .exists().withMessage("required"),
    body("normal")
        .exists().withMessage("normal seat price is required").isLength({ min: 3}),
    body("normal")
        .exists().withMessage("executive seat price is required").isLength({ min: 3}),
    body("normal")
        .exists().withMessage("premium seat price is required").isLength({ min: 3}),
    requestHandler.validate,
    adminController.add,
)

router.delete(
    "/remove/:mediaId",
    tokenMiddleware.auth,
    adminController.remove,
)

router.get(
    "/getMovie/:mediaId",
    body("mediaId")
        .exists().withMessage("mediaId is required"),
    adminController.getMovie,
)

router.get(
    "/getPrice/:mediaId",
    body("mediaId")
        .exists().withMessage("mediaId is required"),
    adminController.getPrice,
)

export default router;