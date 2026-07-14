# Dudas — Clase 12

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cuáles son los verbos HTTP más usados en REST?

- `GET` → Obtener recursos
- `POST` → Crear recursos
- `PUT` → Actualizar recursos completos
- `PATCH` → Actualizar parcialmente
- `DELETE` → Eliminar recursos

### ¿Qué significan los códigos de estado HTTP?

- `200 OK` → Solicitud exitosa
- `201 Created` → Recurso creado
- `204 No Content` → Éxito sin contenido (DELETE)
- `400 Bad Request` → Error del cliente
- `404 Not Found` → Recurso no encontrado
- `500 Internal Server Error` → Error del servidor

### ¿Qué es REST?

REST (Representational State Transfer) es un estilo arquitectónico para diseñar APIs. Se basa en recursos identificados por URLs, verbos HTTP estándar y comunicación sin estado (stateless).

### ¿Cómo crear un controlador en ASP.NET Core?

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new List<Producto>());
    }
}
```

### ¿Qué hace el atributo [ApiController]?

Habilita comportamientos automáticos como validación del modelo, inferencia de parámetros de ruta y respuestas de error estandarizadas (`400` automático si `ModelState` es inválido).

### ¿Cómo pasar parámetros a un endpoint?

```csharp
// Desde la ruta
[HttpGet("{id}")]
public IActionResult Get(int id) { ... }

// Desde query string
[HttpGet]
public IActionResult Get([FromQuery] string nombre) { ... }

// Desde el body
[HttpPost]
public IActionResult Post([FromBody] Producto producto) { ... }
```

### ¿Qué diferencia hay entre PUT y PATCH?

`PUT` reemplaza todo el recurso. `PATCH` aplica cambios parciales. Si solo quieres actualizar el precio de un producto, usa `PATCH` con solo ese campo.

### ¿Es obligatorio usar controladores? ¿Qué alternativas hay?

No es obligatorio. Puedes usar Minimal APIs (`MapGet`, `MapPost`, etc.) directamente en `Program.cs`. Los controladores ofrecen más organización para proyectos grandes.
