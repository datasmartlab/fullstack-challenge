import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { ProductSchema } from '../../validations/product';

interface productData{
    id?:number
    name:string
    description:string
    price:number
}

export const Update = async (req:Request, res:Response)=>{
    try{
        const productData:productData={
            id: parseInt(req.params.id),
            name: req.body.name,
            description:req.body.description,
            price:req.body.price
        }
        if(productData.id){
            await ProductSchema.validate(productData)

                await Product.update(productData,{ where:{ id: productData.id } });
                res.json({message:'O produto foi alterado com sucesso'})
        }else{
            res.status(400).json({errors:'id é obrigatório'});
        }
    }catch(error){
        res.status(500).json({message:'Erro no servidor'})
    }
}