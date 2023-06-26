import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const Show = async (res:Response, req:Request) => {
    try{
       const id:number = parseInt(req.params.id)
       
        const result = await Product.findOne({ where:{ id:id } })

        return res.json(result)
    }catch(error){
        res.status(500).json(error)
    }
}