import express from "express";
import { _delete, find, get, post, update } from "./src/controllers/index.js";

const routes = express.Router();

routes.get("/products", get);
routes.post("/products", post);
routes.get("/products/:id", find);
routes.put("/products/:id", update);
routes.delete("/products/:id", _delete);

export { routes as default };
