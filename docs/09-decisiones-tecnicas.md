# Decisiones técnicas

## Propósito del documento

Registrar decisiones no explícitas en `reto.md` para que la implementación mantenga coherencia técnica. Todo lo listado aquí debe entenderse como `decisión técnica propuesta`, salvo cuando se cite expresamente un requisito del reto.

## Decisiones técnicas propuestas

| Decisión | Justificación |
|---|---|
| Usar Reactive Forms | Facilita validaciones complejas, formularios reutilizables y testing |
| Organizar la app por `core`, `shared` y `features` | Mejora cohesión y separa responsabilidades |
| Usar Angular standalone con `app.routes.ts` y `app.config.ts` | Define una estrategia de arranque y rutas concreta sin agregar módulos innecesarios |
| Mantener el modelo API con fechas como `string` en formato `YYYY-MM-DD` | Reduce fricción con el backend provisto |
| Implementar búsqueda sobre datos ya cargados | Es suficiente para el volumen esperado del reto |
| Centralizar manejo de errores HTTP | Evita duplicación y da consistencia visual |
| Implementar rutas aun siendo deseables | Simplifica alta y edición y alinea mejor la solución |
| Reutilizar un único formulario para crear y editar | Reduce duplicación y riesgo de inconsistencias |
| No implementar `products-facade.service` en la primera iteración | Evita sobrearquitectura mientras el feature siga siendo pequeño |

## Justificación ampliada

| Tema | Criterio |
|---|---|
| Simplicidad | El reto tiene alcance acotado y no requiere sobrearquitectura |
| Testabilidad | Validadores, formularios y servicios deben ser fácilmente testeables |
| Mantenibilidad | La entrevista técnica posterior exige poder defender decisiones con claridad |
| Escalabilidad razonable | F5 y F6 pueden incorporarse sin rehacer la base |

## Riesgos

| Decisión | Riesgo |
|---|---|
| Búsqueda local | Si el backend creciera mucho, podría no escalar |
| Reutilizar mismo formulario para crear/editar | Puede mezclar demasiadas condiciones si no se diseña bien |
| Agregar rutas desde el inicio | Aumenta configuración inicial aunque ordena la app |
| Mantener fechas como string | Requiere atención en validaciones de zona horaria |
| Postergar `products-facade.service` | Si la lógica crece y no se revisa a tiempo, puede concentrarse demasiada responsabilidad en páginas o servicios |

## Alternativas consideradas

| Alternativa | Motivo por el que no se prioriza |
|---|---|
| Template-driven forms | Menor control para validaciones complejas |
| Estado global desde el inicio | Complejidad innecesaria para el tamaño del reto |
| Componentes monolíticos | Dificultan pruebas, mantenimiento y responsabilidad única |
| Búsqueda remota | `reto.md` no la exige y aumentaría dependencias del flujo |
| Crear `products-facade.service` desde el arranque | Agrega una capa prematura para el alcance actual |

## Decisiones sobre diseño visual

| Decisión | Justificación |
|---|---|
| Usar CSS/SCSS propio | Requisito del encargo y evita frameworks UI |
| Basar layout en D1, D2, D3 y D4 | Requisito explícito del reto |
| Priorizar claridad de formularios y errores | El reto exige validaciones y errores visuales |
| Resolver responsive como deseable, no como bloqueo | `reto.md` lo marca como deseable |

## Decisiones sobre manejo de estado

| Decisión | Justificación |
|---|---|
| Estado local por feature | Suficiente para listado y formulario |
| Evitar store global al inicio | Reduce complejidad sin perder claridad |
| Actualizar listado desde resultados de operaciones exitosas | Simplifica sincronización |

## Decisiones sobre manejo de errores

| Decisión | Justificación |
|---|---|
| Diferenciar error de validación, error de red y error de negocio | Mejora comprensión del usuario |
| Mostrar errores por campo en formularios | Requisito explícito del reto |
| Mostrar error visual global para fallos de API | Requisito general de manejo de excepciones |
| Tratar `404` y `400` con mensajes específicos | Está documentado en el contrato API |

## Decisiones pendientes de confirmar durante la implementación

| Tema | Estado |
|---|---|
| Texto exacto de feedback de éxito | `decisión técnica propuesta` pendiente |
| Comportamiento posterior a crear o editar | `decisión técnica propuesta` pendiente |
| Estrategia concreta de precarga | `decisión técnica propuesta` pendiente |
| Nivel de responsive a entregar | `decisión técnica propuesta` pendiente |

## Notas para implementación

- Mantener este documento actualizado si se toma una decisión nueva no explícita en `reto.md`.
- Mantener la nomenclatura visible `Fecha de revisión` para `date_revision` en toda documentación funcional y visual.
- En caso de conflicto, prevalece siempre el requisito explícito del reto.
- Usar este documento como apoyo para justificar la solución en la entrevista técnica.
