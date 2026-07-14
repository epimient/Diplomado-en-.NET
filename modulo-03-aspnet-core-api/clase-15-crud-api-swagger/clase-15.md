# Clase 15 — CRUD API y Swagger

## Objetivo

Integrar Entity Framework Core con controladores para implementar un CRUD completo, documentar la API con Swagger/OpenAPI, personalizar la interfaz de documentación y probar todos los endpoints desde Swagger UI.

---

## Contenido

### Integrar EF Core + Controladores

Para construir una API completa necesitamos integrar tres capas:

1. **Modelos:** Las entidades del dominio
2. **DbContext:** La capa de acceso a datos con EF Core
3. **Controladores:** Los endpoints que exponen la funcionalidad

Esta integración se logra mediante **inyección de dependencias**. El DbContext se registra en `Program.cs` y se inyecta en el constructor del controlador.

```csharp
// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
```

```csharp
// Controlador
[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    // Endpoints aquí...
}
```

La inyección de dependencias se encarga de crear y gestionar el ciclo de vida del DbContext. Por defecto, se usa el patrón **Scoped**: se crea una instancia por cada petición HTTP.

### CRUD completo

Un CRUD completo consta de cinco operaciones estándar:

| Operación | Método HTTP | Ruta | Descripción |
|-----------|-------------|------|-------------|
| Listar todos | GET | `/api/productos` | Obtiene todos los registros |
| Obtener por id | GET | `/api/productos/{id}` | Obtiene un registro específico |
| Crear | POST | `/api/productos` | Crea un nuevo registro |
| Actualizar | PUT | `/api/productos/{id}` | Actualiza un registro existente |
| Eliminar | DELETE | `/api/productos/{id}` | Elimina un registro |

**GET all:**

```csharp
[HttpGet]
public async Task<ActionResult<List<Producto>>> GetAll()
{
    return await _context.Productos.ToListAsync();
}
```

**GET by id:**

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<Producto>> GetById(int id)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound(new { message = "Producto no encontrado" });

    return producto;
}
```

**POST (crear):**

```csharp
[HttpPost]
public async Task<ActionResult<Producto>> Create([FromBody] Producto producto)
{
    producto.FechaCreacion = DateTime.UtcNow;
    _context.Productos.Add(producto);
    await _context.SaveChangesAsync();

    return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
}
```

**PUT (actualizar):**

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Update(int id, [FromBody] Producto actualizado)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound();

    producto.Nombre = actualizado.Nombre;
    producto.Precio = actualizado.Precio;
    producto.Stock = actualizado.Stock;

    await _context.SaveChangesAsync();
    return NoContent();
}
```

**DELETE (eliminar):**

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound();

    _context.Productos.Remove(producto);
    await _context.SaveChangesAsync();
    return NoContent();
}
```

### Swagger / OpenAPI

Swagger es un conjunto de herramientas que permite documentar y probar APIs REST de forma interactiva. Está basado en el estándar **OpenAPI**, un formato JSON/YAML que describe la estructura de una API.

**OpenAPI** define:

- Endpoints disponibles (rutas y métodos)
- Parámetros de entrada (ruta, query, body)
- Formatos de respuesta (tipos, códigos de estado)
- Esquemas de datos (modelos y DTOs)
- Autenticación y seguridad

**Swagger UI** es la interfaz gráfica que permite explorar y probar los endpoints desde el navegador.

### Swashbuckle

Swashbuckle es el paquete que integra Swagger con ASP.NET Core. En .NET 8, Swagger ya no viene incluido por defecto, pero se puede agregar fácilmente.

**Instalación:**

```bash
dotnet add package Swashbuckle.AspNetCore
```

**Configuración básica en Program.cs:**

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();
```

- `AddEndpointsApiExplorer()`: Expone los metadatos de los endpoints
- `AddSwaggerGen()`: Configura el generador de Swagger
- `UseSwagger()`: Sirve el archivo JSON de OpenAPI en `/swagger/v1/swagger.json`
- `UseSwaggerUI()`: Sirve la interfaz gráfica de Swagger en `/swagger`

### Probar endpoints desde Swagger UI

Una vez configurado, puedes acceder a:

```
http://localhost:5238/swagger
```

Swagger UI muestra:

1. **Lista de controladores** agrupados por nombre
2. **Cada endpoint** con su método HTTP y ruta
3. **Botón "Try it out"** para probar el endpoint
4. **Campos para parámetros** de ruta, query y body
5. **Botón "Execute"** para enviar la petición
6. **Respuesta** con código de estado, headers y body

### Personalizar Swagger

Podemos personalizar la apariencia y metadatos de Swagger:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Productos",
        Version = "v1",
        Description = "API REST para gestionar productos del inventario",
        Contact = new OpenApiContact
        {
            Name = "Tu Nombre",
            Email = "tu@email.com",
            Url = new Uri("https://tusitio.com")
        },
        License = new OpenApiLicense
        {
            Name = "Uso educativo",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
});
```

**Agregar descripciones a los endpoints con XML comments:**

```csharp
/// <summary>
/// Obtiene todos los productos del catálogo
/// </summary>
/// <returns>Lista de productos</returns>
/// <response code="200">Lista de productos obtenida correctamente</response>
[HttpGet]
[ProducesResponseType(typeof(List<Producto>), StatusCodes.Status200OK)]
public async Task<ActionResult<List<Producto>>> GetAll()
{
    return await _context.Productos.ToListAsync();
}
```

Para habilitar XML comments, edita el archivo `.csproj`:

```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
  <NoWarn>$(NoWarn);1591</NoWarn>
