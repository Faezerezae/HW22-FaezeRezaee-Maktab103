import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import RatingDisplay from './RatingDisplay';
import { useState } from 'react';

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
  onAddToCart: (product: IProduct) => void;
  onRemovefromCart: (product: IProduct) => void;
};

export const Product: React.FC<ProductProps> = ({ product, onAddToCart,onRemovefromCart }) => {
  const [isInCart, setIsInCart] = useState(false);


  const handleAddToCart = () => {
    onAddToCart(product);
    setIsInCart(true);
  };

  const handleRemoveFromCart = () => {
    onRemovefromCart(product)
    setIsInCart(false);
  };

  return (
    <div className="shadow text-black m-4 pb-28 rounded overflow-hidden">
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
      <div className="p-2 flex items-end justify-between">
        <div className="">
          <h1>{product.title}</h1>
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



