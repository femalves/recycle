import express from "express";
import { celebrate, Joi } from "celebrate";
import multer from "multer";
import multerConfig from "./config/multer";

const routes = express.Router();
const upload = multer(multerConfig);

import PointsController from "./controllers/pointsController";
import ItemsController from "./controllers/itemsController";
const pointsController = new PointsController();
const itemsController = new ItemsController();

// index
routes.get("/items", itemsController.index);
// show

routes.get("/points/:id", pointsController.show);
// update, delete
routes.get("/points", pointsController.index);

// create
routes.post(
  "/points",
  upload.single("image"),
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.number().required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().max(2),
        items: Joi.string().required(),
      }),
    },
    {
      abortEarly: false,
    }
  ),
  pointsController.create
);
export default routes;
