import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, Grid, TextField } from "@mui/material";
import { ArrowBack, Delete } from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import AlertDelete from "./DeleteDialog";
import { alterProduct, deleteProduct } from "../../services/ProductApi";
import axios from "axios";

interface productData{
    id:number,
    name:string,
    price:string,
    description:string
}
const newProductValidationSchema =zod.object({
    id:zod.number(),
    name:zod.string().min(2, "O nome é obrigatório"),
    price: zod.string().refine((value) => !isNaN(parseFloat(value)), "O preço deve ser um número válido"),
    description:zod.string().min(3, "A descrição é obrigatória")
})
type Product = zod.infer<typeof newProductValidationSchema>;

export function InfoProduct(){
    const newProductForm = useForm<Product>({resolver: zodResolver(newProductValidationSchema)});
    const {handleSubmit,register,formState: { errors }} = newProductForm;
    const location = useLocation();
    let product:productData = location.state?.product;
    const [loding,setLoding]=useState(false);
    const navigator = useNavigate();
    const [Alert,setAlert]= useState(false);


    async function dropProduct(){
        try{   
            const response = await deleteProduct(product.id);
            if(response.status===200){
                navigator('/');
                toast.success(response.data.message);
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if (error.response?.status===500) {
                    toast.error(error.response.data.message);
                }else if (error.response?.status===400) {
                    toast.error(error.response.data.message);
                }
                
            }
        }
    }
    async function handleAlterProduct(data:productData){
        try{
            setLoding(true)
            const response = await alterProduct(data);
            if(response.status===200){
                product=data
                toast.success(response.data.message);
                setLoding(false)
            }
        }catch(error){
            if (axios.isAxiosError(error)) {
                if (error.response?.status===500) {
                    toast.error(error.response.data.message);
                }else if (error.response?.status===400) {
                    toast.error(error.response.data.message);
                }
                
            }
        }
    }


    useEffect(()=>{
        if(!product){
            navigator('/');
        }
    },[navigator,product]);
    return(
        <Box>
            <AlertDelete deleteProduct={dropProduct} onClose={() => setAlert(false)} Open={Alert}/>
            <Grid container>
                <Grid item width={'50%'}>
                    <Button size={'large'} disabled={loding} sx={{marginTop:'1.5rem'}} onClick={()=>{navigator('/')}} variant='text'><ArrowBack sx={{fontSize:'3rem'}}/></Button>
                </Grid>
                <Grid item width={'50%'} sx={{display:'flex',justifyContent:'end'}}>

                    <Button sx={{marginTop:'1.5rem'}} disabled={loding} color='error' onClick={()=>{setAlert(true)}} variant='text'><Delete sx={{fontSize:'3rem'}}/></Button>
                </Grid>
                <Grid item sx={{marginTop:'2rem'}} lg={12}>
                    <form onSubmit={handleSubmit(handleAlterProduct)}>
                    <TextField
                            defaultValue={product.id}
                            type='hidden' 
                            {...register("id", {required: true})} 
                        />
                        <TextField
                            defaultValue={product.name}
                            error={errors.name?.message?true:false}
                            helperText={errors.name?.message} 
                            type='text' 
                            sx={{width:'85%',marginRight:'5%',marginBottom:'2rem'}} 
                            variant={'outlined'} 
                            label={'Nome'}  
                            {...register("name", {required: true,valueAsNumber:true})} 
                        />
                        <TextField 
                            error={errors.price?.message?true:false}
                            defaultValue={product.price}
                            helperText={errors.price?.message} 
                            type='text' sx={{width:'10%'}} 
                            variant={'outlined'} 
                            label={'Preço'} 
                            {...register("price", {required: true})} 
                        />
                        <TextField
                            defaultValue={product.description}
                            error={errors.description?.message?true:false}
                            helperText={errors.description?.message} 
                            type='text' variant={'outlined'} 
                            sx={{marginBottom:'2rem'}} 
                            multiline maxRows={8} 
                            label={'Descrição'} 
                            fullWidth 
                            {...register("description", {required: true})} 
                        />
                        <Button size='large' color={'warning'} disabled={loding} sx={{marginBottom:'2rem'}} variant='contained' type='submit' fullWidth>{loding?'Alterando...':'Alterar Produto'}</Button>
                    </form>
                </Grid>

            </Grid>
        </Box>
    )
}