# Modelo de datos

## Interface conceptual de Producto Financiero

```ts
interface ProductoFinanciero {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
```

`decisión técnica propuesta`: en frontend conviene modelar `date_release` y `date_revision` como `string` en formato `YYYY-MM-DD` al interoperar con la API, incluso si a nivel de UI se usan controles de fecha.

## Descripción de cada campo

| Campo | Tipo esperado | Ejemplo | Descripción |
|---|---|---|---|
| `id` | `string` | `trj-crd` | Identificador único del producto |
| `name` | `string` | `Tarjetas de Crédito` | Nombre del producto |
| `description` | `string` | `Tarjeta de consumo bajo la modalidad de crédito` | Descripción del producto |
| `logo` | `string` | `https://www.visa.com.ec/...` | URL de logo representativo |
| `date_release` | `string` fecha | `2023-02-01` | Fecha de liberación del producto |
| `date_revision` | `string` fecha | `2024-02-01` | Fecha de revisión del producto |

## Reglas importantes del modelo

| Regla | Fuente |
|---|---|
| `id` debe ser único | `reto.md` |
| `id` se valida por longitud y existencia previa | `reto.md` |
| `date_release` debe ser igual o mayor a la fecha actual | `reto.md` |
| `date_revision` debe ser exactamente un año posterior a `date_release` | `reto.md` |
| En edición, el `id` debe permanecer deshabilitado | `reto.md` |

## Payload de creación

```ts
interface CrearProductoPayload {
  id: string;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
```

## Payload de actualización

```ts
interface ActualizarProductoPayload {
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
}
```

## Diferencia entre payload de creación y payload de actualización

| Aspecto | Creación | Actualización |
|---|---|---|
| `id` en body | Sí | No |
| Validación de unicidad de `id` | Sí | No aplicaría sobre campo editable, porque el campo está deshabilitado |
| URL | `POST /bp/products` | `PUT /bp/products/:id` |
| Propósito | Alta de nuevo producto | Modificación de producto existente |

## Reglas de consistencia recomendadas

| Regla | Tipo |
|---|---|
| Mantener nombres de campos exactamente como los expone la API | `decisión técnica propuesta` |
| Evitar transformar fechas a formatos distintos dentro del modelo de transporte | `decisión técnica propuesta` |
| Separar modelo de API y modelo de formulario si la UI lo requiere | `decisión técnica propuesta` |

## Notas para implementación

- Evitar duplicar definiciones del modelo en distintas capas del frontend.
- Preservar compatibilidad exacta con los nombres del backend.
- Tratar `date_revision` siempre como el campo API de la `Fecha de revisión`.
- Tratar la diferencia entre creación y edición como contratos distintos desde el servicio y el formulario.
