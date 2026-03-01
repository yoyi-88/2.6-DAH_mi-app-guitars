# 🎸 Galería de Guitarras App - Edición Nativa 

[![Ionic](https://img.shields.io/badge/Framework-Ionic%208-blue.svg)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Lógica-Angular%2018-red.svg)](https://angular.io/)
[![Capacitor](https://img.shields.io/badge/Native-Capacitor%207-black.svg)](https://capacitorjs.com/)
[![JSON Server](https://img.shields.io/badge/Backend-JSON--Server--v1.x-green.svg)](https://github.com/typicode/json-server)

Aplicación móvil nativa desarrollada con **Ionic**, **Angular** y **Capacitor** para la gestión profesional de un catálogo de guitarras. El proyecto ha evolucionado de una SPA web a una solución nativa robusta que integra hardware, persistencia de datos y una interfaz de usuario reactiva de alta fidelidad.

---

## 🚀 Funcionalidades Implementadas

### 1. Gestión Integral de Datos (CRUD)
* **Create**: Formulario con validación para añadir nuevos modelos (Nombre, Corte, Año, Imagen, Estado).
* **Read**: Listado general con visualización de estados y página de detalles individualizada.
* **Update**: Edición en tiempo real de los datos de cada guitarra con sincronización al servidor vía peticiones PUT.
* **Delete**: Borrado físico de registros con diálogos de confirmación de seguridad y peticiones DELETE.

### 2. Integración de Hardware Nativo (Capacitor)
* **📸 Cámara Pro**: Sistema de captura directa mediante `PhotoService`. Permite digitalizar instrumentos en tiempo real devolviendo rutas `webPath` para previsualización inmediata.
* **📍 Geolocalización Inteligente**: Implementación de `@capacitor/geolocation`. La app vincula automáticamente coordenadas GPS a cada modelo mediante un sistema de geocodificación inversa basado en el nombre del lugar capturado en el formulario.
* **📳 Feedback Háptico**: Uso de `@capacitor/haptics` para proporcionar respuestas físicas (`ImpactStyle.Medium`) al confirmar la adición de nuevas guitarras.
* **📲 Share API**: Integración de `@capacitor/share` para permitir el envío de fichas técnicas y fotos de las guitarras a través de aplicaciones nativas de mensajería.

### 3. Filtrado y Ordenación Avanzada
* **Búsqueda Híbrida**: Sistema que combina peticiones al servidor con un filtrado local mediante `filter()` y `toLowerCase()` para resultados precisos e insensibles a mayúsculas.
* **Ordenación Dinámica**: Sistema que delega la carga al backend mediante parámetros de URL compatibles con **JSON Server 1.x** (ej: `_sort=-anio`).

### 4. Experiencia de Usuario (UX/UI)
* **Diseño Premium**: Tarjetas de visualización de **400px** con imágenes circulares y bordes dinámicos (dorados para modelos en producción).
* **Floating Toolbar**: Barra de herramientas unificada para búsqueda y filtrado que optimiza el espacio vertical en pantallas móviles.
* **Feedback Asíncrono**: Uso de `LoadingController` y `Skeleton Screens` (`ion-skeleton-text`) para gestionar los estados de carga.
* **Animaciones**: Implementación de `AnimationController` para la entrada fluida de elementos en la interfaz.

---

## 🛠️ Stack Tecnológico

* **Core**: Ionic Framework (Standalone Components) & Angular 18.
* **Nativo**: Capacitor 7 (Camera, Geolocation, Haptics, Share).
* **Comunicación**: HttpClient con conversión de Observables a Promesas mediante `firstValueFrom`.
* **Backend**: JSON Server v1.x (API REST compatible).

---

## ⚙️ Instalación y Configuración Paso a Paso

### 1. Preparación del Entorno
Clona el repositorio en tu máquina local:

git clone [https://github.com/tu-usuario/nombre-del-proyecto.git](https://github.com/tu-usuario/nombre-del-proyecto.git)
cd nombre-del-proyecto

## 1.1. Preparación del Entorno
# Instalar Ionic CLI de forma global (si no se tiene)
npm install -g @ionic/cli

# Instalar las dependencias locales del proyecto
npm install

# Inicia la base de datos en una terminal independiente:
npm run api

# Lanzar aplicación
ionic serve

### 📱 Pruebas en Dispositivo Físico
Para probar la aplicación en un smartphone real durante el desarrollo:
1. Conectar el dispositivo mediante USB y habilitar "Depuración USB".
2. Identificar la IP local del servidor (PC) mediante `ipconfig`.
3. Configurar dicha IP en `environment.prod.ts`.
4. Ejecutar `ionic cap run android` seleccionando el terminal físico.

## 🌐 Configuración de Red para Dispositivos Reales

Para que la aplicación funcione en un dispositivo físico (Android/iOS), el archivo `environment.prod.ts` debe apuntar a la IP local de la máquina que aloja el servidor `json-server`, incluyendo el puerto correspondiente:

```typescript
apiUrl: '[http://192.168.](http://192.168.)XX.XX:3000'
