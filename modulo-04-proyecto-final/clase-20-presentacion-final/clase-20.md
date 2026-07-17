# Clase 20 — Presentación Final

> **Check-ins completados:** Semana 4 finalizada. Todos los artefactos deben estar en el repositorio: código, README, capturas, video y presentación.

## Objetivo

Preparar y realizar la presentación final del proyecto, demostrar el funcionamiento de la API en vivo (incluyendo la integración con IA), presentar la estructura del código y los aprendizajes obtenidos durante el diplomado, y entregar todos los artefactos del proyecto.

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
- [ ] El endpoint de IA (Groq) responde con análisis coherente
- [ ] La API Key de Groq está configurada en `appsettings.json`
- [ ] El servicio de IA no se cae si Groq no responde (manejo de errores)

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
- Groq API (Llama 3)
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
- [ ] GroqService implementado con HttpClient
- [ ] Endpoint de análisis con IA funcional
- [ ] Manejo de fallo de Groq (Servicio de IA no disponible)

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
| Funcionalidad | 30% | La API funciona correctamente, CRUD completo, endpoint de IA (Groq) funcional |
| Uso correcto de C# y .NET | 20% | Código limpio, POO aplicada, async/await, inyección de dependencias, HttpClient |
| Base de datos y persistencia | 15% | Modelos correctos, relaciones, migraciones, seed data, SQLite funcional |
| API REST y Swagger | 15% | Endpoints RESTful, DTOs, validaciones, Swagger documentado, integración con IA |
| Documentación | 10% | README profesional, capturas (incluyendo IA), ejemplos, tabla de endpoints |
| Presentación | 10% | Slides claros, demo fluido con IA, explicación del proyecto, respuestas a preguntas |

**Rúbrica de evaluación detallada:**

| Criterio | Excelente (100%) | Bueno (75%) | Regular (50%) | Insuficiente (25%) |
|----------|-----------------|-------------|---------------|-------------------|
| Funcionalidad | CRUD completo, IA funcional, manejo de errores | Todo funciona, IA con fallas menores | Varios endpoints no funcionan o IA no integrada | No funciona o CRUD incompleto |
| Código C# | POO, async/await, DI, HttpClient, código limpio | Buen uso, algún detalle menor | Errores en POO, async o HttpClient | Código desordenado, sin POO |
| Base de datos | Modelos, relaciones, migraciones, seed data | Todo presente con algún detalle | Faltan relaciones o seed data | Sin migraciones o BD no funcional |
| API REST | RESTful, DTOs, validaciones, Swagger, IA integrada | Casi completo, falta algún DTO o detalle IA | Faltan validaciones, Swagger o IA | No es RESTful, sin DTOs ni IA |
| Documentación | README completo, capturas (incluye IA), video | README bueno, falta video o captura IA | README incompleto | Sin README significativo |
| Presentación | Slides, demo fluido con IA, responde bien | Buena presentación, demo con fallas | Presentación básica | Sin presentación o demo |

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
| El endpoint IA no responde | Verificar API Key de Groq en `appsettings.json` y conexión a Internet |
| El demo es muy largo | Practicar con cronómetro, priorizar lo esencial |
| No se entiende el problema o el ODS | Explicar el contexto brevemente al inicio |
| El equipo no coordina | Asignar quién habla de cada parte |
| Los datos de prueba no son claros | Usar nombres y datos reconocibles |
| La IA da respuestas incoherentes | Revisar el prompt, probar con temperatura más baja |

### 7. Checklist del Día de la Presentación

- [ ] Llegar temprano para configurar el equipo
- [ ] Tener la aplicación corriendo antes de comenzar
- [ ] Tener las diapositivas abiertas y listas
- [ ] Tener Swagger abierto en el navegador
- [ ] Tener VS Code abierto con el código (GroqService visible)
- [ ] Tener el repositorio de GitHub abierto
- [ ] Tener el video demo como respaldo
- [ ] Verificar que la API Key de Groq está configurada
- [ ] Probar el endpoint IA antes de comenzar (Groq necesita Internet)
- [ ] Distribuir los temas entre los integrantes según roles
- [ ] Preparar 2 o 3 preguntas frecuentes sobre el proyecto y su ODS

---

## Ejemplo Práctico: Guía de Presentación Exitosa

**Equipo:** Eco-puntos Devs

**Proyecto:** Eco-puntos API — Clasificador de residuos (ODS 12)

**Duración:** 12 minutos

**Distribución del tiempo:**
- 0:00 - 1:30: Introducción y problema ODS (Docs/QA)
- 1:30 - 3:00: Solución y tecnologías (Backend/TL)
- 3:00 - 4:30: Modelo de datos y BD (BD/DTOs)
- 4:30 - 7:00: Demo en vivo — CRUD e IA (API/IA)
- 7:00 - 8:30: Código destacado — GroqService (API/IA)
- 8:30 - 10:00: Aprendizajes (todo el equipo)
- 10:00 - 12:00: Preguntas (todo el equipo)

**Posibles preguntas y respuestas:**

1. **¿Por qué eligieron este proyecto y qué ODS aborda?**
   - Elegimos Eco-puntos porque el reciclaje es un problema cotidiano. Aborda el ODS 12 (Producción y consumo responsables) al facilitar la ubicación de puntos de reciclaje y clasificar residuos con IA.

2. **¿Cómo funciona la integración con Groq y por qué usar IA?**
   - Groq permite clasificar automáticamente los residuos reportados por los usuarios usando el modelo Llama 3. Esto evita que el usuario tenga que saber de antemano si un residuo es reciclable.

3. **¿Qué pasa si Groq no está disponible?**
   - La API maneja la excepción y responde con "Servicio de IA no disponible" sin bloquear el resto de la funcionalidad. El CRUD sigue funcionando independientemente.

4. **¿Qué mejorarían para una versión 2.0?**
   - Agregar autenticación, mapas interactivos, notificaciones cuando se agreguen nuevos puntos de reciclaje, y soporte para fotos en los reportes.

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

**Enunciado:** Ensaya la demo del proyecto incluyendo la integración con IA.

**Requisitos:**
- Practicar la demo completa al menos 3 veces (incluyendo el endpoint IA)
- Cronometrar la presentación (debe durar entre 10 y 15 minutos)
- Verificar que la API Key de Groq funciona en la máquina de presentación
- Preparar respuestas para 3 preguntas técnicas: una sobre IA/Groq, una sobre BD, una sobre el ODS
- Probar la aplicación en la máquina de presentación
- Tener plan de respaldo (capturas del endpoint IA, video grabado)

**Entregable:** No hay archivo, pero el equipo debe demostrar preparación durante la presentación.

**Criterios de evaluación:**
- La demo funciona sin interrupciones (CRUD + IA)
- El tiempo está dentro del rango establecido
- Responden preguntas técnicas con claridad (especialmente sobre la IA)
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
