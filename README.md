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

# Proyecto React - Actividad 2
**Asignatura:** Programación de Componentes  
**Objetivo:** Crear un formulario en React con validaciones, conectado a Firebase y que guarde datos en Firestore.
- ---
## Estructura del Proyecto
```
src/
	components/
	    UserForm.js  <!- Formulario con validaciones y conexión a Firestore>
	firebase.js      <!- Configuración de Firebase y Firestore ->
	App.js           <!- Integración del formulario en la aplicación ->
```
---
## Ejercicio 2

### 1. Crear un formulario con React
- Archivo: **src/components/UserForm.js**
- Se creó un formulario con campos:
  - `name` (texto, solo letras)
  - `email` (correo electrónico)
- Se maneja el estado con `useState`.
---
### 2. Configurar `react-simple-validator` para validaciones
- Instalación:
```bash
npm install simple-react-validator
```
- Uso en **UserForm.js**:
```js
const [validator] = useState(new SimpleReactValidator());
```
- Reglas aplicadas:
    - `required|alpha` → nombre obligatorio y solo letras.
    - `required|email` → email obligatorio y con formato válido.
---
### 3. Conectar la aplicación a Firebase
- Archivo: **src/firebase.js**
- Configuración con SDK modular v9:
*Revisar archivo firebase.js*
- Se exporta `db` para usarlo en los componentes.
---
### 4. Guardar los datos del formulario en Firestore Database
- En **UserForm.js** se usa el SDK modular:
```Js
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

await addDoc(collection(db, "users"), {
  name: form.name,
  email: form.email
});
```
- Esto crea un documento dentro de la colección `users`.
- Si la colección no existe, Firestore la crea automáticamente.
### Consideraciones
- **Reglas de Firestore:**  
    Para pruebas se configuraron reglas abiertas:
allow read, write: if true;
- En producción se recomienda restringir con autenticación:
allow read, write: if request.auth != null;
- **Errores comunes:**
- `Missing or insufficient permissions` → se soluciona ajustando reglas de seguridad.
### Conclusión
En la **Actividad 2** se implementó:
- Un formulario en React con validaciones.
- Uso de `react-simple-validator` para reglas de entrada.
- Conexión a Firebase con SDK modular v9.
- Inserción de datos en Firestore dentro de la colección `users`.