import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IProduct } from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateNum } from '../redux/cartSlice';
import { useEffect, useState } from 'react';

interface Props {
  visibility: boolean;
  onClose: () => void;
}


export default function ShopingCart({ visibility, onClose }: Props) {
  const cartItems = useSelector((state: any) => state.cart.cart)
  console.log(cartItems[0]);
  const dispatch = useDispatch()
  const initialCount = Number(localStorage.getItem('count')) || 1;
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    localStorage.setItem('count', count.toString());
  }, [count]);

  return (
    <div className='modal' style={{ display: visibility ? "block" : "none" }}>
      <div className="shoppingCart">
        <div className='flex bg-[#ccc] py-3 px-3 justify-between items-center'>
          <h2 className='font-bold text-xl'>Shoping Cart</h2>
          <button className='btn close-btn' onClick={onClose}>
            <AiFillCloseCircle size={30} />
          </button>
        </div>
        <div className='cart-products'>
          {cartItems.length === 0 && (
            <span className='block p-8 m-auto'>Your basket is currently empty</span>
          )}

          {cartItems.map((cartItem: IProduct) => (
            <div className="card-product" key={cartItem.id}>
              <img src={cartItem.thumbnail} alt={cartItem.title} className='w-28 h-28 bg-[#fff] rounded-md' />
              <div className='product-info'>
                <h3 className='font-normal text-lg'>{cartItem.title}</h3>
                <span className='"product-price"'>{cartItem.price * count} $</span>
              </div>
              <select value={count} onChange={(event) => {
                const selectedNum = parseInt(event.target.value, 10);
                setCount(selectedNum);
                dispatch(updateNum(selectedNum));
              }}>
                {
                  [...Array(10).keys(),].map(number => {
                    const optionNum = number + 1; 
                    return <option value={optionNum} key={optionNum}>{optionNum}</option>;
                  })
                }
              </select>
              <button className='btn remove-btn' onClick={() => {
                dispatch(removeFromCart(cartItem));
              }}>
                <RiDeleteBin6Line size={20} className='text-red-600' />
              </button>
            </div>
          ))}
          {cartItems.length > 0 && (
            <button className='btn checkout-btn'>Proceed to checkout</button>
          )}
        </div>
      </div>

    </div>
  )
}
