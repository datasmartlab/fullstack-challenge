import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export const Delete = async(req:Request, res:Response)=>{
    try{
        const id = parseInt(req.params.id);
        if(id){
            const result = await Product.findOne({where:{id:id}});
            if(result){
                const product = result;
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