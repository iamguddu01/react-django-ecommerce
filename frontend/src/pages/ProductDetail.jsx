import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CardContext";

function ProductDetail() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const {id} = useParams()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {addToCart} = useCart()

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}`)
        .then((resp) => {
            if(!resp.ok){
                throw new Error("Failed to load product details")
            }
            return resp.json()
        })
        .then((data) => {
            setProduct(data)
            setLoading(false)
        })
        .catch((err) => {
            setError(err.message)
            setLoading(false)
        })
    }, [id, BASEURL])

    if (loading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">Error: {error}</p>;

    const handleAddToCart = () => {
        if(!localStorage.getItem('access_token')){
            window.location.href = '/login';
            return
        }
        addToCart(product.id)
    }

    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-center py-10">
            <div className="bg-white rounded-xl shadow-md p-6 max-w-3xl w-full">
                <div className="flex flex-col md:flex-row gap-8">
                    <img src={`${product.image}`} alt={product.name} 
                    className="w-full md:w-1/2 h-auto object-cover rounded-lg"/>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <p className="text-2xl font-semibold text-green-600 mb-6">{product.price}</p>
                        <div className="flex gap-4">
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleAddToCart}>Add to cart 🛒</button>
                            <Link to="/" className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition flex items-center">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
