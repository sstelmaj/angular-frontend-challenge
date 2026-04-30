# Bank Frontend Challenge

Aplicación frontend desarrollada en Angular para la gestión de productos financieros de un banco. El proyecto consume un backend local provisto por la prueba técnica y resuelve el flujo completo de consulta, creación, edición y eliminación de productos.

## Descripción

Este repositorio contiene la implementación del frontend de una prueba técnica Angular orientada a la gestión de productos financieros.

La aplicación:

- consume un backend local provisto por la prueba técnica
- no implementa backend propio
- utiliza Angular standalone
- cubre el alcance funcional completo de F1 a F6

El backend esperado corre localmente en `http://localhost:3002` y el frontend utiliza un proxy de Angular para evitar problemas de CORS durante el desarrollo local.

## Tecnologías utilizadas

- Angular
- TypeScript
- SCSS
- Jest
- Angular Router
- Reactive Forms
- Angular HttpClient

## Versiones utilizadas

| Elemento | Referencia utilizada |
|---|---|
| Angular | `20.3.x` según dependencias reales del proyecto |
| Angular CLI | `20.3.x` según dependencias de desarrollo |
| TypeScript | `~5.9.2` |
| Node.js | No está fijado explícitamente en el repositorio; se recomienda usar una versión LTS compatible con Angular 20 |
| npm | No está fijado explícitamente en el repositorio; se recomienda usar la versión incluida con una instalación estable de Node.js |

## Funcionalidades implementadas

| Funcionalidad | Estado | Descripción |
|---|---|---|
| F1. Listado de productos financieros | Implementada | Consulta y visualización del catálogo desde `GET /bp/products` |
| F2. Búsqueda de productos | Implementada | Filtrado local por `id`, `name` y `description` |
| F3. Cantidad de registros visibles | Implementada | Selector de visualización con opciones `5`, `10` y `20` |
| F4. Crear producto | Implementada | Formulario con validaciones síncronas y validación asíncrona del ID |
| F5. Editar producto | Implementada | Reutilización del formulario en modo edición con `ID` deshabilitado |
| F6. Eliminar producto | Implementada | Menú contextual y modal de confirmación con `DELETE /bp/products/:id` |
| Estados visuales | Implementados | Estados de carga, vacío, éxito y error |
| Pruebas unitarias | Implementadas | Suite con Jest y coverage por encima del mínimo requerido |

## Requisitos previos

- Node.js
- npm
- Angular CLI
  - opcional si solo se usan los scripts del proyecto
- Backend provisto por la prueba técnica

## Configuración del backend local

El backend no forma parte de este repositorio. Debe utilizarse el backend entregado junto con la prueba técnica.

Pasos esperados:

1. Descomprimir el backend provisto por la prueba.
2. Instalar dependencias.
3. Ejecutar el servicio en modo desarrollo.

Comandos esperados en el backend:

```bash
npm install
npm run start:dev
```

El backend debe quedar disponible en:

```text
http://localhost:3002
```

No se desarrolla backend propio en este repositorio.

## Proxy de desarrollo y CORS

Durante el desarrollo local:

- el backend corre en `http://localhost:3002`
- el frontend corre en `http://localhost:4200`

Para evitar errores de CORS se configuró un proxy de Angular en [proxy.conf.json](./proxy.conf.json).

La aplicación frontend consume rutas relativas bajo `/bp/...`, por ejemplo:

- `/bp/products`
- `/bp/products/:id`
- `/bp/products/verification/:id`

El proxy reenvía esas requests al backend local sin necesidad de modificar el servidor provisto por la prueba.

El script:

```bash
npm start
```

ya levanta Angular con:

```text
ng serve --proxy-config proxy.conf.json
```

## Instalación del frontend

```bash
npm install
```

## Ejecución en desarrollo

```bash
npm start
```

La aplicación queda disponible en:

```text
http://localhost:4200
```

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/products` | Listado principal de productos financieros |
| `/products/new` | Pantalla de creación de producto |
| `/products/:id/edit` | Pantalla de edición de producto |

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm start` | Levanta el frontend en desarrollo usando el proxy de Angular |
| `npm run build` | Genera el build de producción |
| `npm test` | Ejecuta la suite de pruebas unitarias con Jest |
| `npm run test:coverage` | Ejecuta las pruebas y genera reporte de coverage |

