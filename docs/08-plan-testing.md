# Plan de testing

## Estrategia para alcanzar mínimo 70% coverage

La cobertura mínima exigida por `reto.md` debe planificarse sobre piezas de alta lógica y no solo sobre render básico. La estrategia recomendada es cubrir:

- Servicios HTTP y transformación de respuestas.
- Validadores síncronos y asíncronos.
- Lógica de formulario en modo crear y editar.
- Lógica de listado, búsqueda y cantidad de registros.

## Tests unitarios recomendados para servicios

| Unidad | Casos recomendados |
|---|---|
| Servicio de listado | Debe consumir `GET /bp/products` y exponer `data` correctamente |
| Servicio de creación | Debe enviar payload completo a `POST /bp/products` |
| Servicio de actualización | Debe enviar `PUT /bp/products/:id` sin `id` en body |
| Servicio de eliminación | Debe consumir `DELETE /bp/products/:id` |
| Servicio de verificación de ID | Debe interpretar `true/false` correctamente |
| Manejo de errores HTTP | Debe propagar o mapear errores `400` y `404` |

## Tests unitarios recomendados para componentes

| Componente | Casos recomendados |
|---|---|
| Página o componente de listado | Debe renderizar productos obtenidos |
| Búsqueda | Debe filtrar resultados según texto ingresado |
| Selector de cantidad | Debe limitar visualización a `5`, `10` o `20` |
| Contador de resultados | Debe reflejar la cantidad visible |
| Formulario de producto | Debe iniciar inválido si faltan datos obligatorios |
| Formulario de alta | Debe permitir submit solo cuando el formulario es válido |
| Formulario de edición | Debe mantener `id` deshabilitado |
| Mensajes de error | Deben mostrarse ante controles inválidos |

## Tests unitarios recomendados para validadores

| Validador | Casos críticos |
|---|---|
| Requeridos y longitudes de `id` | Vacío, menos de 3, más de 10, válido |
| Longitudes de `name` | Menos de 5, más de 100, válido |
| Longitudes de `description` | Menos de 10, más de 200, válido |
| `date_release` mínima | Fecha anterior a hoy, igual a hoy, posterior |
| Fecha de revisión (`date_revision`) dependiente | Menor, igual y mayor a un año exacto |
| Validador asíncrono de `id` | Existe, no existe, error técnico |

## Qué casos críticos probar

| Área | Caso crítico |
|---|---|
| Alta de producto | No permitir envío con datos inválidos |
| Verificación de ID | Detectar duplicado antes del submit |
| Fechas | Asegurar exactitud entre liberación y revisión |
| Edición | Evitar modificación del `id` |
| Errores visuales | Mostrar feedback claro ante fallas |
| Integración de listado | Manejar respuesta vacía sin romper UI |

## Qué no conviene sobre-testear

| Elemento | Motivo |
|---|---|
| Marcado visual estático sin lógica | Aporta poco coverage útil |
| Getters triviales | Bajo valor |
| Duplicación de casos equivalentes | Incrementa costo de mantenimiento |
| Detalles de implementación interna muy acoplados | Vuelven frágiles las pruebas |

## Distribución sugerida del esfuerzo

| Tipo de prueba | Prioridad |
|---|---|
| Validadores | Muy alta |
| Servicios | Muy alta |
| Formulario | Muy alta |
| Listado y búsqueda | Alta |
| Menú contextual y modal | Media para F5/F6 |
| Estilos o layout puro | Baja |

## Riesgos de coverage engañoso

| Riesgo | Prevención |
|---|---|
| Mucha cobertura en código trivial | Concentrar pruebas en lógica de negocio |
| Cobertura alta sin casos de error | Incluir rutas negativas y excepciones |
| Validadores parcialmente cubiertos | Probar bordes exactos de cada regla |

## Notas para implementación

- Medir coverage por avance funcional y no solo al cierre.
- Priorizar pruebas sobre validaciones y comportamiento observable.
- Si se incorpora F5, sumar pruebas específicas de modo edición sin comprometer el objetivo principal de cobertura útil.
