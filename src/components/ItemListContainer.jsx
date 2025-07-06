import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import ItemList from './ItemList';

function ItemListContainer() {
  const [items, setItems] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    const url = categoryName
      ? `https://fakestoreapi.com/products/category/${categoryName}`
      : 'https://fakestoreapi.com/products';

    fetch(url)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error('Error al cargar productos:', err));
  }, [categoryName]);

  return <ItemList items={items} />;
}

export default ItemListContainer;

