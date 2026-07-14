# Clase 20 — Presentación Final

## Objetivo

Preparar y realizar la presentación final del proyecto, demostrar el funcionamiento de la API en vivo, presentar la estructura del código y los aprendizajes obtenidos durante el diplomado, y entregar todos los artefactos del proyecto.

---

## Contenido

### 1. Preparar la Presentación

La presentación final es el momento de mostrar el trabajo realizado durante las 4 semanas del diplomado. Cada equipo debe preparar una presentación de 10 a 15 minutos que incluya:

- Explicación del problema o necesidad
- Solución desarrollada
- Demostración en vivo de la API
- Revisión del código y la arquitectura
- Aprendizajes y conclusiones
- Preguntas del público

**Herramientas recomendadas:**

| Herramienta | Uso |
|-------------|-----|
| PowerPoint / Google Slides | Slides de presentación |
| Canva | Plantillas visuales modernas |
| LibreOffice Impress | Alternativa gratuita |
| Swagger UI | Demo en vivo de la API |
| VS Code | Mostrar código fuente |

### 2. Demo en Vivo

La demostración en vivo es la parte más importante de la presentación. Debe ser fluida y mostrar las funcionalidades clave.

**Checklist para el demo:**

- [ ] La aplicación compila sin errores (`dotnet build`)
- [ ] La aplicación se ejecuta correctamente (`dotnet run`)
- [ ] Swagger UI carga correctamente en `http://localhost:5000/swagger`
- [ ] Los datos de prueba están cargados (seed data)
- [ ] GET funciona para listar registros
- [ ] POST funciona para crear un nuevo registro
- [ ] PUT funciona para actualizar un registro
- [ ] DELETE funciona para eliminar un registro
- [ ] Los casos de error se manejan correctamente (404, 400)
- [ ] Los filtros o búsqueda funcionan (si aplica)

**Consejos para el demo:**

- Tener la aplicación corriendo antes de comenzar
- Usar datos de prueba que sean fáciles de leer
- No apresurarse, explicar cada paso
- Preparar datos específicos para crear durante el demo
- Tener un plan B si algo falla (capturas, video grabado)
- Practicar al menos 3 veces antes del día

### 3. Estructura de la Presentación

**Diapositiva 1 — Portada**
- Nombre del proyecto
- Logo (opcional)
- Integrantes del equipo
- Fecha

**Diapositiva 2 — Problema**
- ¿Qué problema resuelve el proyecto?
- ¿Por qué es útil?
- Contexto real de uso

**Diapositiva 3 — Solución Propuesta**
- Descripción general del sistema
- Tecnologías utilizadas
- Arquitectura de la solución

**Diapositiva 4 — Tecnologías**
- .NET 8 / ASP.NET Core
- Entity Framework Core + SQLite
- Swagger / OpenAPI
- Git + GitHub

**Diapositiva 5 — Modelo de Datos**
- Diagrama de entidades y relaciones
- Explicación de cada entidad
- Relaciones entre entidades

**Diapositiva 6 — Endpoints de la API**
- Tabla con métodos HTTP y URLs
- Breve descripción de cada endpoint
- Ejemplo de JSON de respuesta

**Diapositiva 7 — Demo en Vivo**
- Mostrar Swagger UI
- Realizar operaciones CRUD
- Mostrar respuestas JSON
- Mostrar manejo de errores

**Diapositiva 8 — Código Destacado**
- Estructura del proyecto
- Fragmento del controlador más importante
- Fragmento del modelo o DTO
- Configuración del DbContext

**Diapositiva 9 — Aprendizajes**
- ¿Qué aprendió cada integrante?
- ¿Cuál fue el mayor desafío?
- ¿Cómo se resolvió?
- ¿Qué mejorarían?

**Diapositiva 10 — Cierre**
- Enlace al repositorio de GitHub
- Enlace al video demo
- Agradecimientos
- Preguntas

### 4. Checklist de Entrega Final

**Repositorio de GitHub:**

- [ ] README.md completo y profesional
- [ ] Tabla de endpoints documentada
- [ ] Ejemplos JSON de solicitud y respuesta
- [ ] Capturas de pantalla en carpeta `screenshots/`
- [ ] Enlace al video demo en el README

