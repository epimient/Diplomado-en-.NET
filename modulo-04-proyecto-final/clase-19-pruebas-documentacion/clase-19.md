# Clase 19 — Pruebas y Documentación

> **Check-in 2 debe estar completado de la clase anterior.** Esta clase se enfoca en verificar, documentar y presentar el proyecto final.

## Objetivo

Verificar el funcionamiento de la API realizando pruebas desde Swagger UI, Thunder Client y curl, incluyendo el endpoint de IA con Groq, documentar todos los endpoints en un README profesional, tomar capturas de pantalla y grabar un video demo del proyecto.

---

## Contenido

### 1. Pruebas desde Swagger UI

Swagger UI es la interfaz gráfica que genera ASP.NET Core automáticamente. Permite probar todos los endpoints sin herramientas externas.

**Acceder a Swagger:**

```
http://localhost:5000/swagger
```

**Probar un endpoint GET:**

1. Abrir Swagger UI en el navegador
2. Localizar el endpoint deseado (ej: `GET /api/libros`)
3. Hacer clic en "Try it out"
4. Hacer clic en "Execute"
5. Verificar el código de respuesta (200 OK)
6. Verificar el cuerpo de la respuesta (JSON con los datos)

**Probar un endpoint POST:**

1. Localizar `POST /api/libros`
2. Hacer clic en "Try it out"
3. Editar el cuerpo JSON de la solicitud
4. Hacer clic en "Execute"
5. Verificar código 201 Created
6. Verificar que el `id` fue generado en la respuesta

**Probar un endpoint DELETE:**

1. Localizar `DELETE /api/libros/{id}`
2. Ingresar un ID existente
3. Ejecutar y verificar código 204 No Content
4. Intentar con un ID inexistente y verificar 404

### 2. Pruebas con Thunder Client

Thunder Client es una extensión de VS Code para probar APIs.

**Instalación:**
- Abrir VS Code
- Ir a Extensiones (Ctrl+Shift+X)
- Buscar "Thunder Client"
- Instalar y abrir desde la barra lateral

**Crear una colección de pruebas:**

| Petición | Método | URL | Body (si aplica) |
|----------|--------|-----|-----------------|
| Listar libros | GET | http://localhost:5000/api/libros | - |
| Obtener libro 1 | GET | http://localhost:5000/api/libros/1 | - |
| Crear libro | POST | http://localhost:5000/api/libros | JSON |
| Actualizar libro 1 | PUT | http://localhost:5000/api/libros/1 | JSON |
| Eliminar libro 1 | DELETE | http://localhost:5000/api/libros/1 | - |

**Ejemplo de petición POST en Thunder Client:**

```
URL: http://localhost:5000/api/libros
Method: POST
Headers:
  Content-Type: application/json
Body (JSON):
{
  "titulo": "El principito",
  "autorId": 1,
  "isbn": "978-84-376-0500-5",
  "anioPublicacion": 1943
}
```

### 3. Pruebas con curl

Curl es una herramienta de línea de comandos para hacer peticiones HTTP.

**GET todos los libros:**

```bash
curl -s http://localhost:5000/api/libros | python -m json.tool
```

**GET libro por ID:**

```bash
curl -s http://localhost:5000/api/libros/1 | python -m json.tool
```

**POST crear libro:**

```bash
curl -s -X POST http://localhost:5000/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"El principito","autorId":1,"anioPublicacion":1943}' | python -m json.tool
```

**PUT actualizar libro:**

```bash
curl -s -X PUT http://localhost:5000/api/libros/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Cien años de soledad (actualizado)","autorId":1,"anioPublicacion":1967,"disponible":true}' \
  -w "\nHTTP Status: %{http_code}\n"
```

**DELETE eliminar libro:**

```bash
curl -s -o /dev/null -w "HTTP Status: %{http_code}\n" -X DELETE http://localhost:5000/api/libros/1
```

**Script de prueba automatizada:**

