import { useCart } from "../context/useCart";
import { Link } from "react-router"; 

function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Tu carrito está vacío 😕</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu carrito</h2>
      {cart.map((item) => (
        <div
          key={item.id}
          className="d-flex align-items-center border-bottom mb-3 pb-3"
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ width: "80px", height: "auto", marginRight: "20px" }}
          />
          <div style={{ flex: 1 }}>
            <h5>{item.title}</h5>
            <div className="mb-2 d-flex align-items-center">
  <button
    className="btn btn-outline-secondary btn-sm me-2"
    onClick={() => updateQuantity(item.id, item.count - 1)}
    disabled={item.count <= 1}
  >
    -
  </button>
  <span>{item.count}</span>
  <button
    className="btn btn-outline-secondary btn-sm ms-2"
    onClick={() => updateQuantity(item.id, item.count + 1)}
  >
    +
  </button>
</div>

            <p className="mb-1">Precio unitario: ${item.price}</p>
            <p className="fw-bold">
              Subtotal: ${item.price * item.count}
            </p>
          </div>
          <button
            className="btn btn-danger"
            onClick={() => removeFromCart(item.id)}
          >
            Eliminar
          </button>
        </div>
      ))}

        <div className="text-end mt-4">
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-danger mt-2 me-2" onClick={clearCart}>
            Vaciar carrito
          </button>
          <Link to="/" className="btn btn-success mt-2">
            Seguir comprando
          </Link>
        </div>

    </div>
    
  );
}

export default Cart;



/*import { useCart } from "../context/useCart";
import { Link } from "react-router";

function Cart() {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Tu carrito está vacío 😕</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Volver al catálogo
        </Link>
      </div>
    );
  }

  const total = cart.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tu carrito</h2>
      {cart.map((item) => (
  <div
    key={item.id}
    className="d-flex align-items-center border-bottom mb-3 pb-3"
  >
    <img
      src={item.image}
      alt={item.title}
      style={{ width: "80px", height: "auto", marginRight: "20px" }}
    />
    <div style={{ flex: 1 }}>
      <h5>{item.title}</h5>
      <p className="mb-1">Cantidad: {item.count}</p>
      <p className="mb-1">Precio unitario: ${item.price}</p>
      <p className="fw-bold">
        Subtotal: ${item.price * item.count}
      </p>
    </div>
    <button
      className="btn btn-danger"
      onClick={() => removeFromCart(item.id)}
    >
      Eliminar
    </button>
  </div>
))}

      <div className="text-end mt-4">
        <h4>Total: ${total.toFixed(2)}</h4>
        <Link to="/" className="btn btn-success mt-2">
          Seguir comprando
        </Link>
      </div>
    </div>
  );
}

export default Cart;*/















