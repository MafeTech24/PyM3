import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const handleRestar = () => setCount(count - 1);
  const handleSumar = () => setCount(count + 1);

  return (
    <div style={{ display: 'flex', flexDirection: "column", gap: 10 }}>
      <p style={{ border: 'solid white 1px', padding: 10, borderRadius: 5 }}>
        {count}
      </p>
      <div style={{ display: 'flex', gap: 10}}>
        <button className='bg-red-600 w-20 rounded' onClick={handleRestar}>-</button>
        <button className='bg-green-600 w-20 rounded' onClick={handleSumar}>+</button>
      </div>
    </div>
  );
}

export default Counter;
