# 🎸 Galería de Guitarras App - Actualización venidera con ejecutable

[![Ionic](https://img.shields.io/badge/Framework-Ionic%208-blue.svg)](https://ionicframework.com/)
[![Angular](https://img.shields.io/badge/Lógica-Angular%2018-red.svg)](https://angular.io/)
[![JSON Server](https://img.shields.io/badge/Backend-JSON--Server--v1.x-green.svg)](https://github.com/typicode/json-server)

Aplicación móvil multiplataforma desarrollada con **Ionic** y **Angular** para la gestión profesional de un catálogo de guitarras. El proyecto implementa una arquitectura orientada a servicios, consumo de APIs REST y una interfaz de usuario reactiva y optimizada.



---

## 🚀 Funcionalidades Implementadas

### 1. Gestión Integral de Datos (CRUD)
* **Create**: Formulario con validación para añadir nuevos modelos (Nombre, Corte, Año, Imagen, Estado).
* **Read**: Listado general con visualización de estados y página de detalles individualizada.
* **Update**: Edición en tiempo real de los datos de cada guitarra con sincronización al servidor vía peticiones PUT.
* **Delete**: Borrado físico de registros con diálogos de confirmación de seguridad y peticiones DELETE.

### 2. Filtrado y Ordenación Avanzada (Mejoras de Rendimiento)
* **Búsqueda Híbrida**: Sistema que combina peticiones al servidor con un filtrado local mediante `filter()` y `toLowerCase()` para garantizar resultados precisos e insensibles a mayúsculas.
* **Ordenación Dinámica en Servidor**: Sistema que delega la carga de procesamiento al backend mediante parámetros de URL.
    * Soporte para orden Alfabético (A-Z / Z-A).
    * Soporte para orden Cronológico (Más nuevas / Más antiguas).
    * Implementación de sintaxis compatible con **JSON Server 1.x** utilizando el prefijo `-` para órdenes descendentes (ej: `_sort=-anio`).

### 3. Experiencia de Usuario (UX/UI)
* **Feedback Asíncrono**: Uso de `LoadingController` para bloquear la interfaz durante operaciones de red, evitando duplicidad de envíos y mejorando la percepción de trabajo de la app.
* **Notificaciones**: Sistema de `ToastController` con colores temáticos para confirmar éxitos (success) o errores (danger).
* **Animaciones**: Implementación de `AnimationController` para la entrada fluida de tarjetas y elementos de la lista mediante transformaciones de opacidad y posición.
* **Skeleton Screens**: Uso de `ion-skeleton-text` para ofrecer feedback visual de carga mientras se obtienen los datos iniciales del servidor.

---

## 🛠️ Stack Tecnológico

* **Core**: Ionic Framework (Standalone Components) & Angular.
* **Comunicación**: HttpClient con conversión de Observables a Promesas mediante `firstValueFrom`.
* **Backend**: JSON Server v1.x (API REST compatible).
* **Estilos**: SASS con variables CSS personalizadas y componentes de Ionic.



---

## ⚙️ Instalación y Configuración Paso a Paso

### 1. Preparación del Entorno
Clona el repositorio en tu máquina local:

git clone [https://github.com/tu-usuario/nombre-del-proyecto.git](https://github.com/tu-usuario/nombre-del-proyecto.git)
cd nombre-del-proyecto

## 1.1. Preparación del Entorno
# Instalar Ionic CLI de forma global (si no se tiene)
npm install -g @ionic/cli

### Instalar las dependencias locales del proyecto
npm install

### Inicia la base de datos en una terminal independiente:
npm run api

### Lanzar aplicación
ionic serve
