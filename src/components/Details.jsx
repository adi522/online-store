import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from 'react-toastify';

function Details() {
  const navigate = useNavigate()
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useContext(ProductContext);
  const { id } = useParams();


  useEffect(() => {
    if (!product) {
      setProduct(products.filter((p) => p.id == id)[0]);
    }
  }, [products, product, id])


  const productDeleteHandler = (id) => {
    const filterProduct = products.filter((p) => p.id !== id);
    setProducts(filterProduct)
    localStorage.setItem("products", JSON.stringify(filterProduct))
    toast.success("Product deleted successfully.")
    navigate('/')
  }

  return product ? (
    <div className="w-[80%] h-full m-auto flex items-center p-[10%] ">
      <img
        className="w-[40%] object-contain ml-10 hover:scale-105 mr-12"
        src={`${product.image}`}
        alt=""
      />

      <div className="p-3">
        <h1 className="text-4xl font-semibold mb-2">{product.title}</h1>
        <h1 className="mb-2">
          Category: <span className="font-semibold capitalize">{product.category}</span>
        </h1>
        <h1 className="mb-2">Price: ${product.price}</h1>
        <p className="mb-4">Description: {product.description}</p>
        <Link to={`/edit/${product.id}`} className="rounded-lg border-2 px-3 py-2 mb-2 text-blue-500 mr-7">
          Edit
        </Link>
        <button onClick={() => productDeleteHandler(id)} className="rounded-lg border-2 px-3 py-2 mb-2 text-red-500">
          Delete
        </button>
      </div>
    </div>
  ) : (
    <Loading />
  );
}

export default Details;


