import { useParams, useNavigate } from "react-router";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/db";

function CheckoutSuccess() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const printRef = useRef(); // Ref para imprimir solo esta sección

  useEffect(() => {
    const fetchPedido = async () => {
      try {
        const docRef = doc(db, "orders", orderId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setPedido(data);
          localStorage.setItem("ultimoPedido", JSON.stringify({ id: orderId, ...data }));
        } else {
          setPedido(null);
        }
      } catch (error) {
        console.error("Error al recuperar el pedido:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [orderId]);

  const handlePrint = () => {
    const content = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Comprobante de compra</title>
          <style>
            body { font-family: sans-serif; padding: 20px; }
            h2, h4 { margin-bottom: 10px; }
            ul { padding-left: 0; list-style: none; }
            li { margin-bottom: 8px; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Cargando pedido...</h3>
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="container mt-5 text-center">
        <h3>No se encontró la orden de compra.</h3>
      </div>
    );
  }

  const fechaFormateada =
    pedido.time && pedido.time.toDate
      ? pedido.time.toDate().toLocaleString()
      : "Fecha no disponible";

  return (
    <div className="container mt-4">
      <div ref={printRef}>
        <h2 className="mb-4">¡Gracias por tu compra, {pedido.nombre}!</h2>
        <p><strong>ID de pedido:</strong> #{orderId}</p>
        <p><strong>Fecha:</strong> {fechaFormateada}</p>
        <p><strong>Email:</strong> {pedido.email}</p>
        <p><strong>Teléfono:</strong> {pedido.telefono}</p>

        <h4 className="mt-4">Resumen de productos:</h4>
        <ul className="list-group">
          {pedido.productos.map((prod) => (
            <li key={prod.id} className="list-group-item d-flex justify-content-between">
              <span>{prod.title} x {prod.count}</span>
              <span>${(prod.price * prod.count).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <h5 className="mt-3">Total: ${pedido.total || "No disponible"}</h5>
      </div>

      {/* BOTONES */}
      <div className="mt-4 d-flex flex-wrap gap-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>
          Volver al inicio
        </button>
        <button className="btn btn-success" onClick={() => navigate("/")}>
          Seguir comprando
        </button>
        <button className="btn btn-secondary" onClick={handlePrint}>
          Imprimir comprobante
        </button>
      </div>
    </div>
  );
}

export default CheckoutSuccess;
