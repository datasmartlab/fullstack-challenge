import  { Typography, List, ListItemButton, Button, Box } from '@mui/material'
import { useState, useEffect, useCallback } from 'react'
import { getAllProducts } from '../../services/ProductApi';
import { useNavigate } from 'react-router-dom'

interface productData{
    id:number,
    name:string,
    description:string,
    price:number
}
export function Home(){
    const navigator = useNavigate();
    const [results,setResults]=useState<productData[]>([]);
    
    const getProducts=useCallback(async()=>{
        const reponse = (await getAllProducts()).data;
        setResults(reponse);
    },[]);

    useEffect(()=>{
        getProducts();
    },[getProducts])
    return(
        <>
            <List>
                <Typography sx={{fontSize:'4rem',textAlign:'center'}}>Lista De Produtos</Typography>
                {results.map((item)=>{
                    return(
                        <ListItemButton key={item.id} onClick={()=>{navigator('/infoProduct',{state:{product:item}})}}>  <Typography fontSize={'2rem'}>Nome: {item.name} / price: {item.price} desc:{item.description}</Typography> </ListItemButton>
                    )
                })}
            </List>
            <Box sx={{height:'100%'}}>
                <Button size='large' variant='contained' sx={{alignItems:'flex-end'}} fullWidth onClick={()=>{navigator('/addProduct')}}>Adicionar Produto</Button>
            </Box>
        </>
    )
}