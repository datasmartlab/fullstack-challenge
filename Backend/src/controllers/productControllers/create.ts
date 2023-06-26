import { Request, Response } from 'express';
import { Product } from '../../models/Product';
import { ProductSchema } from '../../validations/product';

interface productData{
    id?:number
    name:string
    description:string
    price:number
}

export const Create = async(req:Request, res:Response)=>{
    try{
        const productData:productData={
            name: req.body.name,
            description:req.body.description,
            price:req.body.price
        }
        await ProductSchema.validate(productData);
        const result = await Product.findAll({where:{name:productData.name}})
        if(result.length <1){
            const product = Product.build({
                name:productData.name,
                description:productData.description,
                price:productData.price
            });
            product.save();
            res.status(201).json({message:'Produto foi cadastrado com sucesso'});
        }else{
            res.status(409).json({message:'O produto com o nome '+productData.name+' ja foi cadastrado'});
        }
    }catch(error){
        res.status(400).json(error);
    }
}