</PropertyGroup>
```

### Respuestas HTTP correctas

Cada endpoint debe devolver el código de estado HTTP adecuado:

| Operación | Éxito | Error: no encontrado | Error: validación |
|-----------|-------|---------------------|-------------------|
| GET all | 200 OK | — | — |
| GET by id | 200 OK | 404 Not Found | — |
| POST | 201 Created | — | 400 Bad Request |
| PUT | 204 No Content | 404 Not Found | 400 Bad Request |
| DELETE | 204 No Content | 404 Not Found | — |

**Documentar respuestas con atributos:**

```csharp
[HttpGet("{id}")]
[ProducesResponseType(typeof(Producto), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<ActionResult<Producto>> GetById(int id)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound(new ProblemDetails
        {
            Title = "Producto no encontrado",
            Detail = $"No existe un producto con el ID {id}",
            Status = StatusCodes.Status404NotFound
        });

    return producto;
}
```

### Manejo de errores 404/400

**Error 404 — Recurso no encontrado:**

```csharp
// Buscar por ID inexistente
if (producto == null)
    return NotFound(new
    {
        success = false,
        message = $"El producto con ID {id} no existe"
    });
```

**Error 400 — Validación fallida:**

Con `[ApiController]` las validaciones con Data Annotations devuelven 400 automáticamente:

```csharp
public class CrearProductoDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    public string Nombre { get; set; } = string.Empty;

    [Range(0.01, 999999, ErrorMessage = "Precio inválido")]
    public decimal Precio { get; set; }
}
```

Si envías un POST con datos inválidos, Swagger mostrará la respuesta:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Nombre": ["El nombre es obligatorio"],
    "Precio": ["Precio inválido"]
  }
}
```

**Manejo global de errores (opcional):**

```csharp
// Program.cs
app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";

        var response = new
        {
            success = false,
            message = "Ocurrió un error interno en el servidor"
        };

        await context.Response.WriteAsJsonAsync(response);
    });
});
```

---

## Ejemplo guiado: API completa de productos con Swagger

Crearemos una API completa de productos con EF Core, SQLite y Swagger documentado.

**Paso 1:** Crear proyecto con Swagger

```bash
dotnet new webapi -n ProductosSwaggerApi
cd ProductosSwaggerApi
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Swashbuckle.AspNetCore
```

**Paso 2:** Modelo

```csharp
// Models/Producto.cs
namespace ProductosSwaggerApi.Models;

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public string Categoria { get; set; } = string.Empty;
    public DateTime FechaCreacion { get; set; }
}
```

**Paso 3:** DbContext

```csharp
// Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using ProductosSwaggerApi.Models;

namespace ProductosSwaggerApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Producto> Productos { get; set; }
}
```

**Paso 4:** Configurar Program.cs con Swagger personalizado

```csharp
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using ProductosSwaggerApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Productos",
        Version = "v1",
        Description = "API REST para la gestión de productos del inventario",
        Contact = new OpenApiContact
        {
            Name = "Diplomado .NET",
            Email = "contacto@diplomadonet.com"
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API de Productos v1");
        c.RoutePrefix = "swagger";
    });
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapControllers();
app.Run();
```

**Paso 5:** Controlador completo con documentación de respuestas

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosSwaggerApi.Data;
using ProductosSwaggerApi.Models;

