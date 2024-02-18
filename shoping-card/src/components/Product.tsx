import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import RatingDisplay from './RatingDisplay';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, removeFromCart  } from '../redux/cartSlice';


export interface IProduct {
  count: number;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: Array<string>
  price: number;
  rating: number;
  stock: number;
  title: string;
  thumbnail: string;
}

type ProductProps = {
  product: IProduct;
};

export const Product: React.FC<ProductProps> = ({ product }) => {
 const dispatch=useDispatch()
 const cartItems = useSelector((state: any) => state.cart.cart);
 const [isInCart, setIsInCart] = useState(cartItems.some((item: IProduct) => item.id === product.id));

 useEffect(() => {
  setIsInCart(cartItems.some((item: IProduct) => item.id === product.id));
}, [cartItems, product.id]);

  const handleAddToCart = () => {
    dispatch(addtoCart(product))
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product))
    setIsInCart(false);
  };

  return (
    <div className="shadow-2xl text-black m-3 rounded overflow-hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
        modules={[Pagination]}
      >
        {product.images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt={`Image ${index + 1}`} className='w-full h-40' />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="p-2 py-4 flex items-end justify-between">
        <div className="grid gap-2">
          <h1 className='whitespace-nowrap truncate w-auto font-semibold'>{product.title}</h1>
          <p>₹  {product.price}</p>
          <p>{product.category}</p>
          <RatingDisplay rating={product.rating} />
        </div>
        {isInCart ? (
          <button className='bg-red-500 hover:bg-red-600 text-white p-2 rounded-md whitespace-nowrap' onClick={handleRemoveFromCart}>
            Remove from cart
          </button>
        ) : (
          <button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md whitespace-nowrap' onClick={handleAddToCart}>
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}



