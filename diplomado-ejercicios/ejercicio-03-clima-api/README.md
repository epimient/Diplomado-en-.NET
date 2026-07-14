# Ejercicio 3 — API de Clima con Análisis Inteligente

**Módulo:** Desarrollo Web con ASP.NET Core
**Entrega:** Domingo de la semana 3, 11:59 PM
**Temas cubiertos:** ASP.NET Core Web API, controladores, EF Core, SQLite, DTOs, validaciones, HttpClient, consumo de APIs externas, integración con Groq (IA), Swagger

## Enunciado

Desarrollar una **API REST** que consulte datos climáticos de una API externa (OpenWeatherMap), los persista en SQLite y permita analizar tendencias climáticas usando inteligencia artificial (Groq + Llama 3).

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/api/clima/consultar?ciudad={nombre}` | Consulta clima actual, guarda en BD, devuelve resultado |
| `GET` | `/api/clima/historial?ciudad={nombre}` | Historial completo de consultas de una ciudad |
| `GET` | `/api/clima/historial?ciudad={nombre}&desde={fecha}&hasta={fecha}` | Historial filtrado por rango de fechas |
| `GET` | `/api/clima/estadisticas?ciudad={nombre}` | Promedio temp, temp max, temp min, humedad promedio |
| `POST` | `/api/clima/analizar?ciudad={nombre}` | Envía historial a Groq, devuelve análisis y recomendaciones |
| `DELETE` | `/api/clima/limpiar?ciudad={nombre}` | Elimina todo el historial de una ciudad |

## Modelos

### ClimaRecord (entidad EF Core)

| Propiedad | Tipo |
|---|---|
| Id | int (PK, autoincremental) |
| Ciudad | string |
| Temperatura | double |
| Humedad | int |
| Presion | int |
| Descripcion | string |
| VientoVelocidad | double |
| Icono | string |
| FechaConsulta | DateTime |

### DTOs

- **`ClimaResponse`** — datos devueltos al consultar (incluye todos los campos anteriores)
- **`HistorialResponse`** — lista de ClimaResponse + total de registros
- **`EstadisticasResponse`** — temperatura promedio, máxima, mínima, humedad promedio, cantidad de registros
- **`AnalisisResponse`** — datos del clima + campo `analisis` (string con respuesta de Groq)

## Requisitos técnicos

### 1. Configuración

- Proyecto ASP.NET Core Web API (controller-based, no Minimal API)
- EF Core + SQLite
- Swagger con Swashbuckle
- CORS habilitado

### 2. Consumo de API externa

- Usar `HttpClient` para consultar OpenWeatherMap
- Endpoint: `https://api.openweathermap.org/data/2.5/weather?q={ciudad}&appid={key}&units=metric&lang=es`
- La API key debe ir en `appsettings.json`, no quemada en código

### 3. Integración con IA (Groq)

- Endpoint: `POST https://api.groq.com/openai/v1/chat/completions`
- API Key en `appsettings.json`
- Modelo: `llama3-70b-8192` (o `mixtral-8x7b-32768`)
- Enviar el historial como contexto en el prompt
- Prompt sugerido:
  ```
  Eres un analista climático. Analiza la siguiente data de {ciudad} y da:
  1. Tendencia general (calentamiento/enfriamiento/estable)
  2. Recomendaciones para agricultura/salud/actividades al aire libre
  3. Patrón climático detectado
  
  Datos: {historial en formato JSON}
  ```

### 4. Validaciones

- `ciudad` es requerida (min 2 caracteres)
- Fechas deben tener formato `yyyy-MM-dd`
- `desde` no puede ser mayor que `hasta`
- Respuestas de error consistentes (400 con mensaje descriptivo)

### 5. Manejo de errores

- Si OpenWeatherMap no encuentra la ciudad → 404
- Si Groq falla → devolver los datos climáticos igual, con un campo `analisis` = "Servicio de IA no disponible"
- Si no hay historial para analizar → 400 con mensaje claro

## Criterios de evaluación

| Criterio | Peso |
|---|---|
| CRUD funcional (consultar, historial, estadísticas, limpiar) | 25% |
| Integración con OpenWeatherMap | 15% |
| Integración con Groq (IA) | 15% |
| EF Core + SQLite (migraciones, DbContext) | 15% |
| DTOs y validaciones | 10% |
| Swagger documentado | 10% |
| Manejo de errores y códigos HTTP correctos | 5% |
| Código limpio y organización | 5% |

## Sugerencias

- Registrarse en [OpenWeatherMap](https://openweathermap.org/api) para obtener API key gratis
- Registrarse en [Groq](https://console.groq.com) para obtener API key (tier gratuito generoso)
- Usar `AddHttpClient()` en Program.cs para inyectar HttpClient
- Para las migraciones: `dotnet ef migrations add InitialCreate` y `dotnet ef database update`
- Probar primero desde Swagger antes de integrar la IA
- El análisis de Groq puede tardar 1-3 segundos, es normal

## Formato de entrega

Carpeta `apellido-nombre/` dentro de `ejercicio-03-clima-api/` con:
- Proyecto completo
- Capturas de pantalla de Swagger mostrando:
  - `POST /api/clima/consultar` con ciudad válida → 200
  - `POST /api/clima/consultar` con ciudad inválida → 404
  - `GET /api/clima/historial` → lista de registros
  - `POST /api/clima/analizar` → respuesta con análisis IA
  - `DELETE /api/clima/limpiar` → 200
- Archivo `capturas.md` con las imágenes embebidas o enlaces
