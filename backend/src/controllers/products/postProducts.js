import Product from "../../models/productsModel.js";
import productPostSchema from "../../schema/productPostSchema.js";
const postProduct = async (req, res) => {
  try {
    const data = await req.body;

    await productPostSchema.validate({
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    });

    await Product.create({
      nome: data.nome,
      preco: data.preco,
      descricao: data.descricao,
    });

    return res.status(200).send("cadastro efetuado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error: " + error);
  }
};

export default postProduct;
