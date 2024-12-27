import { useContext, useState } from "react";
import { ProductContext } from '../utils/Context';
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Create() {
  const navigate = useNavigate()
  const [products, setProducts] = useContext(ProductContext);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const AddProductHandler = (e) => {
    e.preventDefault();

    if (!title || !image || !category || !price || !description) {
      setError("All fields are required.");
      return;
    }

    setError('');
    const Product = { id: nanoid(), image, title, category, price: Number(price), description };

    setProducts([...products, Product]);
    localStorage.setItem("products", JSON.stringify([...products, Product]))
    navigate('/')
    toast.success("Product added successfully.")

  };

  return (
    <form
      onSubmit={AddProductHandler}
      className="p-[7%] w-screen h-screen flex flex-col items-center">
      <h1 className="text-3xl mb-5 font-semibold w-1/2">Add new Product</h1>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <input
        type="url"
        placeholder="image url (http://.....)"
        className="w-1/2 text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
        onChange={(e) => setImage(e.target.value)}
        value={image}
      />

      <input
        type="text"
        placeholder="title"
        className="w-1/2 text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <div className="w-1/2 flex justify-between">
        <input
          type="text"
          placeholder="category"
          className="w-[48%] text-1xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <input
          type="number"
          placeholder="price"
          className="w-[48%] text-2xl rounded-sm p-1 bg-zinc-100 outline-blue-500 mb-3"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
        />
      </div>

      <textarea
        rows="10"
        placeholder="description"
        className="w-1/2 text-2xl rounded-sm p-1 bg-zinc-100 outline-blue-300 mb-3"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      ></textarea>

      <button className="rounded-md border-2 px-3 py-2 mb-2 border-blue-500/50 text-zinc-900 hover:border-blue-500 hover:shadow-purple-800 hover:text-zinc-700 hover:scale-105">
        Add new Product
      </button>
    </form>
  );
}

export default Create;  