```bash
#!/bin/bash

API_BASE="http://localhost:5000/api"

echo "=== Probando API de Biblioteca ==="

# 1. Listar libros
echo -e "\n1. GET /libros"
curl -s "$API_BASE/libros" | python -m json.tool | head -20

# 2. Crear libro
echo -e "\n2. POST /libros"
curl -s -X POST "$API_BASE/libros" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Libro de prueba","autorId":1,"anioPublicacion":2024}' | python -m json.tool

# 3. Obtener libro por ID
echo -e "\n3. GET /libros/1"
curl -s "$API_BASE/libros/1" | python -m json.tool

# 4. Actualizar libro
echo -e "\n4. PUT /libros/1"
curl -s -X PUT "$API_BASE/libros/1" \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Libro actualizado","autorId":1,"anioPublicacion":2024,"disponible":true}' \
  -w "\nStatus: %{http_code}\n"

# 5. Eliminar libro
echo -e "\n5. DELETE /libros/2"
curl -s -o /dev/null -w "Status: %{http_code}\n" -X DELETE "$API_BASE/libros/2"

echo -e "\n=== Pruebas completadas ==="
```

### 4. Pruebas del Endpoint de IA (Groq)

El endpoint de análisis con IA requiere una prueba especial porque depende de un servicio externo.

**Probar desde Swagger:**

1. Primero verificar que el endpoint `POST /api/reportes/{id}/analizar` aparece en Swagger
2. Crear un reporte con `POST /api/reportes` primero
3. Usar el ID del reporte creado para probar `POST /api/reportes/1/analizar`
4. Verificar que la respuesta incluye el campo `analisis` con texto de Groq
5. Probar con un ID inexistente para verificar el error 404

**Prueba con curl:**

```bash
# Primero crear un reporte
curl -s -X POST http://localhost:5000/api/reportes \
  -H "Content-Type: application/json" \
  -d '{"puntoReciclajeId":1,"usuario":"Carlos","observacion":"Botella plastica y una lata de aluminio"}' | python -m json.tool

# Luego analizar el reporte con IA
curl -s -X POST http://localhost:5000/api/reportes/1/analizar | python -m json.tool
```

**Casos de prueba para el endpoint IA:**

| Caso | Entrada | Respuesta esperada |
|------|---------|-------------------|
| Reporte existe con observación | POST /api/reportes/1/analizar | 200 + `analisis` con texto de Groq |
| Reporte no existe | POST /api/reportes/999/analizar | 404 Not Found |
| Sin conexión a Internet (simulado) | Desconectar red, ejecutar POST | 200 + `analisis: "Servicio de IA no disponible"` |

**Verificar el prompt:**
- El prompt debe estar adaptado al dominio del proyecto
- Debe pedir a Groq que clasifique, analice o recomiende según el contexto ODS
- Si la respuesta de Groq no es coherente, ajustar el `system prompt` o la temperatura

### 5. Documentar Endpoints en README.md

El README debe incluir una tabla clara de los endpoints.

**Ejemplo de tabla de endpoints:**

```markdown
## Endpoints de la API

### Puntos de Reciclaje

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/puntos-reciclaje` | Obtiene todos los puntos de reciclaje |
| GET | `/api/puntos-reciclaje/{id}` | Obtiene un punto por su ID |
| GET | `/api/puntos-reciclaje/buscar?tipo=&lat=&lng=` | Busca puntos con filtros |
| POST | `/api/puntos-reciclaje` | Crea un nuevo punto de reciclaje |
| PUT | `/api/puntos-reciclaje/{id}` | Actualiza un punto existente |
| DELETE | `/api/puntos-reciclaje/{id}` | Elimina un punto |

### Reportes

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/reportes` | Obtiene todos los reportes |
| GET | `/api/reportes/{id}` | Obtiene un reporte por su ID |
| POST | `/api/reportes` | Crea un nuevo reporte |
| POST | `/api/reportes/{id}/analizar` | Analiza el reporte con IA (Groq) |
| DELETE | `/api/reportes/{id}` | Elimina un reporte |
```

