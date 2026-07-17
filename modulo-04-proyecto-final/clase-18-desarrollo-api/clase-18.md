# Clase 18 — Desarrollo de la API

> **Check-in 2 obligatorio:** Al finalizar esta clase el repositorio debe tener CRUD completo, IA integrada (Groq) y Swagger funcionando. Sin avance real = -0.2 en nota final.

## Objetivo

Implementar los controladores REST con CRUD completo, crear DTOs de entrada y salida, aplicar validaciones con Data Annotations, configurar Swagger e integrar la API con inteligencia artificial (Groq).

---

## Contenido

### 1. Controladores REST

Los controladores manejan las peticiones HTTP y devuelven respuestas. Cada controlador se enfoca en una entidad.

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Api.Data;
using Api.Models;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LibrosController : ControllerBase
{
    private readonly AppDbContext _context;

    public LibrosController(AppDbContext context)
    {
        _context = context;
    }
}
```

**Estructura de un controlador:**
- Hereda de `ControllerBase`
- Decorado con `[ApiController]` y `[Route]`
- Recibe el `DbContext` por inyección de dependencias
- Cada método público es un endpoint

### 2. DTOs de Entrada y Salida

Los DTOs (Data Transfer Objects) separan los datos que expone la API del modelo interno.

**DTO de salida para Libro:**

```csharp
namespace Api.DTOs;

public class LibroDTO
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string AutorNombre { get; set; } = string.Empty;
    public string? ISBN { get; set; }
    public int AnioPublicacion { get; set; }
    public bool Disponible { get; set; }
}
```

**DTO de entrada para crear Libro:**

```csharp
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class LibroCreateDTO
{
    [Required(ErrorMessage = "El título es obligatorio")]
    [MaxLength(200, ErrorMessage = "El título no puede exceder 200 caracteres")]
    public string Titulo { get; set; } = string.Empty;

    [Required(ErrorMessage = "El autor es obligatorio")]
    public int AutorId { get; set; }

    [MaxLength(20)]
    public string? ISBN { get; set; }

    [Range(1400, 2030, ErrorMessage = "Año de publicación inválido")]
    public int AnioPublicacion { get; set; }
}
```

**DTO de entrada para actualizar Libro:**

```csharp
namespace Api.DTOs;

