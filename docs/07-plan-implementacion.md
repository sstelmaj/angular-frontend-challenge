# Plan de implementación

## Plan por fases

### Fase 1. Base del proyecto

- Preparar estructura de carpetas.
- Configurar acceso a la URL base del backend.
- Definir modelos y contratos de API.
- Preparar estrategia de estilos propios.

### Fase 2. Flujo obligatorio de listado

- Implementar consumo de `GET /bp/products`.
- Construir vista de listado según D1.
- Implementar búsqueda local en el listado.
- Implementar selector de cantidad de registros `5`, `10`, `20`.
- Mostrar cantidad de resultados visibles.

### Fase 3. Flujo obligatorio de creación

- Implementar navegación al formulario.
- Construir formulario según D2.
- Incorporar validaciones síncronas por campo.
- Incorporar validación asíncrona del ID.
- Implementar acción `Agregar`.
- Implementar acción `Reiniciar`.
- Mostrar errores visuales.

### Fase 4. Calidad mínima exigida

- Manejo visual de errores de API y validación.
- Pruebas unitarias de servicios, validadores y componentes críticos.
- Ajuste de coverage hasta superar 70%.

### Fase 5. Alcance deseable

- Implementar rutas formales.
- Implementar F5 editar producto.
- Mejorar responsive básico.
- Agregar estados de carga.

### Fase 6. Alcance opcional

- Implementar F6 eliminar producto.
- Incorporar modal de confirmación según D4.
- Refinar skeletons o estados de precarga.

## Orden recomendado de implementación

| Orden | Tema | Motivo |
|---|---|---|
| 1 | Modelos y contrato API | Reduce retrabajo posterior |
| 2 | Servicio de productos | Habilita listado y formulario |
| 3 | F1 listado | Es la base visible del flujo |
| 4 | F2 búsqueda | Reusa datos ya cargados |
| 5 | F3 cantidad de registros | Completa la pantalla D1 |
| 6 | F4 formulario de alta | Cierra el alcance obligatorio |
| 7 | Validación asíncrona de ID | Es requisito crítico de F4 |
| 8 | Testing del flujo obligatorio | Asegura estabilidad y coverage |
| 9 | F5 edición | Suma valor sin comprometer entrega base |
| 10 | F6 eliminación | Solo si el tiempo lo permite |

## Qué implementar primero

- Contrato de datos.
- Servicio HTTP para productos.
- Pantalla de listado.
- Búsqueda y cantidad de registros.

## Qué dejar para después

- Eliminación de productos.
- Skeletons avanzados.
- Refinamientos visuales no bloqueantes.
- Optimizaciones prematuras.

## Dependencias entre tareas

| Tarea | Depende de |
|---|---|
| Listado de productos | Servicio API y modelo de producto |
| Búsqueda | Listado funcionando |
| Cantidad de registros | Listado funcionando |
| Formulario de alta | Modelo, validaciones y servicio API |
| Verificación de ID | Servicio API |
| Edición | Formulario reutilizable y rutas recomendadas |
| Eliminación | Menú contextual y manejo de estado del listado |
| Testing | Componentes, servicios y validadores definidos |

## Checklist de avance

### Obligatorio

- [ ] Consumir backend local en `http://localhost:3002`
- [ ] Implementar F1 listado
- [ ] Implementar F2 búsqueda
- [ ] Implementar F3 cantidad de registros
- [ ] Implementar F4 agregar producto
- [ ] Mostrar errores visuales
- [ ] Mantener estilos propios sin frameworks UI
- [ ] Alcanzar mínimo 70% de coverage

### Deseable

- [ ] Implementar rutas
- [ ] Implementar F5 editar producto
- [ ] Incorporar responsive básico
- [ ] Incorporar estados de carga

### Opcional

- [ ] Implementar F6 eliminar producto
- [ ] Implementar modal D4
- [ ] Incorporar skeletons

## Riesgos de ejecución

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Dejar testing para el final | Alto | Escribir pruebas a medida que se cierra cada fase |
| Subestimar validaciones de fechas | Alto | Diseñarlas temprano y probar casos borde |
| Implementar F5/F6 demasiado pronto | Medio | Cerrar primero F1 a F4 |
| Sobreinvertir en diseño visual | Medio | Asegurar primero funcionalidad y cobertura |

## Notas para implementación

- La estrategia más segura es completar el flujo obligatorio end-to-end antes de expandir alcance.
- El coverage debe avanzar en paralelo, no como tarea final aislada.
- Si el tiempo se acorta, la mejor entrega SemiSenior es obligatorios completos más pruebas y errores visuales consistentes.
