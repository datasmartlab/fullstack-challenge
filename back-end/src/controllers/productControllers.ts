import { Request, Response } from 'express';
import { Product } from '../models/Product';
import { ProductSchema } from '../validations/product';

interface productData{
    id?:number
    name:string
    description:string
    price:number
}

export const getAllProduct = async (req:Request, res:Response)=>{
    try{
    const results = await Product.findAll();
    if(results.length>0){
        res.json(results);
    }else{
        res.status(202).json({message:'Não tem nenhum produto cadastrado'});
    }
    }catch(error){
        res.status(500).json({message:'Erro no servidor'});
    }
}


export const addProduct = async(req:Request, res:Response)=>{
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

export const alterProduct = async (req:Request, res:Response)=>{
    try{
        const productData:productData={
            id: parseInt(req.body.id),
            name: req.body.name,
            description:req.body.description,
            price:req.body.price
        }
        if(productData.id){
            await ProductSchema.validate(productData)
            const results = await Product.findAll({where:{id:productData.id}})
            if(results.length===1){
                const product = results[0];
                product.name = productData.name,
                product.description = productData.description;
                product.price = productData.price;
                await product.save();
                res.json({message:'O produto foi alterado com sucesso'})
            }else{
                res.json({message:'O produto com o id '+ productData.id +' não foi encontrado'});
            }
        }else{
            res.status(400).json({errors:'id é obrigatório'});
        }
    }catch(error){
        res.status(500).json({message:'Erro no servidor'})
    }
}

export const deleteProduct = async(req:Request, res:Response)=>{
    try{
        const id = parseInt(req.params.id);
        if(id){
            const result = await Product.findAll({where:{id:id}});
            if(result.length==1){
                const product = result[0];
                await product.destroy();
                res.json({message:'produto '+product.name+' foi deletado com sucesso'})
            }else{
                res.status(404).json({message:'produto não encontrado'});
            }
        }else{
            res.status(400).json({message:'ID é obrigatório'});
        }
    }catch(error){
        res.status(500).json({message:'Erro no servidor'})
    }
}