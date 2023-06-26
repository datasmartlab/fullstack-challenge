import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const Read = async (req:Request, res:Response)=>{
    try{
        const results = await Product.findAll();
        res.json(results);
    }catch(error){
        res.status(500).json({message:'Erro no servidor'});
    }
}
