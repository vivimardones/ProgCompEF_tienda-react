import React, { Component } from 'react';
import { products } from '../data/products';
import ProductItem from './ProductItem';
import CartSummary from './CartSummary';

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [], // {id, name, price, qty}
    };
  }

  addToCart = (product) => {
    // Actualiza con this.setState({})
    this.setState((prevState) => {
      const exists = prevState.cart.find((p) => p.id === product.id);
      if (exists) {
        // incrementa cantidad
        return {
          cart: prevState.cart.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }
      // agrega nuevo
      return {
        cart: [...prevState.cart, { ...product, qty: 1 }],
      };
    });
  };

  removeFromCart = (productId) => {
    this.setState((prevState) => {
      const found = prevState.cart.find((p) => p.id === productId);
      if (!found) return { cart: prevState.cart };
      if (found.qty > 1) {
        return {
          cart: prevState.cart.map((p) =>
            p.id === productId ? { ...p, qty: p.qty - 1 } : p
          ),
        };
      }
      return {
        cart: prevState.cart.filter((p) => p.id !== productId),
      };
    });
  };

  clearCart = () => {
    this.setState({ cart: [] });
  };

  render() {
    return (
      <div className="container">
        <h1>Productos</h1>

        {/* map() para listar productos */}
        <div className="grid">
          {products.map((product) => (
            <ProductItem
              key={product.id}          // key única
              product={product}          // props padre->hijo
              onAdd={this.addToCart}     // callback padre->hijo
            />
          ))}
        </div>

        <CartSummary
          cart={this.state.cart}
          onRemove={this.removeFromCart} // hijo->padre mediante callback
          onClear={this.clearCart}
        />
      </div>
    );
  }
}

export default ProductList;