**Código Fuente:**

- [ ] Solución compila sin errores (`dotnet build`)
- [ ] Al menos 2 entidades relacionadas
- [ ] CRUD completo por entidad principal
- [ ] DTOs de entrada y salida
- [ ] Validaciones con Data Annotations
- [ ] DbContext configurado correctamente
- [ ] Migraciones generadas y aplicadas
- [ ] Seed data funcional
- [ ] Swagger configurado y documentado
- [ ] Manejo básico de errores (404, 400)

**Presentación:**

- [ ] Slides preparados (10-15 diapositivas)
- [ ] Demo en vivo practicado
- [ ] Video demo grabado (3-5 minutos)
- [ ] Capturas de pantalla tomadas

**Documentación:**

- [ ] README.md con toda la información
- [ ] Endpoints documentados
- [ ] Ejemplos de uso

### 5. Criterios de Evaluación

| Criterio | Peso | Descripción |
|----------|------|-------------|
| Funcionalidad | 30% | La API funciona correctamente, todos los endpoints responden, el CRUD está completo |
| Uso correcto de C# y .NET | 20% | Código limpio, POO aplicada, uso correcto deasync/await, inyección de dependencias |
| Base de datos y persistencia | 15% | Modelos correctos, relaciones bien definidas, migraciones, seed data, SQLite funcional |
| API REST y Swagger | 15% | Endpoints RESTful, DTOs, validaciones, Swagger documentado |
| Documentación | 10% | README profesional, capturas, ejemplos, tabla de endpoints |
| Presentación | 10% | Slides claros, demo fluido, explicación del proyecto, respuestas a preguntas |

**Rúbrica de evaluación detallada:**

| Criterio | Excelente (100%) | Bueno (75%) | Regular (50%) | Insuficiente (25%) |
|----------|-----------------|-------------|---------------|-------------------|
| Funcionalidad | Todos los endpoints funcionan, CRUD completo, manejo de errores | La mayoría funciona, algún error menor | Varios endpoints no funcionan | No funciona o CRUD incompleto |
| Código C# | POO correcta, async/await, DI, código limpio | Buen uso, algún detalle menor | Errores en POO o async | Código desordenado, sin POO |
| Base de datos | Modelos, relaciones, migraciones, seed data | Todo presente con algún detalle | Faltan relaciones o seed data | Sin migraciones o BD no funcional |
| API REST | RESTful, DTOs, validaciones, Swagger | Casi completo, falta algún DTO | Faltan validaciones o Swagger | No es RESTful, sin DTOs |
| Documentación | README completo, capturas, video | README bueno, falta video | README incompleto | Sin README significativo |
| Presentación | Slides, demo fluido, responde bien | Buena presentación, demo con fallas | Presentación básica | Sin presentación o demo |

### 6. Guía para una Presentación Exitosa

**Antes de la presentación:**

- Practicar la demo al menos 3 veces
- Probar la aplicación en la máquina que se usará para la presentación
- Tener la terminal y el navegador listos con la aplicación corriendo
- Preparar datos de prueba que sean fáciles de leer
- Tener capturas de pantalla de respaldo por si falla el demo

**Durante la presentación:**

- Hablar claro y pausado
- No leer las diapositivas, explicar con sus palabras
- Enfocarse en lo que hace el proyecto, no solo en cómo lo hizo
- Mostrar primero el resultado (la API funcionando) y luego el código
- Si algo falla en el demo, mantener la calma y pasar a la siguiente parte

**Después de la presentación:**

- Subir la presentación a GitHub (opcional)
- Agregar el enlace del video al README si no se había hecho
- Agradecer al público y al instructor

**Errores comunes y cómo evitarlos:**

| Error | Solución |
|-------|----------|
| La aplicación no compila | Hacer `dotnet build` antes de la presentación |
| Swagger no carga | Verificar que la app esté corriendo y el puerto correcto |
| El demo es muy largo | Practicar con cronómetro, priorizar lo esencial |
| No se entiende el problema | Explicar el contexto brevemente al inicio |
| El equipo no coordina | Asignar quién habla de cada parte |
| Los datos de prueba no son claros | Usar nombres y datos reconocibles |

