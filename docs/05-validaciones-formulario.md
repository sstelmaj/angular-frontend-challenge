# Validaciones de formulario

## Tabla de validaciones por campo

| Campo | Requerido | Longitud mínima | Longitud máxima | Otras reglas |
|---|---|---|---|---|
| `id` | Sí | 3 | 10 | Debe no existir previamente según verificación por API |
| `name` | Sí | 5 | 100 | Sin reglas adicionales explícitas |
| `description` | Sí | 10 | 200 | Sin reglas adicionales explícitas |
| `logo` | Sí | No especifica | No especifica | Sin reglas adicionales explícitas |
| `date_release` | Sí | No aplica | No aplica | Debe ser igual o mayor a la fecha actual |
| `date_revision` | Sí | No aplica | No aplica | La Fecha de revisión debe ser exactamente un año posterior a `date_release` |

## Mensajes de error sugeridos

Los siguientes mensajes son `decisión técnica propuesta` para reflejar visualmente las reglas exigidas por `reto.md`.

| Campo | Regla | Mensaje sugerido |
|---|---|---|
| `id` | Requerido | `El ID es obligatorio.` |
| `id` | Mínimo 3 | `El ID debe tener al menos 3 caracteres.` |
| `id` | Máximo 10 | `El ID no puede superar 10 caracteres.` |
| `id` | Duplicado | `El ID ya existe.` |
| `name` | Requerido | `El nombre es obligatorio.` |
| `name` | Mínimo 5 | `El nombre debe tener al menos 5 caracteres.` |
| `name` | Máximo 100 | `El nombre no puede superar 100 caracteres.` |
| `description` | Requerido | `La descripción es obligatoria.` |
| `description` | Mínimo 10 | `La descripción debe tener al menos 10 caracteres.` |
| `description` | Máximo 200 | `La descripción no puede superar 200 caracteres.` |
| `logo` | Requerido | `El logo es obligatorio.` |
| `date_release` | Requerido | `La fecha de liberación es obligatoria.` |
| `date_release` | Fecha inválida | `La fecha de liberación debe ser igual o posterior a hoy.` |
| `date_revision` | Requerido | `La Fecha de revisión es obligatoria.` |
| `date_revision` | Fecha inválida | `La Fecha de revisión debe ser exactamente un año posterior a la fecha de liberación.` |

## Reglas para `date_release`

| Regla | Detalle |
|---|---|
| Obligatoria | Debe ingresarse un valor |
| Comparación temporal | Debe ser igual o mayor a la fecha actual |
| Fuente de verdad | `reto.md` |

`decisión técnica propuesta`: normalizar la comparación de fechas a día calendario para evitar errores por zona horaria.

## Reglas para Fecha de revisión (`date_revision`)

| Regla | Detalle |
|---|---|
| Obligatoria | Debe ingresarse un valor en la Fecha de revisión |
| Dependencia | Depende de `date_release` |
| Regla temporal | La Fecha de revisión debe ser exactamente un año posterior a `date_release` |
| Fuente de verdad | `reto.md` |

`decisión técnica propuesta`: recalcular automáticamente `date_revision` o al menos validarla reactivamente cuando cambie `date_release`.

## Regla de validación asíncrona del ID

| Aspecto | Requisito |
|---|---|
| Endpoint | `GET /bp/products/verification/:id` |
| Resultado `true` | El ID existe |
| Resultado `false` | El ID no existe |
| Uso esperado | Validar unicidad del ID antes del envío |

`decisión técnica propuesta`:

- Ejecutar la verificación solo cuando el campo `id` sea válido en requerido y longitud.
- Evitar validar en cada pulsación si no hay valor estable.
- Mostrar estado de validación en curso y error técnico si falla la consulta.

## Consideraciones para modo crear vs modo editar

| Aspecto | Crear | Editar |
|---|---|---|
| `id` editable | Sí | No |
| Validación de unicidad del `id` | Sí | No como interacción principal, porque el campo queda deshabilitado |
| Botón principal | `Agregar` | `Guardar` o equivalente es `decisión técnica propuesta` |
| Reglas de otros campos | Iguales a `reto.md` | Iguales a `reto.md` |

## Reglas de visualización de errores

| Tema | Requisito |
|---|---|
| Error por campo | Debe mostrarse visualmente |
| Manejo de excepciones | Debe existir visualmente en la solución |

`reto.md` no especifica el diseño exacto de los mensajes de error ni su ubicación; eso debe resolverse como `decisión técnica propuesta` respetando D2.

## Notas para implementación

- Centralizar validadores síncronos y asíncronos para reutilizarlos entre alta y edición.
- Mantener la nomenclatura visible `Fecha de revisión` en UI y documentación, reservando `date_revision` para contrato técnico.
- Priorizar validaciones de negocio explícitas sobre mejoras cosméticas.
- Alinear la UX del formulario con errores claros, visibles y consistentes.
