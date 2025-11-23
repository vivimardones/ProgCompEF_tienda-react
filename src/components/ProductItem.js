import React from 'react';

function ProductItem({ product, onAdd }) {
  // Validaciones mínimas
  if (!product?.id || !product?.name || typeof product?.price !== 'number') {
    return <div style={{ color: 'red' }}>Producto inválido</div>;
  }

  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>Precio: ${product.price}</p>
      <button onClick={() => onAdd(product)}>Agregar al carrito</button>
    </div>
  );
}

export default ProductItem;