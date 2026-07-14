# Dudas — Clase 18

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cómo estructurar los controladores?

Un controlador por entidad principal. Usa rutas descriptivas:

```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductosController : ControllerBase
```

Inyecta el DbContext o los servicios en el constructor.

### ¿Cómo crear DTOs para cada operación?

```csharp
// Para crear
public class ProductoCreateDto
{
    [Required]
    public string Nombre { get; set; }
    [Required]
    public int CategoriaId { get; set; }
}

// Para respuesta
public class ProductoResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public string Categoria { get; set; }
}
```

### ¿Cómo integrar validaciones en los DTOs?

Usa Data Annotations en los DTOs de entrada:

```csharp
public class LibroCreateDto
{
    [Required(ErrorMessage = "El título es obligatorio")]
    [StringLength(200, MinimumLength = 3)]
    public string Titulo { get; set; }

    [Range(1450, 2026)]
    public int AnioPublicacion { get; set; }

    [Required]
    public int AutorId { get; set; }
}
```

### ¿Cómo configurar Swagger para el proyecto?

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Sistema de Biblioteca API",
        Version = "v1",
        Description = "API para gestión de biblioteca"
    });
});
```

### ¿Cómo manejar errores globalmente?

```csharp
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        await context.Response.WriteAsync("Error interno del servidor");
    });
});
```

O usa middleware personalizado para capturar excepciones.

### ¿Qué devolver cuando no se encuentra un recurso?

```csharp
var libro = await context.Libros.FindAsync(id);
if (libro is null)
    return NotFound(new { mensaje = $"Libro con Id {id} no encontrado" });
return Ok(libro);
```

Siempre devuelve el código HTTP adecuado junto con un mensaje descriptivo.

### ¿Cómo hacer que las respuestas de error sean consistentes?

Crea una clase para respuestas de error:

```csharp
public class ErrorResponse
{
    public string Mensaje { get; set; }
    public int Codigo { get; set; }
}
```

Y úsala en todos los endpoints para mantener consistencia.
