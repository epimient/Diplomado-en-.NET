# Dudas — Clase 15

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Qué es Swagger?

Swagger es un conjunto de herramientas para diseñar, documentar y consumir APIs REST. Permite generar documentación interactiva automáticamente a partir del código.

### ¿Cómo habilitar Swagger en ASP.NET Core?

```csharp
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
```

Luego accede a `http://localhost:5000/swagger` para ver la interfaz.

### ¿Cómo se hace un CRUD completo con EF Core?

```csharp
[HttpGet]
public async Task<ActionResult<List<Producto>>> Get()
    => await context.Productos.ToListAsync();

[HttpGet("{id}")]
public async Task<ActionResult<Producto>> Get(int id)
    => await context.Productos.FindAsync(id) is Producto p ? Ok(p) : NotFound();

[HttpPost]
public async Task<ActionResult<Producto>> Post(Producto producto)
{
    context.Productos.Add(producto);
    await context.SaveChangesAsync();
    return CreatedAtAction(nameof(Get), new { id = producto.Id }, producto);
}

[HttpPut("{id}")]
public async Task<IActionResult> Put(int id, Producto producto)
{
    if (id != producto.Id) return BadRequest();
    context.Entry(producto).State = EntityState.Modified;
    await context.SaveChangesAsync();
    return NoContent();
}

[HttpDelete("{id}")]
public async Task<IActionResult> Delete(int id)
{
    var producto = await context.Productos.FindAsync(id);
    if (producto is null) return NotFound();
    context.Productos.Remove(producto);
    await context.SaveChangesAsync();
    return NoContent();
}
```

### ¿Qué diferencia hay entre Ok(), NotFound(), BadRequest() y NoContent()?

- `Ok()` → 200, devuelve datos.
- `NotFound()` → 404, recurso no existe.
- `BadRequest()` → 400, datos inválidos.
- `NoContent()` → 204, operación exitosa sin contenido.

### ¿Cómo probar los endpoints desde Swagger?

Swagger genera una interfaz web donde cada endpoint tiene un botón "Try it out". Puedes enviar solicitudes directamente y ver la respuesta, incluyendo el código de estado y el body.

### ¿Cómo agregar descripciones a los endpoints en Swagger?

```csharp
/// <summary>
/// Obtiene todos los productos disponibles
/// </summary>
[HttpGet]
[ProducesResponseType(typeof(List<Producto>), 200)]
public async Task<ActionResult<List<Producto>>> Get() { ... }
```

### ¿Qué es OpenAPI?

OpenAPI es la especificación estándar que describe APIs REST. Swagger es la implementación que genera la interfaz gráfica basada en esa especificación. El archivo `swagger.json` generado sigue el formato OpenAPI.

### ¿Cómo personalizar el título y versión de Swagger?

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Mi API",
        Version = "v1",
        Description = "API de ejemplo para el curso"
    });
});
```
