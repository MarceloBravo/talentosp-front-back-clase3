import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useHttp } from '../../../hooks/useHttp'
import { cargarImagen } from '../../../utils/images'
import imgDefault from '../../../assets/imagen_foto.png'

export const useMantenedorProductoFormPage = () => {    
    const { error, sendRequest }= useHttp()
    const inputRef = useRef()
    const [ formData, setFormData ] = useState({
        asin: '',
        currency: '',
        climate_pledge_friendly: false,
        is_amazon_choice: false,
        is_best_seller: false,
        product_num_ratings: 0,
        product_original_price: 0,
        product_photo: null,
        product_photo_file: null,
        product_price: 0,
        product_star_rating: 0,
        product_title: '',
        sales_volume: ''
    })
    const [ errorFormData, setErrorFormData ] = useState({
        asin: '',
        currency: '',
        product_num_ratings: '',
        product_original_price: '',
        product_photo: '',
        product_price: '',
        product_star_rating: '',
        product_title: '',
        sales_volume: ''
    })
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id

    useEffect(()=> {
        if(id){
            const cargarProducto = async () => {
                try{
                    const response = await sendRequest('/api/productos/' + id)
                    const urlFoto = await cargarImagen(response.data.product_photo)
                    response.data.product_photo = urlFoto;
                    setFormData({
                        ...response.data,
                        climate_pledge_friendly: Boolean(response.data.climate_pledge_friendly),
                        is_amazon_choice: Boolean(response.data.is_amazon_choice),
                        is_best_seller: Boolean(response.data.is_best_seller)
                    })
                }catch(error){
                    alert('Ocurrió un error al cargar el producto')
                }
            }
            cargarProducto()
        }
        // eslint-disable-next-line
    },[id])


    useEffect(() => {
        if(error){
            alert(error)
        }
    },[error])


    const handleInputChange = (e) => {
        setErrorFormData({
            ...errorFormData,
            [e.target.name]: e.target.value.length === 0 ? 'El campo no puede estar vacío' : ''
        })

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCheckboxChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.checked ? true : false
        })
    }

    const handleInputNumberChange = (e) => {
        setErrorFormData({
            ...errorFormData,
            [e.target.name]: e.target.value.length === 0 ? 'El campo no puede estar vacío' : ''
        })

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleCancelarClick = () => {
        navigate('/mantenedor')
    }

    const handleGrabarClick = async () => {
        if(!validaDatos()){
            alert('Los datos ingresados no son válidos o están incompletos');
            return;
        }
        if(!window.confirm('¿Está seguro de guardar los datos?')){
            return;
        }
        if(id){
            await handleActualizar()
        }else{
            await handleGrabarNuevo()
        }
    }

    const handleGrabarNuevo = async () => {
        try{
            const fd = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'product_photo_file' && formData[key]) {
                    fd.append('product_photo', formData[key])
                } else if (key !== 'product_photo' && key !== 'product_photo_file') {
                    if (['climate_pledge_friendly', 'is_amazon_choice', 'is_best_seller'].includes(key)) {
                        fd.append(key, formData[key] ? "true" : "false");
                    } else {
                        fd.append(key, formData[key])
                    }
                }
            })
            const response = await sendRequest('/api/productos', 'POST', fd)
            console.log(response)
            alert('Producto guardado correctamente')
            navigate('/mantenedor')
        }catch(error){
            alert('Ocurrió un error al guardar el producto')
        }
    }

    const handleActualizar = async () => {
        try{
            const fd = new FormData()
            Object.keys(formData).forEach(key => {
                if (key === 'product_photo_file' && formData[key]) {
                    fd.append('product_photo', formData[key])
                } else if (key !== 'product_photo' && key !== 'product_photo_file') {
                    if (['climate_pledge_friendly', 'is_amazon_choice', 'is_best_seller'].includes(key)) {
                        fd.append(key, formData[key] ? "true" : "false");
                    } else {
                        fd.append(key, formData[key])
                    }
                }
            })
            await sendRequest('/api/productos/' + id, 'PUT', fd)
            alert('Producto actualizado correctamente')
            navigate('/mantenedor')
        }catch(error){
            alert('Ocurrió un error al actualizar el producto')
        }
    }
    
    const handlerEliminarClick = async () => {
        if(!window.confirm('¿Está seguro de eliminar el producto?')){
            return
        }

        try{
            await sendRequest('/api/productos/' + id, 'DELETE')
            alert('Producto eliminado correctamente')
            navigate('/mantenedor')
        }catch(error){
            alert('Ocurrió un error al eliminar el producto')
        }
    }

    const validaDatos = () => {
        const {
            asin,
            currency,
            product_num_ratings,
            product_original_price,
            product_price,
            product_star_rating,
            product_title,
            sales_volume
        } = formData;
    
        if (
            !asin || asin.trim() === '' ||
            !currency || currency.trim() === '' ||
            !product_title || product_title.trim() === '' ||
            !sales_volume || sales_volume.trim() === '' ||
            product_num_ratings === null || String(product_num_ratings).trim() === '' ||
            product_original_price === null || String(product_original_price).trim() === '' ||
            product_price === null || String(product_price).trim() === '' ||
            product_star_rating === null || String(product_star_rating).trim() === ''
        ) {
            return false;
        }
    
        return true;
    }


    const handleCargarImagenClick = () => {
        inputRef.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.type !== 'image/png') {
                alert('Solo se permiten imágenes PNG')
                return
            }
            const reader = new FileReader()
            reader.onload = () => {
                setFormData({
                    ...formData,
                    product_photo: reader.result,
                    product_photo_file: file
                })
            }
            reader.readAsDataURL(file)
        }
    }



  return {
    id,
    formData,
    errorFormData,
    handleInputChange,
    handleCheckboxChange,
    handleInputNumberChange,
    handleCancelarClick,
    handleGrabarClick,
    handleCargarImagenClick,
    handleFileChange,
    handlerEliminarClick,
    imgDefault,
    inputRef
  }
}