namespace ProductosSwaggerApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Produces("application/json")]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    [ProducesResponseType(typeof(List<Producto>), StatusCodes.Status200OK)]
    public async Task<ActionResult<List<Producto>>> GetAll()
    {
        return await _context.Productos.ToListAsync();
    }

    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Producto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Producto>> GetById(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
            return NotFound(new { message = $"Producto con ID {id} no encontrado" });

        return producto;
    }

    [HttpPost]
    [ProducesResponseType(typeof(Producto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Producto>> Create([FromBody] Producto producto)
    {
        producto.FechaCreacion = DateTime.UtcNow;
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Update(int id, [FromBody] Producto actualizado)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
            return NotFound(new { message = $"Producto con ID {id} no encontrado" });

        producto.Nombre = actualizado.Nombre;
        producto.Precio = actualizado.Precio;
        producto.Stock = actualizado.Stock;
        producto.Categoria = actualizado.Categoria;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
            return NotFound(new { message = $"Producto con ID {id} no encontrado" });

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
```

**Paso 6:** Probar

```bash
dotnet run
```

Abrir: `http://localhost:5238/swagger`

---

## Ejercicios

### Nivel 1 — Básico: Implementar endpoint PUT faltante

**Enunciado:**
Tienes un controlador de `ProductosController` con los endpoints GET all, GET by id, POST y DELETE. El endpoint PUT no está implementado. Debes agregarlo.

**Requisitos:**
- Endpoint `PUT /api/productos/{id}` que actualiza todas las propiedades
- Si el producto no existe, devolver 404
- Si la actualización es exitosa, devolver 204 No Content
- Documentar con `[ProducesResponseType]`

**Entrada esperada:**
```
PUT /api/productos/1  Body: { "nombre": "Monitor 4K", "precio": 350.00, "stock": 10, "categoria": "Electrónica" }
```

**Salida esperada:**
- 204 No Content si existe
- 404 Not Found si no existe

**Criterios de evaluación:**
- PUT implementado correctamente
- Código de estado 204
- Manejo de 404
- Atributos de documentación

---

### Nivel 2 — Intermedio: Agregar búsqueda por nombre

**Enunciado:**
Agrega al controlador de productos un endpoint que permita buscar productos por nombre usando un parámetro query. También permite filtrar por categoría y por precio máximo de forma opcional.

**Requisitos:**
- `GET /api/productos/buscar?nombre=laptop` → búsqueda por nombre
- `GET /api/productos/buscar?categoria=Electrónica` → filtro por categoría
- `GET /api/productos/buscar?nombre=laptop&precioMax=1000` → combinación
- La búsqueda por nombre debe ser parcial y case-insensitive
- Si no se envía ningún filtro, devolver todos
- Devolver 200 OK con la lista (puede estar vacía)

**Entrada esperada:**
```
GET /api/productos/buscar?nombre=laptop
GET /api/productos/buscar?categoria=Electrónica
GET /api/productos/buscar?nombre=mouse&precioMax=50
GET /api/productos/buscar
```

**Salida esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Laptop Gaming",
    "precio": 1200.00,
    "stock": 15,
    "categoria": "Electrónica",
    "fechaCreacion": "2026-07-07T14:30:00Z"
  }
]
```

**Criterios de evaluación:**
- Endpoint con múltiples parámetros query opcionales
- Búsqueda parcial con Contains (case-insensitive)
- Filtros combinados (nombre + precio)
- Documentación de parámetros en Swagger

---

### Nivel 3 — Reto: API de tareas con estado y filtros

**Enunciado:**
Crea una API de gestión de tareas (To-Do List) completa con EF Core, SQLite y Swagger. Debe incluir múltiples endpoints de consulta con filtros, paginación y documentación completa.

**Requisitos:**

Modelo `Tarea`:
- `Id` (int)
- `Titulo` (string, obligatorio, máx 200 caracteres)
- `Descripcion` (string, opcional)
- `Completada` (bool, default false)
- `Prioridad` (enum: Baja, Media, Alta)
- `Categoria` (string)
- `FechaLimite` (DateTime, opcional)
- `FechaCreacion` (DateTime)

Endpoint requeridos:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tareas` | Lista todas (paginadas: ?pagina=1&tamano=10) |
| GET | `/api/tareas/{id}` | Obtener por id |
| GET | `/api/tareas/pendientes` | Tareas no completadas |
| GET | `/api/tareas/completadas` | Tareas completadas |
| GET | `/api/tareas/prioridad/{nivel}` | Filtrar por prioridad (baja/media/alta) |
| GET | `/api/tareas/buscar?texto=...` | Búsqueda por texto en título o descripción |
| POST | `/api/tareas` | Crear tarea |
| PUT | `/api/tareas/{id}` | Actualizar tarea completa |
| PATCH | `/api/tareas/{id}/completar` | Marcar como completada |
| DELETE | `/api/tareas/{id}` | Eliminar tarea |

Requisitos adicionales:

- Swagger personalizado con título "API de Tareas" y descripción detallada
- Todos los endpoints documentados con `[ProducesResponseType]`
- Validaciones con Data Annotations en el modelo
- Paginación con parámetros query (por defecto página 1, tamaño 10)
- Ordenación por fecha de creación descendente
- Manejo de errores 404 con mensaje descriptivo
- Al crear, devolver 201 Created con Location header
- Al completar (PATCH), devolver 200 OK con la tarea actualizada

**Entrada esperada:**

```
POST /api/tareas
Body: {
  "titulo": "Estudiar Entity Framework Core",
  "descripcion": "Repasar migraciones y consultas LINQ",
  "prioridad": "Alta",
  "categoria": "Estudio",
  "fechaLimite": "2026-07-14"
}

GET /api/tareas/pendientes
GET /api/tareas/prioridad/alta
GET /api/tareas/buscar?texto=Entity
PATCH /api/tareas/1/completar
```

**Salida esperada:**
- Todas las respuestas en formato JSON
- Listas paginadas con metadatos opcionales
- Errores consistentes con formato `{ "message": "..." }`
- Swagger UI mostrando todos los endpoints con sus esquemas

**Criterios de evaluación:**
- CRUD completo implementado
- Endpoints de filtrado (pendientes, completadas, prioridad, búsqueda)
- Paginación funcional
- PATCH para actualización parcial
- Swagger completamente documentado
- Validaciones con Data Annotations
- Código limpio con DTOs
- Manejo de errores consistente