**Incluir ejemplos de JSON:**

```markdown
### Ejemplo de respuesta: GET /api/libros

```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "autorNombre": "Gabriel García Márquez",
    "isbn": "978-84-376-0494-7",
    "anioPublicacion": 1967,
    "disponible": true
  }
]
```

### Ejemplo de solicitud: POST /api/libros

```json
{
  "titulo": "El amor en los tiempos del cólera",
  "autorId": 1,
  "isbn": "978-84-376-0495-4",
  "anioPublicacion": 1985
}
```
```

### 5. README.md Profesional

Estructura recomendada para el README del proyecto final:

```markdown
# Nombre del Proyecto

Breve descripción del proyecto y su relación con el ODS seleccionado (2-3 líneas).

## Tecnologías Utilizadas

- C# / .NET 8
- ASP.NET Core Web API
- Entity Framework Core + SQLite
- Swagger / OpenAPI
- Groq API (IA - Llama 3)

## Requisitos Previos

- .NET SDK 8.0 o superior
- Visual Studio Code o Visual Studio Community
- API Key de Groq (https://console.groq.com)

## Instalación

```bash
git clone https://github.com/usuario/nombre-proyecto.git
cd nombre-proyecto/Api
dotnet restore
# Configurar API Key de Groq en appsettings.json
dotnet run
```

La API estará disponible en `http://localhost:5000` y Swagger en `http://localhost:5000/swagger`.

## Estructura del Proyecto

```
Api/
├── Controllers/       # Controladores de la API
├── Data/              # DbContext y SeedData
├── DTOs/              # Modelos de entrada y salida
├── Models/            # Entidades de la base de datos
├── Migrations/        # Migraciones de EF Core
├── Services/          # Servicios (GroqService, etc.)
├── Program.cs         # Punto de entrada
└── appsettings.json   # Configuración
```

## Endpoints

[Tabla de endpoints aquí]

## Capturas de Pantalla

![Swagger UI](screenshots/swagger.png)
![GET Puntos](screenshots/get-puntos.png)
![POST Reporte con IA](screenshots/post-reporte-ia.png)

## Video Demostración

