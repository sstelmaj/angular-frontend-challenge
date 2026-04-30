# Arquitectura frontend

## Objetivo de la arquitectura

Definir una estructura Angular simple, mantenible y alineada con clean code y SOLID para implementar el reto sin sobrediseñar la solución.

## Propuesta de estructura de carpetas Angular

La siguiente organización es una `decisión técnica propuesta` compatible con el alcance documentado y alineada con Angular standalone:

```text
src/app/
  app.config.ts
  app.routes.ts
  core/
    services/
    interceptors/
    models/
    config/
  shared/
    components/
    ui/
    pipes/
    directives/
    validators/
    utils/
  features/
    products/
      pages/
      components/
      services/
      models/
```

## Separación entre `core`, `shared` y `features`

| Capa | Propósito | Justificación |
|---|---|---|
| `core` | Servicios singleton, configuración global, modelos de API y utilidades transversales | Evita duplicación y centraliza infraestructura |
| `shared` | Piezas reutilizables de UI, validadores y utilidades sin dependencia fuerte del dominio | Favorece reutilización y bajo acoplamiento |
| `features` | Casos de uso del dominio de productos financieros | Mantiene cohesión funcional y escalabilidad |

## Componentes sugeridos

Todos los siguientes puntos son `decisión técnica propuesta` para organizar la implementación:

| Componente o página | Tipo | Responsabilidad |
|---|---|---|
| `products-list-page` | Página | Orquestar listado, búsqueda, cantidad visible y navegación a alta |
| `products-table` | Componente | Renderizar filas del listado |
| `products-search-box` | Componente | Capturar texto de búsqueda |
| `products-page-size-select` | Componente | Seleccionar cantidad de registros visibles |
| `product-actions-menu` | Componente | Mostrar dropdown con acciones por producto |
| `product-form-page` | Página | Orquestar alta y edición |
| `product-form` | Componente | Gestionar Reactive Form y validaciones |
| `confirm-modal` | Componente compartido | Confirmaciones de acciones destructivas si se implementa F6 |
| `feedback-banner` | Componente compartido | Mostrar mensajes globales de éxito o error |

## Servicios sugeridos

| Servicio | Responsabilidad |
|---|---|
| `products-api.service` | Consumir endpoints de productos y verificación de ID |
| `error-mapping.service` | `decisión técnica propuesta`: traducir errores técnicos a mensajes de UI |

`products-facade.service` no se implementará inicialmente. Queda como `decisión técnica propuesta` solo para un escenario futuro donde la lógica de presentación del feature crezca y justifique una capa adicional.

## Responsabilidades por área

| Área | Responsabilidad principal |
|---|---|
| Página de listado | Cargar datos, coordinar filtros y paginación visual simple |
| Componentes de listado | Mostrar datos y emitir eventos de usuario |
| Página de formulario | Determinar si está en modo crear o editar |
| Formulario | Validar campos, preparar payload y emitir submit |
| Servicio API | Encapsular HTTP y contratos del backend |

## Uso recomendado de Reactive Forms

El uso de Reactive Forms es una `decisión técnica propuesta` y resulta recomendable por:

- Necesidad de validaciones síncronas y asíncronas.
- Dependencia entre `date_release` y la `Fecha de revisión` (`date_revision`).
- Reutilización del mismo formulario en crear y editar.
- Mayor testabilidad de reglas complejas.

## Uso recomendado de rutas

El uso de rutas es deseable para SemiSenior según `reto.md`. La estrategia propuesta es usar Angular standalone con configuración central en `app.routes.ts` y `app.config.ts`.

| Ruta | Propósito | Tipo |
|---|---|---|
| `/products` | Listado principal | `decisión técnica propuesta` |
| `/products/new` | Alta de producto | `decisión técnica propuesta` |
| `/products/:id/edit` | Edición de producto | `decisión técnica propuesta` |

### Estrategia concreta de rutas

| Archivo | Rol |
|---|---|
| `app.routes.ts` | Definir rutas principales del flujo de productos |
| `app.config.ts` | Registrar la provisión global de router y configuración de aplicación standalone |

### Criterio de uso

- La ruta de listado debe ser el punto de entrada principal.
- La navegación a crear debe salir desde el botón `Agregar`.
- La navegación a editar debe salir desde la acción contextual por producto si se implementa F5.
- No se documenta código de rutas en esta etapa, solo la estrategia.

## Justificación basada en clean code y SOLID

| Principio | Aplicación sugerida |
|---|---|
| Responsabilidad única | Separar páginas, componentes de UI y servicios |
| Abierto/cerrado | Diseñar componentes reusables y validadores extensibles |
| Sustitución de Liskov | Mantener contratos simples en componentes y servicios |
| Segregación de interfaces | Evitar servicios con demasiadas responsabilidades |
| Inversión de dependencias | Consumir abstracciones internas del feature cuando aporte claridad |

## Criterios para evitar sobrearquitectura

| Recomendación | Motivo |
|---|---|
| No introducir estado global complejo de entrada | El dominio es acotado |
| No fragmentar en exceso los componentes | El reto tiene alcance limitado |
| No crear capas si no reducen acoplamiento real | Mantener velocidad de entrega |

## Notas para implementación

- Empezar con una estructura clara pero mínima.
- Usar Angular standalone con `app.routes.ts` y `app.config.ts` en lugar de una carpeta `app-routing/`.
- No crear `products-facade.service` en la primera iteración salvo que aparezca lógica de orquestación que lo justifique.
- Si se incorpora F5, sostener un formulario reutilizable para crear y editar.
- Mantener la arquitectura alineada con el tamaño real del reto y no con un sistema empresarial mayor.
