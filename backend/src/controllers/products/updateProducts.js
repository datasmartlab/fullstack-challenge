import Product from "../../models/productsModel.js";
import productPutSchema from "../../schema/productPutSchema.js";

const getUpdateProduct = async (req, res) => {
  try {
    const data = await req.body;

    await productPutSchema.validate({
      id: req.params.id,
      nome: req.body.nome,
      preco: req.body.preco,
      descricao: req.body.descricao,
    });

    await Product.update(
      {
        nome: data.nome,
        preco: data.preco,
        descricao: data.descricao,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    return res.status(200).send("atualização efetuado com sucesso!");
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error: " + error);
  }
};

export default getUpdateProduct;
