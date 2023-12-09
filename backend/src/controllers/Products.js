import Product from "../../models/productsModel.js";
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const GetProduct = async (req, res) => {
  try {
    const data = await Product.findAll().then((data) => res.json({ data }));
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

module.exports = GetProduct;
