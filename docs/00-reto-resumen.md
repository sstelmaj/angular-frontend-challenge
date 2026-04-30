# Resumen del reto frontend Angular

## Resumen del reto

La prueba técnica solicita construir una aplicación frontend en Angular para gestionar productos financieros de un banco consumiendo un backend local ya provisto. El reto se enfoca en listado, búsqueda, control de cantidad de registros y creación de productos como alcance obligatorio para un perfil SemiSenior. La edición es deseable y la eliminación corresponde al alcance Senior.

## Objetivo general

Implementar una aplicación frontend que permita consultar y administrar productos financieros mediante integración con una API local, aplicando buenas prácticas, clean code, principios SOLID, validaciones de formulario, manejo visual de errores y pruebas unitarias con al menos 70% de coverage.

## Tecnologías requeridas

| Tema | Requisito |
|---|---|
| Framework | Angular 14 o superior |
| Lenguaje | TypeScript 4.8 o superior |
| Testing | Pruebas unitarias, con Jest |
| Backend a consumir | API local en `http://localhost:3002` |
| Estilos | UI propia sin frameworks de estilos ni componentes prefabricados |

## Restricciones principales

| Restricción | Fuente |
|---|---|
| Aplicar buenas prácticas, clean code y SOLID | `reto.md` |
| No usar frameworks de estilos ni componentes prefabricados | `reto.md` |
| Mostrar errores visuales y manejar excepciones | `reto.md` |
| Alcanzar mínimo 70% de coverage en pruebas unitarias | `reto.md` |
| Consumir servicios locales del backend provisto | `reto.md` |
| No desarrollar backend propio | contexto del encargo |
| Usar CSS/SCSS propio | contexto del encargo |
| No implementar todavía componentes ni código Angular en esta etapa | contexto del encargo |

## Entregables

| Entregable | Detalle |
|---|---|
| Aplicación frontend | Implementación funcional según seniority objetivo |
| Repositorio Git público | Debe enviarse la ruta del repositorio |
| Entrega en fecha | Debe enviarse antes de la fecha y hora indicadas |
| Defensa técnica posterior | El candidato deberá defender la solución en entrevista técnica |

## Criterios importantes de evaluación

| Criterio | Impacto esperado |
|---|---|
| Cumplimiento funcional por seniority | Para SemiSenior son obligatorias F1, F2, F3 y F4 |
| Calidad técnica | Se evaluarán clean code y SOLID |
| Calidad visual | Se espera maquetación basada en los diseños D1, D2, D3 y D4 según corresponda |
| Validaciones | El formulario debe validar cada campo y mostrar errores visuales |
| Integración API | Debe consumir correctamente los endpoints locales provistos |
| Testing | Debe alcanzar mínimo 70% de coverage |
| Deseables | Rendimiento, skeletons y responsive design |

## Clasificación inicial del alcance

| Nivel | Funcionalidades |
|---|---|
| Obligatorio SemiSenior | F1 Listado, F2 Búsqueda, F3 Cantidad de registros, F4 Agregar producto |
| Deseable SemiSenior | F5 Editar producto, uso de rutas |
| Opcional para SemiSenior | F6 Eliminar producto |

## Notas para implementación

- Mantener trazabilidad entre cada requisito documentado y `reto.md`.
- Tratar como obligatoria la cobertura mínima de pruebas desde el inicio y no al final.
- Evitar agregar alcance no pedido antes de completar F1 a F4.
- Si se adoptan decisiones no explícitas en el reto, documentarlas como `decisión técnica propuesta`.
