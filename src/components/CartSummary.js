import React from 'react';

function CartSummary({ cart, onRemove, onClear }) {
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {item.name} — ${item.price} x {item.qty}
                <button onClick={() => onRemove(item.id)} style={{ marginLeft: 8 }}>
                  Quitar
                </button>
              </li>
            ))}
          </ul>
          <p>Total items: {totalItems}</p>
          <p>Total precio: ${totalPrice}</p>
          <button onClick={onClear}>Vaciar carrito</button>
        </>
      )}
    </div>
  );
}

export default CartSummary;