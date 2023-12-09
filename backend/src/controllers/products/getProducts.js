import Product from "../../models/productsModel.js";

const getProducts = async (req, res) => {
  try {
    const date = await Product.findAll().then((data) => res.json(data));

    return date;
  } catch (error) {
    console.log(error);
  }
};

export default getProducts;
