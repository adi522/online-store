import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";

function Home() {
  const [products] = useContext(ProductContext);

  const { search } = useLocation()
  const category = decodeURIComponent(search.split('=')[1])

  const [filterProducts, setfilterProducts] = useState([])

  useEffect(() => {
    if (!filterProducts || category == 'undefined')
      setfilterProducts(products)
    if (category != "undefined") {
      setfilterProducts(products.filter((p) => p.category == category))
    }
  }, [category, products])

  return products && products.length > 0 ? (
    <>
      <Nav />
      <div className="h-full w-[85%] p-7 pt-20 flex flex-wrap gap-4 overflow-x-hidden overflow-y-auto">
        {filterProducts && filterProducts.length > 0 ? (
          filterProducts.map((pro) => (
            <Link
              key={pro.id}
              to={`/details/${pro.id}`}
              className="w-[18.9%] h-[35vh] border shadow rounded-lg flex flex-col justify-center items-center hover:shadow-black mb-1"
            >
              <div
                className="w-full h-[70%] bg-contain bg-center bg-no-repeat hover:scale-105 mb-3p-1"
                style={{ backgroundImage: `url(${pro.image})` }}
              ></div>
              <h1 className="text-center">{pro.title}</h1>
            </Link>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );

}

export default Home;
