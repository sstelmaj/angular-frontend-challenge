# Requisitos funcionales

## F1. Listado de productos financieros

### Descripción

La aplicación debe visualizar los productos financieros ofertados por el banco a partir de la API local. La maquetación debe basarse en el diseño D1.

### Criterios de aceptación

- Debe existir una vista de listado de productos financieros.
- La información debe provenir del endpoint `GET /bp/products`.
- Deben mostrarse los productos retornados por la API.
- La presentación visual debe alinearse con el diseño D1 referenciado en `reto.md`.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D1 | Pantalla principal de listado |

### Prioridad

Obligatoria.

## F2. Búsqueda de productos financieros

### Descripción

La aplicación debe permitir buscar productos financieros mediante un campo de texto dentro de la pantalla de listado. La maquetación debe basarse en el diseño D1.

### Criterios de aceptación

- Debe existir un campo de búsqueda visible.
- La búsqueda debe aplicarse sobre el listado de productos financieros.
- La experiencia visual debe estar integrada en la pantalla D1.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D1 | Campo de búsqueda en el listado |

### Prioridad

Obligatoria.

## F3. Cantidad de registros

### Descripción

La pantalla de listado debe mostrar la cantidad de resultados visibles y un selector para definir la cantidad de registros a mostrar. El selector debe contener exactamente los valores `5`, `10` y `20`. La maquetación debe basarse en el diseño D1.

### Criterios de aceptación

- Debe mostrarse la cantidad de resultados que se están visualizando.
- Debe existir un `select` para cantidad de registros.
- El `select` debe ofrecer únicamente las opciones `5`, `10` y `20`.
- El cambio de cantidad visible debe impactar el listado mostrado.
- La solución visual debe respetar la estructura del diseño D1.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D1 | Contador y selector de cantidad de registros |

### Prioridad

Obligatoria.

## F4. Agregar producto

### Descripción

Debe existir un botón principal `Agregar` para navegar al formulario de registro. El formulario debe permitir crear un producto mediante un botón `Agregar` y limpiar el formulario mediante un botón `Reiniciar`. La ubicación del botón principal se basa en D3 y el formulario en D2.

### Criterios de aceptación

- Debe existir un botón `Agregar` en la vista principal.
- Al activar el botón, el usuario debe navegar al formulario de registro.
- El formulario debe incluir los campos `id`, `name`, `description`, `logo`, `date_release` y `date_revision` como campo visible de `Fecha de revisión`.
- El formulario debe tener un botón `Agregar` para enviar la creación.
- El formulario debe tener un botón `Reiniciar` para limpiar el formulario.
- Cada campo debe validar según las reglas definidas en `reto.md`.
- Si una validación falla, el usuario debe ver el error de forma visual por campo.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D2 | Formulario de creación |
| D3 | Ubicación del botón principal y menú contextual |

### Prioridad

Obligatoria.

## F5. Editar producto

### Descripción

Debe existir un menú contextual por producto en formato dropdown con opción de editar. Al seleccionar editar, se debe navegar a una pantalla de edición con las mismas validaciones de F4 y con el campo `ID` deshabilitado. La maquetación del formulario se basa en D2 y la del menú en D3.

### Criterios de aceptación

- Cada producto debe ofrecer un menú contextual.
- El menú contextual debe incluir la opción `Editar`.
- Al elegir `Editar`, se debe navegar a la pantalla de edición.
- El campo `ID` debe mostrarse deshabilitado.
- El formulario de edición debe mantener las mismas validaciones de F4.
- Deben mostrarse errores visuales por campo cuando corresponda.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D2 | Formulario de edición |
| D3 | Menú contextual por producto |

### Prioridad

Deseable.

## F6. Eliminar producto

### Descripción

Debe existir una opción de eliminar dentro del menú contextual de cada producto. Al seleccionarla, se debe mostrar un modal con botones `Cancelar` y `Eliminar`. Confirmar elimina el producto; cancelar solo cierra el modal. La maquetación del menú se basa en D3 y la del modal en D4.

### Criterios de aceptación

- Cada producto debe ofrecer la opción `Eliminar` en el menú contextual.
- Al seleccionar `Eliminar`, debe abrirse un modal de confirmación.
- El modal debe contener botones `Cancelar` y `Eliminar`.
- `Cancelar` debe cerrar el modal sin cambios.
- `Eliminar` debe ejecutar la eliminación del producto.

### Pantalla o diseño relacionado

| Diseño | Uso |
|---|---|
| D3 | Menú contextual por producto |
| D4 | Modal de confirmación de eliminación |

### Prioridad

Opcional para una entrega SemiSenior.

## Observaciones transversales

| Tema | Requisito explícito |
|---|---|
| Errores visuales | Deben mostrarse visualmente |
| Testing | Mínimo 70% de coverage |
| Estilos | Sin frameworks de estilos ni componentes prefabricados |
| Calidad técnica | Buenas prácticas, clean code y SOLID |

## Notas para implementación

- Tomar F1 a F4 como baseline de entrega obligatoria.
- Reutilizar reglas de validación entre crear y editar para evitar inconsistencias.
- Si se implementa F5, conviene definir desde el inicio una navegación compatible con rutas.
- F6 solo debería abordarse después de cerrar cobertura y estabilidad del flujo principal.
