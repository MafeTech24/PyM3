function CheckoutSuccess() {
    const ultimoPedido = JSON.parse(localStorage.getItem("ultimoPedido"));
  
    if (!ultimoPedido) {
      return (
        <div className="container mt-5 text-center">
          <h3>No hay ningún pedido reciente.</h3>
        </div>
      );
    }
  
    return (
      <div className="container mt-4">
        <h2 className="mb-4">¡Gracias por tu compra, {ultimoPedido.nombre}!</h2>
        <p><strong>ID de pedido:</strong> #{ultimoPedido.id}</p>
        <p><strong>Fecha:</strong> {ultimoPedido.fecha}</p>
        <p><strong>Email:</strong> {ultimoPedido.email}</p>
        <h4 className="mt-4">Resumen de productos:</h4>
        <ul className="list-group">
          {ultimoPedido.productos.map((prod) => (
            <li key={prod.id} className="list-group-item d-flex justify-content-between">
              <span>{prod.title} x {prod.count}</span>
              <span>${(prod.price * prod.count).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h5 className="mt-3">Total: ${ultimoPedido.total}</h5>
      </div>
    );
  }
  
  export default CheckoutSuccess;
  