### 7. Checklist del Día de la Presentación

- [ ] Llegar temprano para configurar el equipo
- [ ] Tener la aplicación corriendo antes de comenzar
- [ ] Tener las diapositivas abiertas y listas
- [ ] Tener Swagger abierto en el navegador
- [ ] Tener VS Code abierto con el código
- [ ] Tener el repositorio de GitHub abierto
- [ ] Tener el video demo como respaldo
- [ ] Distribuir los temas entre los integrantes
- [ ] Preparar 2 o 3 preguntas frecuentes y sus respuestas

---

## Ejemplo Práctico: Guía de Presentación Exitosa

**Equipo:** Los desarrolladores

**Proyecto:** Sistema de Biblioteca API

**Duración:** 12 minutos

**Distribución del tiempo:**
- 0:00 - 1:30: Introducción y problema (Integrante 1)
- 1:30 - 3:00: Solución y tecnología (Integrante 2)
- 3:00 - 4:30: Modelo de datos (Integrante 1)
- 4:30 - 8:00: Demo en vivo (Integrante 2)
- 8:00 - 9:30: Código destacado (Integrante 1)
- 9:30 - 10:30: Aprendizajes (ambos)
- 10:30 - 12:00: Preguntas (ambos)

**Posibles preguntas y respuestas:**

1. **¿Por qué usaron SQLite en lugar de SQL Server?**
   - SQLite es ligera, no requiere instalación de servidor, es ideal para proyectos educativos y portátiles.

2. **¿Cómo manejan la concurrencia si dos usuarios intentan prestar el mismo libro?**
   - Podríamos usar una transacción y verificar la propiedad `Disponible` antes de crear el préstamo.

3. **¿Qué mejorarían para una versión 2.0?**
   - Agregar autenticación JWT, página web con Blazor, reportes, notificaciones por email.

---

## Ejercicios

### Nivel 1 — Básico

**Enunciado:** Prepara los slides de presentación de tu proyecto final.

**Requisitos:**
- Crear entre 8 y 12 diapositivas
- Incluir portada, problema, solución, tecnologías, demo, aprendizajes
- Usar una plantilla visual limpia y profesional
- Incluir los nombres de los integrantes
- Mantener consistencia visual en todas las diapositivas

**Entregable:** Archivo de presentación en PDF, PPTX o enlace a Google Slides.

**Criterios de evaluación:**
- Cubre todos los temas requeridos
- Diseño limpio y profesional
- Información clara y concisa
- Sin errores ortográficos

### Nivel 2 — Intermedio

**Enunciado:** Ensaya la demo del proyecto y prepárate para la presentación.

**Requisitos:**
- Practicar la demo completa al menos 3 veces
- Cronometrar la presentación (debe durar entre 10 y 15 minutos)
- Preparar respuestas para 3 preguntas técnicas potenciales
- Probar la aplicación en la máquina de presentación
- Tener plan de respaldo (capturas, video grabado)

**Entregable:** No hay archivo, pero el equipo debe demostrar preparación durante la presentación.

**Criterios de evaluación:**
- La demo funciona sin interrupciones
- El tiempo está dentro del rango establecido
- Responden preguntas técnicas con claridad
- Muestran confianza y preparación

### Nivel 3 — Reto

**Enunciado:** Graba el video final del proyecto y súbelo a GitHub junto con todos los artefactos.

**Requisitos:**
- Grabar video de 3 a 5 minutos del proyecto funcionando
- El video debe incluir: presentación, demo de la API, recorrido del código, cierre
- Subir el video a YouTube (público o no listado)
- Agregar el enlace al README.md
- Asegurar que el repositorio tiene todos los artefactos finales:
  - Código fuente completo
  - README.md profesional
  - Capturas de pantalla
  - Video demo
  - Presentación (opcional)

**Entregable:** Repositorio de GitHub completo y enlace al video demo en el README.

**Criterios de evaluación:**
- Video demo profesional y bien editado
- Repositorio completo con todos los artefactos
- README actualizado con enlace al video
- Proyecto funcional y bien documentado
- Todo el código está en el repositorio (sin archivos temporales)
