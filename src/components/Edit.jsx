import { useContext, useEffect, useState } from "react";
import { ProductContext } from '../utils/Context';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

function Edit() {
    const navigate = useNavigate()
    const [products, setProducts] = useContext(ProductContext);
    const { id } = useParams()
    const [product, setProduct] = useState({
        title: '',
        category: '',
        price: '',
        image: '',
        description: ''
    })

    const onChangeHandler = (e) => {
        // console.log(e.target.name, e.target.value);
        setProduct({ ...product, [e.target.name]: e.target.value })

    }

    const changeProductHandler = (e) => {
        e.preventDefault();

        if (!product.title || !product.image || !product.category || !product.price || !product.description) {
            setError("All fields are required.");
            return;
        }

        const productIndex = products.findIndex((p) => p.id == id)
        const copyData = [...products]
        copyData[productIndex] = { ...products[productIndex], ...product }

        setProducts(copyData)
        localStorage.setItem("products", JSON.stringify(copyData))
        navigate('/')
        toast.success("Product edited successfully.")

    };

    useEffect(() => {
        setProduct(products.filter((p) => p.id == id)[0])

    }, [id])


    return (
        <form
            onSubmit={changeProductHandler}
            className="p-[7%] w-screen h-screen flex flex-col items-center">
            <h1 className="text-3xl mb-5 font-semibold w-1/2">Edit Product</h1>


            <input
                type="url"
                placeholder="image url (http://.....)"
                className="w-1/2 text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
                name="image"
                onChange={onChangeHandler}
                value={product && product.image}
            />

            <input
                type="text"
                placeholder="title"
                className="w-1/2 text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
                name="title"
                onChange={onChangeHandler}
                value={product && product.title}
            />

            <div className="w-1/2 flex justify-between">
                <input
                    type="text"
                    placeholder="category"
                    className="w-[48%] text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
                    name="category"
                    onChange={onChangeHandler}
                    value={product && product.category}
                />

                <input
                    type="number"
                    placeholder="price"
                    className="w-[48%] text-2xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
                    name="price"
                    onChange={onChangeHandler}
                    value={product && product.price}
                />
            </div>

            <textarea
                rows="10"
                placeholder="description"
                className="w-1/2 text-2xl rounded-sm p-1 bg-zinc-100 outline-blue-300 mb-3"
                name="description"
                onChange={onChangeHandler}
                value={product && product.description}
            ></textarea>

            <button className="rounded-md border-2 px-3 py-2 mb-2 border-blue-500/50 text-zinc-500 hover:border-blue-500 hover:shadow-purple-800 hover:text-zinc-900 hover:scale-105">
                Save
            </button>
        </form>
    );
}

export default Edit