[Enlace al video demo](https://youtube.com/...)

## Integrantes

- Nombre Apellido - Backend / TL
- Nombre Apellido - API / IA
- Nombre Apellido - BD / DTOs
- Nombre Apellido - Docs / QA

## Estado del Proyecto

Completado - Proyecto final del Diplomado en Programación con .NET
```

### 6. Capturas de Pantalla

Herramientas recomendadas para capturas:

| Herramienta | Plataforma |
|-------------|------------|
| Flameshot | Linux |
| Snipping Tool | Windows |
| Snip & Sketch | Windows |
| Shift+Cmd+4 | macOS |
| ShareX | Windows (avanzado) |

**Capturas mínimas requeridas:**
1. Swagger UI mostrando todos los endpoints
2. Respuesta exitosa de GET /api/entidad
3. Respuesta exitosa de POST /api/entidad
4. Respuesta exitosa de PUT /api/entidad
5. Respuesta exitosa de DELETE /api/entidad
6. Error 404 (recurso no encontrado)
7. Error 400 (validación fallida)
8. Endpoint de IA funcionando (POST /api/entidad/{id}/analizar con respuesta de Groq)

### 7. Video Demo

**Recomendaciones para el video:**

| Aspecto | Recomendación |
|---------|---------------|
| Duración | 3 a 5 minutos |
| Herramientas | OBS Studio, SimpleScreenRecorder, Windows Game Bar |
| Resolución | 1080p o 720p |
| Formato | MP4 |
| Audio | Claro, sin ruido de fondo |

**Estructura del video:**

1. **Presentación** (30s): Nombre del proyecto, ODS asociado, integrantes, tecnología
2. **Demostración de Swagger** (1-2min): Mostrar endpoints CRUD y probar operaciones
3. **Demo de IA** (1min): Probar el endpoint de Groq, mostrar el análisis generado
4. **Código relevante** (1min): Mostrar estructura del proyecto, GroqService, controladores
5. **Pruebas con curl o Thunder Client** (30s): Alternativa a Swagger
6. **Cierre** (30s): Conclusiones, aprendizajes, enlace al repositorio

**Subir el video:**
- YouTube (no listado o público)
- Google Drive
- GitHub Releases

---

## Ejemplo Práctico: Documentar API Eco-puntos con README y Probar Endpoints

1. Ejecutar `dotnet run` en la carpeta del proyecto
2. Abrir `http://localhost:5000/swagger` en el navegador
3. Probar cada endpoint del controlador de PuntosReciclaje (GET, POST, PUT, DELETE)
4. Probar el endpoint de IA: `POST /api/reportes/1/analizar` y verificar la respuesta de Groq
5. Probar casos de error: 404 con ID inexistente, 400 con datos inválidos
6. Probar los mismos endpoints con curl desde la terminal
7. Escribir el README.md completo con la documentación incluyendo la integración con IA
8. Tomar capturas de pantalla y subir a la carpeta `screenshots/`
9. Grabar y subir el video demo mostrando el CRUD y la funcionalidad de IA

---

## Ejercicios

### Nivel 1 — Básico

**Enunciado:** Prueba todos los endpoints de tu API desde Swagger UI, incluyendo el de IA.

**Requisitos:**
- Probar GET, POST, PUT, DELETE para cada entidad principal
- Probar el endpoint de IA (`POST /api/entidad/{id}/analizar`)
- Verificar códigos de respuesta correctos
- Probar casos de error (404, 400)
- Tomar 4 capturas de pantalla: CRUD exitoso + IA funcionando

**Entregable:** 4 capturas de pantalla mostrando respuestas desde Swagger.

**Criterios de evaluación:**
- Todos los endpoints funcionan correctamente
- El endpoint de IA devuelve análisis de Groq
- Los códigos de respuesta HTTP son correctos
- Los errores se manejan adecuadamente

### Nivel 2 — Intermedio

**Enunciado:** Escribe un README.md profesional para tu proyecto.

**Requisitos:**
- Incluir nombre, descripción, ODS asociado, tecnologías, instalación
- Tabla completa de todos los endpoints incluyendo el de IA con Groq
- Ejemplos de JSON de solicitud y respuesta (incluir respuesta del análisis IA)
- Capturas de pantalla embebidas (incluir una del endpoint IA)
- Sección de integrantes con roles (Backend/TL, API/IA, BD/DTOs, Docs/QA)

**Entregable:** Archivo `README.md` completo en la raíz del repositorio.

**Criterios de evaluación:**
- README está bien estructurado y formateado
- La tabla de endpoints incluye el de IA
- Los ejemplos JSON son precisos
- Las capturas de pantalla son visibles y relevantes

### Nivel 3 — Reto

**Enunciado:** Graba un video demo de tu proyecto y publícalo.

**Requisitos:**
- Grabar video de 3 a 5 minutos
- Mostrar la API funcionando desde Swagger (CRUD completo)
- Demostrar el endpoint de IA con Groq en funcionamiento
- Mostrar el código fuente (GroqService, controladores, modelos)
- Probar al menos un endpoint con curl o Thunder Client
- Incluir presentación inicial (nombre del proyecto, ODS, equipo) y cierre
- Subir a YouTube (público o no listado)
- Agregar el enlace al README.md

**Entregable:** Enlace al video demo en YouTube o Google Drive incluido en el README.

**Criterios de evaluación:**
- Video dentro del tiempo establecido
- Se muestra la API funcionando correctamente
- La demostración de IA es clara y funcional
- Se explica brevemente la estructura del proyecto
- El audio es claro y comprensible
- El enlace funciona y es accesible
