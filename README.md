# Proyecto React - Actividad 1
**Asignatura:** Programación de Componentes  
**Objetivo:** Crear una aplicación React con lista de productos, comunicación entre componentes y gestión de carrito.
- ---
## Estructura del Proyecto
```
src/
	components/
	    ProductList.js <!- Componente padre ->
	    ProductItem.js <!- Componente hijo ->
	    CartSummary.js <!- Resumen del carrito ->
	data/
	    products.js <!- Datos iniciales de productos ->
	App.js <!- Puntos de integracion ->
	index.css <!- Estilos básicos ->
```
---
## Ejercicio 1
### 1. Crear un proyecto React
- Se creó el proyecto con:
  ```bash
  npx create-react-app tienda-react
  ```
- Carpeta raíz: `tienda-react/`
### 2. Diseñar componentes
- **Padre (ProductList.js):**
- Contiene la lista de productos.
- Mantiene el estado del carrito.
- Define métodos `addToCart`, `removeFromCart`, `clearCart`.
- **Hijo (ProductItem.js):**
- Renderiza cada producto individual.
- Muestra nombre, precio y botón de agregar.
- Comunica acciones al padre mediante `props`.
- **CartSummary.js:**
- Muestra el contenido del carrito.
- Permite quitar productos o vaciar el carrito.
### 3. Implementar `map()` para listar productos
- En **ProductList.js**:
```js
{products.map((product) => (
  <ProductItem
    key={product.id}
    product={product}
    onAdd={this.addToCart}
  />
))}
```
- Se recorre el array `products` definido en `src/data/products.js`.
### 4. Comunicación padre-hijo e hijo-padre
- **Padre → Hijo:**  
	Props `product` y callback `onAdd` enviados desde `ProductList` a `ProductItem`.
- **Hijo → Padre:**  
	En `ProductItem`, el botón ejecuta
```JS
<button onClick={() => onAdd(product)}>Agregar al carrito</button>
```
- Esto llama al método del padre para actualizar el carrito.
### 5. Actualizar el carrito con `state` y `this.setState({})`
- En **ProductList.js**:
```JS
this.setState((prevState) => {
  const exists = prevState.cart.find((p) => p.id === product.id);
  if (exists) {
    return {
      cart: prevState.cart.map((p) =>
        p.id === product.id ? { ...p, qty: p.qty + 1 } : p
      ),
    };
  }
  return {
    cart: [...prevState.cart, { ...product, qty: 1 }],
  };
});
```
- Se maneja el estado del carrito con **this.state.cart**.
---
### Estilos
• 	Archivo: index.css
• 	Se definieron estilos básicos para:
• 	Contenedor principal ()
• 	Grid de productos ()
• 	Tarjetas ()
• 	Botones