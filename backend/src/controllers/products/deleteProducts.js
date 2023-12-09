import Product from "../../models/productsModel.js";
import productDeleteSchema from "../../schema/productDeleteSchema.js";

const DeleteProduct = async (req, res) => {
  try {
    await productDeleteSchema.validate({
      id: req.params.id,
    });

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).send("Operação realizada com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error: " + error);
  }
};

export default DeleteProduct;
