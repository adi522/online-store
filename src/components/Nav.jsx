import { useContext } from "react"
import { ProductContext } from "../utils/Context"
import { Link } from "react-router-dom"

function Nav() {

    const [products] = useContext(ProductContext)

    const distinct_category = products && Array.isArray(products)
        ? [...new Set(products.map(cv => cv.category).filter(Boolean))]
        : [];

    const categoryColor = () => {
        // return `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`;
        return `rgba(${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, ${(Math.random() * 255).toFixed(0)}, 0.6)`;
    };

    return (
        <nav className="w-[15%] h-screen  flex flex-col items-center p-5 bg-zinc-200 ">
            <a href="/create" className="rounded-md border-2 px-3 py-2 mb-2 border-blue-500/50 text-zinc-900 hover:border-blue-500 hover:shadow-purple-800 hover:text-zinc-700 hover:scale-105">
                Add new Product
            </a>
            <hr className="w-full border-blue-600 mb-1" />
            <h1 className="w-full text-[1.4vw] mb-4 font-semibold">Category </h1>
            <div className="w-[90%]">
                {distinct_category.map((cat, index) => (
                    <Link
                        key={index}
                        to={`/?category=${cat}`}
                        className="mb-2 flex items-center"
                    >
                        <span style={{ backgroundColor: categoryColor() }} className=" w-[16px] h-[16px]  rounded-full mr-4 items-center"></span>
                        {cat}
                    </Link>

                ))}
            </div>
        </nav>

    )
}

export default Nav