## Testing y coverage

El proyecto utiliza Jest como framework de pruebas unitarias.

Ejecución de tests:

```bash
npm test -- --runInBand
```

Generación de coverage:

```bash
npm run test:coverage -- --runInBand
```

El reto exige un mínimo de 70% de coverage y el proyecto supera ese umbral.

## Estructura del proyecto

```text
src/
  app/
    core/
      config/
      models/
      services/
    shared/
      components/
      utils/
      validators/
    features/
      products/
        components/
        models/
        pages/
        services/
docs/
proxy.conf.json
```

Responsabilidad por carpeta:

| Carpeta | Responsabilidad |
|---|---|
| `src/app/core` | Configuración base e infraestructura transversal |
| `src/app/shared` | Componentes reutilizables, utilidades y validadores compartidos |
| `src/app/features/products` | Flujo funcional de productos financieros |
| `docs` | Documentación técnica del reto y decisiones de implementación |
| `proxy.conf.json` | Proxy de desarrollo para reenviar `/bp/...` al backend local |

## Arquitectura y decisiones técnicas

- Se utiliza Angular standalone con configuración central en `app.config.ts` y `app.routes.ts`.
- La aplicación está organizada con separación `core`, `shared` y `features`.
- Se usa `Reactive Forms` para soportar validaciones de negocio y formularios reutilizables.
- `ProductApiService` encapsula el acceso HTTP al backend.
- Se utiliza SCSS propio, sin frameworks UI ni componentes prefabricados.
- La búsqueda es local porque el contrato API documentado no define búsqueda remota.
- El selector `5/10/20` controla la cantidad visible en pantalla y no implementa paginación real.
- La edición obtiene el producto usando `GET /bp/products` y búsqueda local por `id`, porque no existe un `GET /bp/products/:id` documentado.
- El proxy de Angular resuelve el problema de CORS en desarrollo local sin modificar el backend provisto.

## Validaciones del formulario

| Campo | Reglas |
|---|---|
| `id` | requerido, mínimo 3, máximo 10, validación asíncrona de existencia |
| `name` | requerido, mínimo 5, máximo 100 |
| `description` | requerido, mínimo 10, máximo 200 |
| `logo` | requerido |
| `date_release` | requerido, igual o mayor a la fecha actual |
| `date_revision` | requerido, exactamente un año posterior a `date_release` |

### Nota sobre el campo `logo`

- El campo `logo` se maneja como un `string` requerido, siguiendo el contrato de la API.
- Aunque los ejemplos del reto muestran valores con formato de URL, en este frontend no se implementa carga de archivos.
- No se agregó una validación estricta de URL porque el requisito funcional explícito exige únicamente que el campo sea requerido.

## Endpoints consumidos

| Método | Endpoint | Uso |
|---|---|---|
| `GET` | `/bp/products` | Obtener listado de productos |
| `POST` | `/bp/products` | Crear producto |
| `PUT` | `/bp/products/:id` | Editar producto |
| `DELETE` | `/bp/products/:id` | Eliminar producto |
| `GET` | `/bp/products/verification/:id` | Verificar disponibilidad de ID |

## Flujo de uso

1. Ingresar al listado principal de productos.
2. Buscar productos usando el campo de búsqueda local.
3. Ajustar la cantidad visible con el selector `5`, `10` o `20`.
4. Crear un producto desde la acción `Agregar`.
5. Editar un producto desde el menú contextual de cada fila.
6. Eliminar un producto desde el menú contextual y confirmar la acción en el modal.

## Documentación adicional

La carpeta [docs](./docs) contiene documentación técnica del reto, incluyendo:

- resumen del reto
- alcance por perfil
- requisitos funcionales
- contrato API
- modelo de datos
- validaciones
- arquitectura
- plan de implementación
- plan de testing
- decisiones técnicas
- guía de maquetación

## Validación final recomendada

```bash
npm install
npm test -- --runInBand
npm run test:coverage -- --runInBand
npm run build
npm start
```

## Notas importantes

- No se usaron frameworks de estilos ni componentes prefabricados.
- No se modificó el backend provisto por la prueba técnica.
- El frontend respeta el contrato API documentado.
- F6 fue implementada aunque para SemiSenior figuraba como opcional.
