# Contrato API

## URL base

`http://localhost:3002`

## Endpoints disponibles

| Endpoint | Método | Uso principal |
|---|---|---|
| `/bp/products` | `GET` | Obtener listado de productos |
| `/bp/products` | `POST` | Crear producto |
| `/bp/products/:id` | `PUT` | Actualizar producto |
| `/bp/products/:id` | `DELETE` | Eliminar producto |
| `/bp/products/verification/:id` | `GET` | Verificar existencia de ID |

## GET `/bp/products`

### Objetivo

Obtener la lista de productos financieros.

### Request

| Elemento | Valor |
|---|---|
| Método | `GET` |
| URL | `/bp/products` |
| Body | No aplica |

### Response esperada

| Código | Respuesta |
|---|---|
| `200` | `{ "data": [ { "id": "uno", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": "2025-01-01", "date_revision": "2025-01-01" } ] }` |

### Errores esperados

`reto.md` no detalla errores específicos para este endpoint.

### Notas para implementación frontend

- La colección útil para UI se encuentra dentro de `data`.
- `decisión técnica propuesta`: tratar respuestas vacías como listado válido sin error.
- Preparar estados de carga, éxito y error visual aunque `reto.md` no detalle el shape exacto del error.

## POST `/bp/products`

### Objetivo

Crear un producto financiero.

### Request body

| Campo | Tipo esperado |
|---|---|
| `id` | `string` |
| `name` | `string` |
| `description` | `string` |
| `logo` | `string` |
| `date_release` | `string` fecha |
| `date_revision` | `string` fecha |

### Ejemplo de request

```json
{
  "id": "dos",
  "name": "Nombre producto",
  "description": "Descripción producto",
  "logo": "assets-1.png",
  "date_release": "2025-01-01",
  "date_revision": "2025-01-01"
}
```

### Response esperada

| Código | Respuesta |
|---|---|
| `200` | `{ "message": "Product added successfully", "data": { "id": "dos", "name": "Nombre producto", "description": "Descripción producto", "logo": "assets-1.png", "date_release": "2025-01-01", "date_revision": "2025-01-01" } }` |
| `400` | `{ "name": "BadRequestError", "message": "Invalid body, check 'errors' property for more info.", ... }` |

### Errores esperados

- `400 BadRequestError` cuando el body es inválido.

### Notas para implementación frontend

- Revalidar en frontend antes de enviar para reducir errores `400`.
- En UI, `date_revision` debe presentarse con la nomenclatura `Fecha de revisión`.
- `decisión técnica propuesta`: mostrar feedback de éxito a partir del campo `message`.
- `decisión técnica propuesta`: contemplar mapeo de errores de backend por campo solo si la respuesta incluye detalle utilizable.

## PUT `/bp/products/:id`

### Objetivo

Actualizar un producto financiero existente.

### Request

| Elemento | Valor |
|---|---|
| Método | `PUT` |
| URL | `/bp/products/:id` |
| Path param | `id` del producto a actualizar |

### Request body

| Campo | Tipo esperado |
|---|---|
| `name` | `string` |
| `description` | `string` |
| `logo` | `string` |
| `date_release` | `string` fecha |
| `date_revision` | `string` fecha |

### Ejemplo de request

```json
{
  "name": "Nombre actualizado",
  "description": "Descripción producto",
  "logo": "assets-1.png",
  "date_release": "2025-01-01",
  "date_revision": "2025-01-01"
}
```

### Response esperada

| Código | Respuesta |
|---|---|
| `200` | `{ "message": "Product updated successfully", "data": { "name": "Nombre actualizado", "description": "Descripción producto", "logo": "assets-1.png", "date_release": "2025-01-01", "date_revision": "2025-01-01" } }` |
| `404` | `{ "name": "NotFoundError", "message": "Not product found with that identifier", ... }` |

### Errores esperados

- `404 NotFoundError` si no existe el producto.

### Notas para implementación frontend

- El `id` no viaja en el body de actualización; viaja en la URL.
- Mantener el campo `ID` deshabilitado en la pantalla de edición según `reto.md`.
- En UI, `date_revision` debe presentarse con la nomenclatura `Fecha de revisión`.
- `decisión técnica propuesta`: después de actualizar, redirigir al listado o mostrar confirmación clara.

## DELETE `/bp/products/:id`

### Objetivo

Eliminar un producto financiero.

### Request

| Elemento | Valor |
|---|---|
| Método | `DELETE` |
| URL | `/bp/products/:id` |
| Path param | `id` del producto a eliminar |
| Body | No aplica |

### Response esperada

| Código | Respuesta |
|---|---|
| `200` | `{ "message": "Product removed successfully" }` |
| `404` | `{ "name": "NotFoundError", "message": "Not product found with that identifier", ... }` |

### Errores esperados

- `404 NotFoundError` si no existe el producto.

### Notas para implementación frontend

- La eliminación está asociada a F6, que no es obligatoria para SemiSenior.
- `decisión técnica propuesta`: refrescar el listado luego de eliminar o remover el item del estado local.

## GET `/bp/products/verification/:id`

### Objetivo

Verificar si un ID de producto ya existe.

### Request

| Elemento | Valor |
|---|---|
| Método | `GET` |
| URL | `/bp/products/verification/:id` |
| Path param | `id` a verificar |
| Body | No aplica |

### Response esperada

| Código | Respuesta |
|---|---|
| `200` | `true` o `false` |

### Errores esperados

`reto.md` no detalla errores específicos para este endpoint.

### Notas para implementación frontend

- La validación del `id` en alta depende de este endpoint.
- `true` significa que el ID ya existe.
- `false` significa que el ID no existe.
- `decisión técnica propuesta`: ejecutar esta validación como asíncrona y con control de frecuencia para evitar llamadas innecesarias.

## Consideraciones generales de integración

| Tema | Observación |
|---|---|
| Backend | Debe correrse localmente en `http://localhost:3002` |
| Formato fecha | El ejemplo usa `YYYY-MM-DD` |
| Manejo de errores | Debe existir manejo visual aunque no todos los errores estén documentados |
| Desarrollo backend | No corresponde al alcance del reto |

## Notas para implementación

- Centralizar la configuración de la URL base.
- Documentar claramente qué endpoints son necesarios para alcance SemiSenior y cuáles son deseables.
- Preparar mapeo uniforme de errores de red, validación y no encontrado.
