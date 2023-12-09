import Product from "../../models/productsModel.js";
import productFindSchema from "../../schema/productFindSchema.js";

const getOnlyProduct = async (req, res) => {
  try {
    await productFindSchema.validate({
      id: req.params.id,
    });

    const date = await Product.findByPk(req.params.id).then((data) => res.json(data));

    return date;
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error: " + error);
  }
};

export default getOnlyProduct;
