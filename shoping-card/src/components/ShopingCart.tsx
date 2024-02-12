import { AiFillCloseCircle } from 'react-icons/ai';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IProduct } from './Product';

interface Props {
  visibility: boolean;
  products: IProduct[];
  onProductRemove: (product: IProduct) => void;
  onClose: () => void;
  onQuantityChange: (productId: number, count: number) => void;
}


export default function ShopingCart({ visibility, products, onProductRemove, onClose, onQuantityChange }: Props) {
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
          {products.length === 0 && (
            <span className='block p-8 m-auto'>Your basket is currently empty</span>
          )}

          {products.map(product => (
            <div className="card-product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} className='w-28 h-28 bg-[#fff] rounded-md' />
              <div className='product-info'>
                <h3 className='font-normal text-lg'>{product.title}</h3>
                <span className='"product-price"'>{product.price * product.count} $</span>
              </div>
              <select className='count' value={product.count} onChange={(event: any) => {
                onQuantityChange(product.id, event.target.value)
              }}>
                {
                  [...Array(10).keys(),].map(number => {
                    const num = number + 1;
                    return <option value={num} key={num}>{num}</option>
                  })
                }
              </select>
              <button className='btn remove-btn' onClick={() => {
                onProductRemove(product)
              }}>
                <RiDeleteBin6Line size={20} className='text-red-600'/>
              </button>
            </div>
          ))}
          {products.length > 0 && (
            <button className='btn checkout-btn'>Proceed to checkout</button>
          )}
        </div>
      </div>

    </div>
  )
}
