
import { FaShoppingCart } from "react-icons/fa";
import { fetchProducts } from "../api/Products-api";
import { useQuery } from "react-query";
import { IProduct, Product } from "../components/Product";
import { SetStateAction, useEffect, useState } from "react";
import { PostSkeleton } from "../components/PostSkeleton";
import ShopingCart from "../components/ShopingCart";
import { useSelector } from "react-redux";


export interface pagination {
  data: IProduct[];
  first: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}



export default function Products() {

  const [currentPage, setCurrentPage] = useState(1);
  const [searchUser, setSearchUser] = useState("");
  const [typeSearch, setTypeSearch] = useState("title");

  const [searchClicked, setSearchClicked] = useState(false);

  const { data: Products, isLoading, isError, refetch, isSuccess } = useQuery({
    queryKey: ['Products', typeSearch, searchUser, currentPage],
    queryFn: () => fetchProducts(typeSearch, currentPage, searchUser,),
    enabled: searchClicked || !searchUser.trim(),
  })



  console.log(searchUser);

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const cartItem = useSelector((state: any) => state.cart.cart)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setSearchClicked(true);
  };

  useEffect(() => {
    if (searchClicked || !searchUser.trim()) {
      refetch();
      setSearchClicked(false);
    }
  }, [searchClicked, searchUser, refetch]);

  const [cartsVisibilty, setCartsVisible] = useState(false);

  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setTypeSearch(event.target.value);
  };

  return (
    <div className="w-full">
      <ShopingCart visibility={cartsVisibilty} onClose={() => setCartsVisible(false)} />
      <header className="bg-slate-900 h-20 w-full mb-1">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-white whitespace-nowrap text-2xl font-bold mr-5">Shopping Cart</h1>
          <form className="max-w-lg mx-auto w-full" onSubmit={handleSearchClick}>
            <div className="">
              <div className="relative flex">
                <select onChange={handleChange} value={typeSearch} className="rounded-s-lg w-28 bg-gray-50 focus:ring-0 focus:ring-black cursor-pointer" aria-label="Default select example">
                  <option className="cursor-pointer" value="title">title</option>
                  <option className="cursor-pointer" value="price">price</option>
                  <option className="cursor-pointer" value="brand">brand</option>
                  <option className="cursor-pointer" value="category">category</option>
                </select>
                <input
                  type="search"
                  id="search-dropdown"
                  className="block  w-full rounded-e-lg text-gray-900 bg-gray-50 focus:ring-0 focus:ring-black"
                  placeholder="Search a Product..."
                  onChange={(event) => setSearchUser(event.target.value)}
                  value={searchUser}
                />
                <button type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:outline-none">
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>

          <button className="bg-green-600 px-4 py-1 ml-5 rounded-md flex items-center gap-1 text-white" onClick={() => setCartsVisible(true)}>
            <FaShoppingCart />
            {cartItem.length > 0 && <span className="product-count">{cartItem.length}</span>}
          </button>
        </nav>
      </header>
      <article className="">
        <div className="overflow-y-scroll h-[720px] w-full container">
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[...Array(10)].map((_, index) => (
                <PostSkeleton key={index} />
              ))}
            </div>
          )}

          {isSuccess && (Products?.data?.length >= 1) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Products?.data?.map((el: IProduct) => (
                <Product product={el} key={el.id} />
              ))}
            </div>
          )}

          {isSuccess && Products?.data?.length === 0 && (
            <div id="no-value-search" className=" flex flex-col justify-center text-center my-10 items-center">
              <img src="35_Light_search result not found.png" alt="noot" />
              <h1 className="font-bold">Not Found</h1>
              <p className="p-2 text-sm">
                Sorry, the keyword you entered cannot be found. Please check again or search with another keyword.
              </p>
            </div>
          )}
        </div>

        {(Products?.pages > 1) && (<nav className="flex justify-center m-10">
          <ul className="pagination pagination-sm">
            {Array.from({ length: Products?.pages }, (_, index) => (
              <li className={index + 1 === currentPage ? "page-item active" : "page-item cursor-pointer"} key={index + 1} onClick={() => handlePageChange(index + 1)}>
                <span className="page-link">{index + 1}</span>
              </li>
            ))}
          </ul>
        </nav>)}

      </article>
    </div>
  )
}

