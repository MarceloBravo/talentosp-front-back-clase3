import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/useHttp'
import { SpinnerComponent } from '../../components/spinner/SpinnerComponent';
import { ProductCard } from '../../components/productCard/ProductCard';
import styles from './HomePage.module.css'


export const HomePage = () => {
    const { isLoading, error, data, sendRequest } = useHttp();
    const [ page, setPage ] = useState(1)
    const [ products, setProducts ] = useState([])
    const uri = `/search?query=Phone&page=${page}&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false&deals_and_discounts=NONE`

    useEffect(()=> {
        const fetchData = async () => {
            try{
                await sendRequest(uri, 'GET')
            }catch(err){
                alert(err.message)
            }
        }

        fetchData()
    },[])

    useEffect(()=>{
        if(data?.data?.products){        
            console.log(JSON.stringify(data.data.products))
            setProducts(data.data.products)
        }
    },[data])

    return (
        <>
            {isLoading && <SpinnerComponent/>}
            <div>HomePage</div>
            <div className={styles.productsGrid}>
            {products && products.map(product => 
                <ProductCard key={product.asin} {...product}/>
            )}
            </div>
        </>
    )
}