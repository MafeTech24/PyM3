import { FaShoppingCart } from 'react-icons/fa';

function CartWidget() {
  return (
    <div className="carrito">
        <a href="carrito">
            <FaShoppingCart size={24} />
            <span className="cant-prod">3
            <span className="visually-hidden">productos en el carrito
            </span>
            </span>
        </a>
    </div>
  );
}

export default CartWidget;