public class LibroUpdateDTO
{
    [Required]
    [MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    [Required]
    public int AutorId { get; set; }

    [MaxLength(20)]
    public string? ISBN { get; set; }

    [Range(1400, 2030)]
    public int AnioPublicacion { get; set; }

    public bool Disponible { get; set; }
}
```

### 3. Implementar CRUD Completo

**GET — Obtener todos los libros:**

```csharp
[HttpGet]
public async Task<ActionResult<IEnumerable<LibroDTO>>> GetLibros()
{
    var libros = await _context.Libros
        .Include(l => l.Autor)
        .Select(l => new LibroDTO
        {
            Id = l.Id,
            Titulo = l.Titulo,
            AutorNombre = $"{l.Autor.Nombre} {l.Autor.Apellido}",
            ISBN = l.ISBN,
            AnioPublicacion = l.AnioPublicacion,
            Disponible = l.Disponible
        })
        .ToListAsync();

    return Ok(libros);
}
```

**GET — Obtener libro por ID:**

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<LibroDTO>> GetLibro(int id)
{
    var libro = await _context.Libros
        .Include(l => l.Autor)
        .Where(l => l.Id == id)
        .Select(l => new LibroDTO
        {
            Id = l.Id,
            Titulo = l.Titulo,
            AutorNombre = $"{l.Autor.Nombre} {l.Autor.Apellido}",
            ISBN = l.ISBN,
            AnioPublicacion = l.AnioPublicacion,
            Disponible = l.Disponible
        })
        .FirstOrDefaultAsync();

    if (libro == null)
        return NotFound(new { mensaje = "Libro no encontrado" });

    return Ok(libro);
}
```

**POST — Crear un nuevo libro:**

```csharp
[HttpPost]
public async Task<ActionResult<LibroDTO>> PostLibro(LibroCreateDTO libroDto)
{
    var autor = await _context.Autores.FindAsync(libroDto.AutorId);
    if (autor == null)
        return BadRequest(new { mensaje = "El autor especificado no existe" });

    var libro = new Libro
    {
        Titulo = libroDto.Titulo,
        AutorId = libroDto.AutorId,
        ISBN = libroDto.ISBN,
        AnioPublicacion = libroDto.AnioPublicacion,
        Disponible = true
    };

    _context.Libros.Add(libro);
    await _context.SaveChangesAsync();

    var libroSalida = new LibroDTO
    {
        Id = libro.Id,
        Titulo = libro.Titulo,
        AutorNombre = $"{autor.Nombre} {autor.Apellido}",
        ISBN = libro.ISBN,
        AnioPublicacion = libro.AnioPublicacion,
        Disponible = libro.Disponible
    };

    return CreatedAtAction(nameof(GetLibro), new { id = libro.Id }, libroSalida);
}
```

**PUT — Actualizar un libro:**

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> PutLibro(int id, LibroUpdateDTO libroDto)
{
    var libro = await _context.Libros.FindAsync(id);
    if (libro == null)
        return NotFound(new { mensaje = "Libro no encontrado" });

    var autor = await _context.Autores.FindAsync(libroDto.AutorId);
    if (autor == null)
        return BadRequest(new { mensaje = "El autor especificado no existe" });

    libro.Titulo = libroDto.Titulo;
    libro.AutorId = libroDto.AutorId;
    libro.ISBN = libroDto.ISBN;
    libro.AnioPublicacion = libroDto.AnioPublicacion;
    libro.Disponible = libroDto.Disponible;

    await _context.SaveChangesAsync();

    return NoContent();
}
```

**DELETE — Eliminar un libro:**

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> DeleteLibro(int id)
{
    var libro = await _context.Libros.FindAsync(id);
    if (libro == null)
        return NotFound(new { mensaje = "Libro no encontrado" });

    _context.Libros.Remove(libro);
    await _context.SaveChangesAsync();

    return NoContent();
}
```

### 4. Endpoint Adicional: Buscar y Filtrar

```csharp
[HttpGet("buscar")]
public async Task<ActionResult<IEnumerable<LibroDTO>>> BuscarLibros(
    [FromQuery] string? titulo,
    [FromQuery] int? autorId,
    [FromQuery] bool? disponible)
{
    var query = _context.Libros.Include(l => l.Autor).AsQueryable();

    if (!string.IsNullOrWhiteSpace(titulo))
        query = query.Where(l => l.Titulo.Contains(titulo));

    if (autorId.HasValue)
        query = query.Where(l => l.AutorId == autorId.Value);

    if (disponible.HasValue)
        query = query.Where(l => l.Disponible == disponible.Value);

    var libros = await query
        .Select(l => new LibroDTO
        {
            Id = l.Id,
            Titulo = l.Titulo,
            AutorNombre = $"{l.Autor.Nombre} {l.Autor.Apellido}",
            ISBN = l.ISBN,
            AnioPublicacion = l.AnioPublicacion,
            Disponible = l.Disponible
        })
        .ToListAsync();

    return Ok(libros);
}
```

### 5. Controlador de Autores

**AutorDTO:**

```csharp
namespace Api.DTOs;

public class AutorDTO
{
    public int Id { get; set; }
    public string NombreCompleto { get; set; } = string.Empty;
    public string Nacionalidad { get; set; } = string.Empty;
    public int CantidadLibros { get; set; }
}
```

**AutorCreateDTO:**

```csharp
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class AutorCreateDTO
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El apellido es obligatorio")]
    [MaxLength(100)]
    public string Apellido { get; set; } = string.Empty;

    public DateTime FechaNacimiento { get; set; }

    [MaxLength(50)]
    public string Nacionalidad { get; set; } = string.Empty;
}
```

**Controlador de Autores:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class AutoresController : ControllerBase
{
    private readonly AppDbContext _context;

    public AutoresController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AutorDTO>>> GetAutores()
    {
        var autores = await _context.Autores
            .Include(a => a.Libros)
            .Select(a => new AutorDTO
            {
                Id = a.Id,
                NombreCompleto = $"{a.Nombre} {a.Apellido}",
                Nacionalidad = a.Nacionalidad,
                CantidadLibros = a.Libros.Count
            })
            .ToListAsync();

        return Ok(autores);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AutorDTO>> GetAutor(int id)
    {
        var autor = await _context.Autores
            .Include(a => a.Libros)
            .Where(a => a.Id == id)
            .Select(a => new AutorDTO
            {
                Id = a.Id,
                NombreCompleto = $"{a.Nombre} {a.Apellido}",
                Nacionalidad = a.Nacionalidad,
                CantidadLibros = a.Libros.Count
            })
            .FirstOrDefaultAsync();

        if (autor == null)
            return NotFound(new { mensaje = "Autor no encontrado" });

        return Ok(autor);
    }

    [HttpPost]
    public async Task<ActionResult<AutorDTO>> PostAutor(AutorCreateDTO autorDto)
    {
        var autor = new Autor
        {
            Nombre = autorDto.Nombre,
            Apellido = autorDto.Apellido,
            FechaNacimiento = autorDto.FechaNacimiento,
            Nacionalidad = autorDto.Nacionalidad
        };

        _context.Autores.Add(autor);
        await _context.SaveChangesAsync();

        var autorSalida = new AutorDTO
        {
            Id = autor.Id,
            NombreCompleto = $"{autor.Nombre} {autor.Apellido}",
            Nacionalidad = autor.Nacionalidad,
            CantidadLibros = 0
        };

        return CreatedAtAction(nameof(GetAutor), new { id = autor.Id }, autorSalida);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAutor(int id, AutorCreateDTO autorDto)
    {
        var autor = await _context.Autores.FindAsync(id);
        if (autor == null)
            return NotFound(new { mensaje = "Autor no encontrado" });

        autor.Nombre = autorDto.Nombre;
        autor.Apellido = autorDto.Apellido;
        autor.FechaNacimiento = autorDto.FechaNacimiento;
        autor.Nacionalidad = autorDto.Nacionalidad;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAutor(int id)
    {
        var autor = await _context.Autores.FindAsync(id);
        if (autor == null)
            return NotFound(new { mensaje = "Autor no encontrado" });

        _context.Autores.Remove(autor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
```

### 6. Validaciones con Data Annotations

| Atributo | Uso |
|----------|-----|
| `[Required]` | Campo obligatorio |
| `[MaxLength(n)]` | Longitud máxima de caracteres |
| `[MinLength(n)]` | Longitud mínima de caracteres |
| `[Range(min, max)]` | Rango numérico válido |
| `[EmailAddress]` | Formato de email |
| `[RegularExpression]` | Patrón personalizado |
| `[Compare]` | Comparar con otra propiedad |

### 7. Configurar Swagger

Swagger se configura en `Program.cs` y genera documentación interactiva.

```csharp
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Sistema de Biblioteca API",
        Version = "v1",
        Description = "API REST para gestionar una biblioteca. Permite administrar libros, autores y préstamos.",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Equipo de Desarrollo",
            Email = "equipo@biblioteca.com"
        }
    });
});
```

### 8. Integración con IA (Groq)

El proyecto final debe incluir un endpoint de análisis con inteligencia artificial usando la API de Groq (gratis, sin tarjeta de crédito).

**Registro en Groq:**
1. Ir a https://console.groq.com
2. Crear cuenta gratuita
3. Ir a API Keys y generar una nueva llave
4. Guardar la llave en `appsettings.json`:

```json
{
  "Groq": {
    "ApiKey": "gsk_tu_api_key_aqui",
    "Model": "llama3-70b-8192"
  }
}
```

**Agregar HttpClient en Program.cs:**

```csharp
builder.Services.AddHttpClient("Groq", client =>
{
    client.BaseAddress = new Uri("https://api.groq.com/openai/v1");
    client.DefaultRequestHeaders.Add("Authorization", $"Bearer {builder.Configuration["Groq:ApiKey"]}");
});
```

**Crear servicio de IA (Services/GroqService.cs):**

```csharp
using System.Text;
using System.Text.Json;

namespace Api.Services;

public class GroqService
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _configuration;

    public GroqService(IHttpClientFactory httpClientFactory, IConfiguration configuration)
    {
        _httpClientFactory = httpClientFactory;
        _configuration = configuration;
    }

    public async Task<string> AnalizarAsync(string prompt)
    {
        var client = _httpClientFactory.CreateClient("Groq");

        var requestBody = new
        {
            model = _configuration["Groq:Model"] ?? "llama3-70b-8192",
            messages = new[]
            {
                new { role = "system", content = "Eres un asistente experto en clasificación de residuos y reciclaje. Responde en español de forma clara y concisa." },
                new { role = "user", content = prompt }
            },
            temperature = 0.3,
            max_tokens = 300
        };

        var json = JsonSerializer.Serialize(requestBody);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        var response = await client.PostAsync("/chat/completions", content);
        response.EnsureSuccessStatusCode();

        var responseJson = await response.Content.ReadAsStringAsync();
        var result = JsonSerializer.Deserialize<JsonElement>(responseJson);

        return result.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? "Sin respuesta";
    }
}
```

**Registrar el servicio en Program.cs:**

```csharp
builder.Services.AddScoped<GroqService>();
```

**Endpoint de análisis con IA en el controlador:**

```csharp
[HttpPost("{id}/analizar")]
public async Task<ActionResult<object>> AnalizarReporte(int id, [FromServices] GroqService groq)
{
    var reporte = await _context.Reportes
        .Include(r => r.PuntoReciclaje)
        .FirstOrDefaultAsync(r => r.Id == id);

    if (reporte == null)
        return NotFound(new { mensaje = "Reporte no encontrado" });

    var prompt = $@"
Analiza la siguiente observación de un reporte de reciclaje:
- Punto de reciclaje: {reporte.PuntoReciclaje.Nombre}
- Tipo de residuo aceptado: {reporte.PuntoReciclaje.TipoResiduo}
- Observación del usuario: {reporte.Observacion ?? "Sin observación"}

Clasifica el residuo reportado, indica si es reciclable y da una recomendación. Responde en máximo 3 oraciones.";

    try
    {
        var analisis = await groq.AnalizarAsync(prompt);
        return Ok(new { reporteId = id, analisis });
    }
    catch (Exception ex)
    {
        return Ok(new { reporteId = id, analisis = "Servicio de IA no disponible", error = ex.Message });
    }
}
```

**Configurar Groq para el proyecto:**
- El rol **API/IA** del equipo es responsable de esta integración
- Usar `IHttpClientFactory` para gestionar las conexiones HTTP
- El prompt debe diseñarse según el dominio del proyecto (no copiar el ejemplo tal cual)
- Si Groq falla, la API debe responder igual con un mensaje de "Servicio de IA no disponible"
- Probar el endpoint desde Swagger antes de integrar con el frontend

---

## Ejemplo Práctico: CRUD Completo de Puntos de Reciclaje con IA

1. Crear `DTOs/PuntoReciclajeDTO.cs`, `DTOs/PuntoReciclajeCreateDTO.cs`, `DTOs/PuntoReciclajeUpdateDTO.cs`
2. Crear `DTOs/ReporteDTO.cs`, `DTOs/ReporteCreateDTO.cs`
3. Crear `Services/GroqService.cs` con el método `AnalizarAsync`
4. Crear `Controllers/PuntosReciclajeController.cs` con CRUD completo
5. Crear `Controllers/ReportesController.cs` con CRUD + endpoint `POST /api/reportes/{id}/analizar`
6. Configurar Swagger y HttpClient en `Program.cs`
7. Ejecutar `dotnet run` y probar desde Swagger en `http://localhost:5000/swagger`

---

## Ejercicios

### Nivel 1 — Básico

**Enunciado:** Implementa los endpoints GET y POST para la entidad principal de tu proyecto.

**Requisitos:**
- Crear DTO de salida para la entidad
- Crear DTO de entrada para crear la entidad
- Implementar `[HttpGet]` para listar todos los registros
- Implementar `[HttpGet("{id}")]` para obtener un registro por ID
- Implementar `[HttpPost]` para crear un nuevo registro
- Probar desde Swagger que los endpoints funcionan

**Entregable:** Código del controlador con GET y POST funcionales.

**Criterios de evaluación:**
- Los DTOs están correctamente definidos
- GET lista todos los registros correctamente
- POST crea registros y devuelve 201 Created
- Swagger muestra los endpoints correctamente

### Nivel 2 — Intermedio

**Enunciado:** Implementa los endpoints PUT y DELETE para completar el CRUD.

**Requisitos:**
- Crear DTO de entrada para actualizar la entidad
- Implementar `[HttpPut("{id}")]` para actualizar un registro existente
- Implementar `[HttpDelete("{id}")]` para eliminar un registro
- Manejar errores: 404 si no existe, 400 si datos inválidos
- Probar el CRUD completo desde Swagger (crear, leer, actualizar, eliminar)

**Entregable:** Controlador con CRUD completo (GET, POST, PUT, DELETE).

**Criterios de evaluación:**
- PUT actualiza correctamente los datos
- DELETE elimina registros correctamente
- Se retornan códigos HTTP apropiados (200, 201, 204, 404, 400)
- Las validaciones funcionan (datos inválidos son rechazados)

### Nivel 3 — Reto

**Enunciado:** Integra inteligencia artificial (Groq) en tu API y agrega endpoints de búsqueda avanzada.

**Requisitos:**
- Crear `Services/GroqService.cs` con el método `AnalizarAsync`
- Configurar `HttpClientFactory` y registrar el servicio en `Program.cs`
- Implementar `[HttpPost("{id}/analizar")]` que envíe datos de una entidad a Groq y devuelva el análisis
- Diseñar un prompt específico para el dominio de tu proyecto ODS
- Si Groq falla, responder con "Servicio de IA no disponible" sin romper la API
- Implementar `[HttpGet("buscar")]` con al menos 3 filtros opcionales combinables

**Entregable:** Controlador con CRUD completo, endpoint de análisis con IA y búsqueda con filtros.

**Criterios de evaluación:**
- La integración con Groq funciona y devuelve análisis coherente
- El prompt está adaptado al dominio del proyecto
- La API no se cae si Groq falla (manejo de excepciones)
- Los filtros de búsqueda funcionan individualmente y combinados
- Swagger documenta todos los endpoints incluyendo el de IA
