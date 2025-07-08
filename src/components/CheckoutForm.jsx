import { useState } from "react";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router";

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const pedido = {
      id: Date.now().toString().slice(-6),
      nombre,
      email,
      productos: cart,
      total: cart.reduce((acc, i) => acc + i.price * i.count, 0).toFixed(2),
      fecha: new Date().toLocaleString(),
    };

    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
    clearCart();
    navigate("/checkout/success");
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit}>
      <h5 className="mb-3">Completa tus datos para finalizar la compra:</h5>
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input type="text" className="form-control" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
      </div>
      <button type="submit" className="btn btn-primary">
        Finalizar compra
      </button>
    </form>
  );
}

export default CheckoutForm;
