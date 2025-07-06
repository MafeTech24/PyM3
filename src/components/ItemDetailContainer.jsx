import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

function ItemDetailContainer() {
  const { id } = useParams();
  const [producto, setProducto] = useState();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProducto(data))
      .catch(err => console.error('Error al cargar producto:', err));
  }, [id]);

   if (!producto) {
    return <p className="text-center mt-5">Cargando producto...</p>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-5">
          <img src={producto.image} alt={producto.title} className="img-fluid" />
        </div>
        <div className="col-md-7">
          <h2>{producto.title}</h2>
          <p>{producto.description}</p>
          <h4 className="text-success">${producto.price}</h4>
          <p><strong>Categoría:</strong> {producto.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailContainer;