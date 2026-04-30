# Alcance recomendado para perfil SemiSenior

## Funcionalidades obligatorias para SemiSenior

Según `reto.md`, para perfil SemiSenior la solución debe cumplir como mínimo:

| ID | Funcionalidad | Estado en el alcance |
|---|---|---|
| F1 | Listado de productos financieros | Obligatoria |
| F2 | Búsqueda de productos financieros | Obligatoria |
| F3 | Cantidad de registros | Obligatoria |
| F4 | Agregar producto | Obligatoria |

## Funcionalidades deseables

`reto.md` marca como deseable para SemiSenior:

| Elemento | Motivo |
|---|---|
| F5 Editar producto | Mejora completitud funcional del CRUD |
| Uso de rutas | Mejora navegación y separación de pantallas |
| Rendimiento | Deseable general de la solución |
| Pantallas de precarga (Skeletons) | Deseable general de la solución |
| Responsive design | Deseable general de la solución |

## Funcionalidades opcionales

Para una entrega SemiSenior, lo siguiente no es obligatorio:

| ID | Funcionalidad | Observación |
|---|---|---|
| F6 | Eliminar producto | Forma parte del alcance Senior |

## Qué no se debería priorizar inicialmente

- Implementar F6 antes de cerrar F1 a F4.
- Invertir tiempo en refinamientos visuales avanzados antes de asegurar validaciones, errores y cobertura.
- Complejizar el manejo de estado global sin necesidad demostrada.
- Agregar backend, mocks persistentes propios o infraestructura no pedida.
- Optimizar skeletons y responsive antes de tener estable el flujo base.

## Recomendación de alcance final para una entrega sólida

### Mínimo aceptable

- F1, F2, F3 y F4 completamente funcionales.
- Validaciones completas del formulario.
- Mensajes de error visuales.
- Integración estable con API local.
- Pruebas unitarias con al menos 70% coverage.

### Entrega sólida recomendada

- Todo el mínimo aceptable.
- F5 implementada y operativa.
- Navegación por rutas entre listado y formulario.
- Responsive básico usable.
- Manejo de carga y error consistente.

### Alcance extendido no prioritario

- F6 eliminación de producto.
- Skeletons más elaborados.
- Optimizaciones adicionales de rendimiento.

## Criterio de priorización sugerido

| Prioridad | Elementos |
|---|---|
| Alta | F1, F2, F3, F4, errores visuales, pruebas unitarias |
| Media | F5, rutas, responsive básico |
| Baja | F6, skeletons avanzados, refinamientos no críticos |

## Notas para implementación

- La meta de una entrega SemiSenior sólida debería ser cerrar obligatorios y sumar F5.
- Si el tiempo es limitado, preservar calidad y cobertura sobre cantidad de funcionalidades.
- El uso de rutas conviene incorporarlo temprano si se decide incluir F5.
