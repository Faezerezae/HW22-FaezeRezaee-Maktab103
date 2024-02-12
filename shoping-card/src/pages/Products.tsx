
import { FaShoppingCart } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { FaRegStar } from "react-icons/fa6";
import { fetchProducts } from "../api/Products-api";
import { useQuery } from "react-query";
import { IProduct, Product } from "../components/Product";
import { SetStateAction, useEffect, useState } from "react";
import { PostSkeleton } from "../components/PostSkeleton";
import ShopingCart from "../components/ShopingCart";


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
  const [searchUser, setSearchUser] = useState("")
  const { data: Products, isLoading, isError } = useQuery({
    queryKey: ['Products', currentPage],
    queryFn: () => fetchProducts(currentPage, searchUser),
  })


  console.log(Products);
  console.log(searchUser);
  // const {data,pages}=Products as pagination

  if (isError) {
    return <div>Error occurred while fetching data</div>;
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchUser = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSearchUser(event.target.value);
  };

  const [cartsVisibilty, setCartsVisible] = useState(false);
  const storedCart = localStorage.getItem("shoping-cart");
const initialCart = storedCart ? JSON.parse(storedCart) : [];
const [productsInCart, setProducts] = useState<IProduct[]>(initialCart);

  useEffect(()=>{
localStorage.setItem("shoping-cart",JSON.stringify(productsInCart))
  },[productsInCart])


  const addProductToCard = (product: IProduct) => {
    const newProduct = {...product,count: 1}
    setProducts([...productsInCart,newProduct])
  }


  const onQuantityChange=(productId: number,count: any)=>{
    setProducts((oldState)=>{
      const productIndex=oldState.findIndex((item)=>item.id === productId);
      if (productIndex !== -1) {
        oldState[productIndex].count=count;
      }
      return [...oldState]
    })
  }

  const onProductRemove=(product:IProduct)=>{
    setProducts((oldState)=>{
      const productIndex=oldState.findIndex((item)=>item.id === product.id);
      if (productIndex !== -1) {
       oldState.splice(productIndex,1)
      }
      return [...oldState]
    })
  }

  return (
    <div className="w-full">
      <ShopingCart visibility={cartsVisibilty} products={productsInCart} onClose={() => setCartsVisible(false)}  onQuantityChange={onQuantityChange} onProductRemove={onProductRemove}/>
      <header className="bg-slate-900 h-16 w-full mb-1">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-white whitespace-nowrap text-2xl font-bold">Shopping Cart</h1>
          <input
            className="outline-none rounded-md p-1 text-sm w-full lg:mx-32 mx-4"
            type="text" placeholder="Search a Product..."
            value={searchUser}
            onChange={handleSearchUser}
          />
          <button className="bg-green-600 px-4 py-1 rounded-md flex items-center gap-1 text-white" onClick={() => setCartsVisible(true)}>
            <FaShoppingCart />
            {productsInCart.length > 0 && <span className="product-count">{productsInCart.length}</span>}{/*  */}
          </button>
        </nav>
      </header>
      <main className="flex text-white text-sm">
        <aside className="bg-slate-900 h-[400px] w-44 grid items-center p-2 rounded">
          <h1 className="font-bold">Filter Products</h1>
          <div className="flex items-center gap-2">
            <input type="radio" id="Ascending" />
            <label htmlFor="Ascending">Ascending</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" id="Descending" />
            <label htmlFor="Descending">Descending</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="IncludeOutOfStock" />
            <label htmlFor="IncludeOutOfStock">Include Out of Stock</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="FastDeliveryOnly" />
            <label htmlFor="FastDeliveryOnly">Fast Delivery Only</label>
          </div>
          <div className="flex items-center gap-2">
            <label>Rating: </label>
            <div className="flex ">
              <FaRegStar />
              <IoIosStar />
              <FaRegStar />
              <IoIosStar />
            </div>
          </div>
          <button className="w-full h-10 bg-white text-slate-900 text-center rounded-md font-bold">Clear Filter</button>
        </aside>



        <article className="">

          <div className="overflow-y-scroll h-[400px] w-full ">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
                <PostSkeleton />
              </div>
            ) :
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {Products?.data?.map((el: IProduct) => (
                  <Product product={el} key={el.id} onAddToCart={addProductToCard} onRemovefromCart={onProductRemove} />

                ))}
                {/* {hasNextPage && <div  ref={ref} >Loading ...</div>} */}
              </div>
            }
          </div>

          <nav className="flex justify-center m-10">
            <ul className="pagination pagination-sm">
              {Array.from({ length: Products?.pages }, (_, index) => (
                <li className={index + 1 === currentPage ? "page-item active" : "page-item cursor-pointer"} key={index + 1} onClick={() => handlePageChange(index + 1)}>
                  <span className="page-link">{index + 1}</span>
                </li>
              ))}
            </ul>
          </nav>

        </article>

      </main>
    </div>
  )
}

