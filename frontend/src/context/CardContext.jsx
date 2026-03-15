/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { authFetch } from "../utils/auth";
const CartContext = createContext()
export const CartProvider = ({children}) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [total, setTotal] = useState(0)
    const [cartItems, setCartItems] = useState([])

    const fetchCart = async () => {
        try{
            const response = await authFetch(`${BASEURL}/api/cart`)
            const data = await response.json()
            setCartItems(data.items || []);
            setTotal(data.total || 0)
        }catch(error){
            console.log("Error in fetching cart", error) 
        }
    }
    useEffect(() => {
        fetchCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Add Product
    const addToCart = async (productid) => { 
        try{
            await authFetch(`${BASEURL}/api/cart/add/`, {
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                }, 
                body: JSON.stringify({product_id : productid}),
            })
        }catch(error){ 
            console.log("Error in add to cart", error)
        }
        fetchCart()
    }
    //Remove product
    const removeFromCart = async (itemId) => {
        try{
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({item_id : itemId}),
            })
        }catch(error){
            console.error("Error in removing from cart : ", error)
        }
        fetchCart()
    }

    // Update quantity
    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1){
            await removeFromCart(itemId)
            return
        }
        try{
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({item_id : itemId, quantity}),
            })
        }catch(error){
            console.error("Error in updating from cart : ", error)
        }
        fetchCart()
    }
    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }
    return(
        <CartContext.Provider
            value={{cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart}}>
                {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)