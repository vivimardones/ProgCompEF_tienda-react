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

## Exportar proyecto Cordova a APK/AAB

Este documento describe el flujo completo para **compilar, firmar y preparar** una aplicación Cordova en Android, generando tanto el **App Bundle (.aab)** como el **APK firmado** para pruebas locales.
- ---
### Requisitos previos
- **Node.js** y **Cordova CLI** instalados
- **Android Studio** con SDK configurado
- Variables de entorno en Windows:
  - `ANDROID_HOME` → `C:\Users\<usuario>\AppData\Local\Android\Sdk`
  - `PATH` incluye:
    - `%ANDROID_HOME%\platform-tools`
    - `%ANDROID_HOME%\tools`
    - `%ANDROID_HOME%\tools\bin`
    - `%ANDROID_HOME%\build-tools\<versión>`
---
### Pasos de compilación

### 1. Generar build en modo release
```bash
cordova build android --release
```
Resultado:

- `.aab` → `platforms/android/app/build/outputs/bundle/release/app-release.aab`
- (Opcional) `.apk` → `platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk`  
    _(solo si Gradle está configurado para generar APKs)_

2. Firmar el artefacto

Firmar `.aab` con `jarsigner`

```bash
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
-keystore my-release-key.keystore \
platforms/android/app/build/outputs/bundle/release/app-release.aab \
<alias-del-keystore>

```
Firmar `.apk` con `apksigner`

```bash
apksigner sign --ks my-release-key.keystore --ks-key-alias <alias-del-keystore> \
--out app-release-signed.apk app-release-unsigned.apk
```
--- 
### 3. Verificar firma
```bash 
jarsigner -verify platforms/android/app/build/outputs/bundle/release/app-release.aab
apksigner verify app-release-signed.apk
```

### 4. Instalar en dispositivo Android
Con el celular conectado y **Depuración USB** activada:
```bash
adb install app-release-signed.apk
```
### Alternativa: Convertir `.aab` a `.apk` universal

Si solo tienes `.aab`, usa **Bundletool**:
```bash
java -jar bundletool.jar build-apks \
--bundle=platforms/android/app/build/outputs/bundle/release/app-release.aab \
--output=app-release.apks \
--ks=my-release-key.keystore \
--ks-key-alias my-key-alias \
--ks-pass=pass:pipemauri2 \
--key-pass=pass:pipemauri2 \
--mode=universal
```
Extraer e instalar:
```
unzip app-release.apks -d salida
adb install salida/universal.apk
```
### Resultado final

- `.aab` firmado → listo para publicar en Google Play.
- `.apk` firmado → listo para instalar en dispositivo físico para pruebas.
### Notas
- El `.aab` es obligatorio para publicar en Google Play.
- El `.apk` es útil para pruebas locales.
- El alias del keystore debe coincidir con el definido al crear la clave (`keytool -list -v -keystore my-release-key.keystore`).