import express from "express";
import routers from "./routes.js";
import cors from "cors";
import db from "./src/db.js";

const app = express();

app.use(cors({ origin: "*", methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.use(express.json());
app.use(routers);

db.sync(() => console.log(`Banco de dados conectado: ${process.env.DB_NAME}`));

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
