# Clase 14 — Entity Framework Core y SQLite

## Objetivo

Comprender el concepto de ORM, aprender a configurar Entity Framework Core con SQLite, crear el contexto de base de datos, realizar migraciones y ejecutar operaciones CRUD completas usando LINQ.

---

## Contenido

### ¿Qué es ORM?

ORM (Object-Relational Mapping) es una técnica que permite mapear objetos de una aplicación a registros de una base de datos relacional. En lugar de escribir consultas SQL manualmente, el programador trabaja con objetos y el ORM se encarga de traducir las operaciones al lenguaje de la base de datos.

Ventajas de usar un ORM:

- **Productividad:** No necesitas escribir SQL repetitivo
- **Seguridad:** Previene inyección SQL al usar consultas parametrizadas
- **Abstracción:** Cambiar de base de datos es más sencillo
- **Mantenibilidad:** El código es más limpio y legible
- **Seguimiento de cambios:** Detecta automáticamente qué datos se modificaron

Desventajas:

- **Rendimiento:** En consultas muy complejas, el SQL nativo puede ser más eficiente
- **Curva de aprendizaje:** Hay que entender cómo funciona el mapeo
- **Abstracción con fugas:** A veces necesitas conocer SQL para optimizar

### Entity Framework Core

Entity Framework Core (EF Core) es el ORM oficial de Microsoft para .NET. Es ligero, extensible, multiplataforma y de código abierto.

Características principales:

- **Soporte para múltiples bases de datos:** SQL Server, SQLite, PostgreSQL, MySQL, Cosmos DB, etc.
- **LINQ:** Consultas escritas en C# con sintaxis integrada
- **Change Tracker:** Monitorea cambios en las entidades automáticamente
- **Migraciones:** Control de versiones del esquema de base de datos
- **Eager/Lazy/Explicit Loading:** Estrategias de carga de datos relacionados
- **Sombra de propiedades:** Propiedades que existen en la BD pero no en la entidad

### SQLite como base de datos local

SQLite es una base de datos relacional embebida que almacena toda la información en un solo archivo. Es ideal para:

- Desarrollo local y prototipado
- Aplicaciones de escritorio y móviles
- Pruebas unitarias
- Proyectos pequeños y medianos

Ventajas:

- No requiere instalación de servidor
- Un solo archivo `.db` o `.sqlite`
- Rápida y liviana
- Compatible con EF Core

### Paquetes NuGet necesarios

Para usar EF Core con SQLite necesitas instalar los siguientes paquetes:

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

**Microsoft.EntityFrameworkCore:** El núcleo del ORM. Contiene las clases base como `DbContext` y `DbSet`.

**Microsoft.EntityFrameworkCore.Sqlite:** El proveedor específico para SQLite. Implementa la comunicación con la base de datos SQLite.

**Microsoft.EntityFrameworkCore.Design:** Necesario para usar las herramientas de migraciones en tiempo de diseño (crear y aplicar migraciones).

También necesitas instalar la herramienta global de migraciones:

```bash
dotnet tool install --global dotnet-ef
```

### DbContext

`DbContext` representa una sesión con la base de datos. Es la clase principal para interactuar con EF Core.

```csharp
using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set; }
    public DbSet<Categoria> Categorias { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración adicional de las entidades
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.Property(p => p.Nombre)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(p => p.Precio)
                .HasColumnType("decimal(18,2)");
        });
    }
}
```

### DbSet

`DbSet<T>` representa una colección de entidades de un tipo específico que se mapea a una tabla en la base de datos.

```csharp
public DbSet<Producto> Productos { get; set; }
public DbSet<Categoria> Categorias { get; set; }
public DbSet<Usuario> Usuarios { get; set; }
```

Cada `DbSet` se traduce en una tabla. Las propiedades de la entidad se traducen en columnas.

### Cadena de conexión

La cadena de conexión se define en `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=app.db"
  }
}
```

- `Data Source=app.db`: Guarda la base de datos en un archivo llamado `app.db` en la raíz del proyecto
- Puedes usar rutas absolutas: `Data Source=C:/datos/miBase.db`

Para rutas más específicas:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=Data/app.db"
  }
}
```

### Configurar DbContext en Program.cs

```csharp
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Agregar DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

// Crear la base de datos automáticamente (solo para desarrollo)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
```

`EnsureCreated()` crea la base de datos si no existe. Para producción es mejor usar migraciones.

### Operaciones CRUD con EF Core

**Create:**

```csharp
[HttpPost]
public async Task<ActionResult<Producto>> Crear([FromBody] Producto producto)
{
    _context.Productos.Add(producto);
    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(ObtenerPorId), new { id = producto.Id }, producto);
}
```

**Read (todos):**

```csharp
[HttpGet]
public async Task<ActionResult<List<Producto>>> ObtenerTodos()
{
    var productos = await _context.Productos.ToListAsync();
    return Ok(productos);
}
```

**Read (por id):**

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<Producto>> ObtenerPorId(int id)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound();

    return producto;
}
```

**Update:**

```csharp
[HttpPut("{id}")]
public async Task<IActionResult> Actualizar(int id, [FromBody] Producto actualizado)
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

**Delete:**

```csharp
[HttpDelete("{id}")]
public async Task<IActionResult> Eliminar(int id)
{
    var producto = await _context.Productos.FindAsync(id);
    if (producto == null)
        return NotFound();

    _context.Productos.Remove(producto);
    await _context.SaveChangesAsync();
    return NoContent();
}
```

### Migraciones

Las migraciones permiten mantener el esquema de la base de datos sincronizado con el modelo de entidades.

**Crear una migración:**

```bash
dotnet ef migrations add InitialCreate
```

Este comando:
1. Compara el modelo actual con el esquema de la BD
2. Genera una clase en `Migrations/` con el código necesario para actualizar la BD

**Aplicar la migración:**

```bash
dotnet ef database update
```

Este comando ejecuta las migraciones pendientes contra la base de datos.

**Deshacer una migración:**

```bash
dotnet ef migrations remove
```

**Ver migraciones:**

```bash
dotnet ef migrations list
```

**Estructura de una migración:**

```csharp
public partial class InitialCreate : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.CreateTable(
            name: "Productos",
            columns: table => new
            {
                Id = table.Column<int>(type: "INTEGER", nullable: false)
                    .Annotation("Sqlite:Autoincrement", true),
                Nombre = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                Precio = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                Stock = table.Column<int>(type: "INTEGER", nullable: false)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_Productos", x => x.Id);
            });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropTable(name: "Productos");
    }
}
```

### Consultas con LINQ

LINQ (Language Integrated Query) permite escribir consultas directamente en C# con sintaxis integrada.

**Sintaxis de método (fluent):**

```csharp
// Todos los productos con precio mayor a 100
var caros = await _context.Productos
    .Where(p => p.Precio > 100)
    .OrderByDescending(p => p.Precio)
    .ToListAsync();

// Productos con stock bajo
var bajoStock = await _context.Productos
    .Where(p => p.Stock < 10)
    .OrderBy(p => p.Stock)
    .ToListAsync();
```

**Sintaxis de consulta (query expression):**

```csharp
var caros = from p in _context.Productos
            where p.Precio > 100
            orderby p.Precio descending
            select p;

var resultado = await caros.ToListAsync();
```

**Operadores LINQ comunes:**

| Operador | Descripción | Ejemplo |
|----------|-------------|---------|
| `Where()` | Filtra resultados | `p => p.Precio > 50` |
| `OrderBy()` | Ordena ascendente | `p => p.Nombre` |
| `OrderByDescending()` | Ordena descendente | `p => p.Precio` |
| `FirstOrDefault()` | Primer elemento o null | `p => p.Id == id` |
| `FindAsync()` | Busca por clave primaria | `id` |
| `ToListAsync()` | Ejecuta y devuelve lista | — |
| `CountAsync()` | Cuenta elementos | — |
| `AnyAsync()` | Verifica si existe | `p => p.Stock > 0` |
| `Select()` | Proyecta campos | `p => p.Nombre` |

### Relaciones entre entidades

EF Core soporta las relaciones típicas de bases de datos relacionales.

**Uno a muchos (Producto ← Categoria):**

```csharp
public class Categoria
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;

    // Propiedad de navegación
    public List<Producto> Productos { get; set; } = new();
}

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int CategoriaId { get; set; }  // Foreign Key

    // Propiedad de navegación
    public Categoria Categoria { get; set; } = null!;
}
```

**Incluir relaciones en consultas:**

```csharp
// Carga explícita (eager loading)
var productos = await _context.Productos
    .Include(p => p.Categoria)
    .ToListAsync();

// Filtrar por relación
var productosDeElectronica = await _context.Productos
    .Where(p => p.Categoria.Nombre == "Electrónica")
    .ToListAsync();

// ThenInclude para relaciones anidadas
var ordenes = await _context.Ordenes
    .Include(o => o.Cliente)
    .ThenInclude(c => c.Direccion)
    .ToListAsync();
```

---

## Ejemplo guiado: CRUD de productos con EF Core + SQLite

Implementaremos un CRUD completo de productos conectado a SQLite usando Entity Framework Core.

**Paso 1:** Crear el proyecto e instalar paquetes

```bash
dotnet new webapi -n ProductosEfApi
cd ProductosEfApi
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

**Paso 2:** Crear el modelo `Producto.cs`

```csharp
namespace ProductosEfApi.Models;

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public int Stock { get; set; }
    public DateTime FechaCreacion { get; set; }
}
```

**Paso 3:** Crear el DbContext `Data/AppDbContext.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using ProductosEfApi.Models;

namespace ProductosEfApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Producto> Productos { get; set; }
}
```

**Paso 4:** Configurar `appsettings.json`

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=productos.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

**Paso 5:** Configurar `Program.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using ProductosEfApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
```

**Paso 6:** Crear el controlador `Controllers/ProductosController.cs`

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductosEfApi.Data;
using ProductosEfApi.Models;

namespace ProductosEfApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Producto>>> ObtenerTodos()
    {
        return await _context.Productos.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Producto>> ObtenerPorId(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
            return NotFound();

        return producto;
    }

    [HttpPost]
    public async Task<ActionResult<Producto>> Crear(Producto producto)
    {
        producto.FechaCreacion = DateTime.UtcNow;
        _context.Productos.Add(producto);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(ObtenerPorId), new { id = producto.Id }, producto);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Actualizar(int id, Producto actualizado)
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> Eliminar(int id)
    {
        var producto = await _context.Productos.FindAsync(id);
        if (producto == null)
            return NotFound();

        _context.Productos.Remove(producto);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
```

**Paso 7:** Ejecutar

```bash
dotnet run
```

La base de datos `productos.db` se crea automáticamente al iniciar la aplicación.

---

## Ejercicios

### Nivel 1 — Básico: Crear DbContext y migración

**Enunciado:**
Crea un proyecto Web API con un modelo `Categoria` (Id, Nombre, Descripcion) y configura EF Core con SQLite. Crea el DbContext y genera la primera migración.

**Requisitos:**
- Modelo `Categoria` con `Id` (int), `Nombre` (string), `Descripcion` (string)
- DbContext con `DbSet<Categoria>`
- Cadena de conexión en appsettings.json
- Migración inicial creada y aplicada
- Base de datos generada (`categorias.db`)

**Criterios de evaluación:**
- Paquetes NuGet correctamente instalados
- DbContext definido correctamente
- Migración creada y aplicada sin errores
- Archivo `.db` generado

---

### Nivel 2 — Intermedio: CRUD de categorías

**Enunciado:**
Implementa el CRUD completo de categorías usando EF Core con SQLite. Usa async/await en todos los métodos.

**Requisitos:**
- `GET /api/categorias` → lista todas
- `GET /api/categorias/{id}` → obtiene por id
- `POST /api/categorias` → crea nueva
- `PUT /api/categorias/{id}` → actualiza
- `DELETE /api/categorias/{id}` → elimina
- Todos los métodos deben ser asíncronos
- Manejar 404 cuando no exista el recurso

**Entrada esperada:**
```
POST /api/categorias  Body: { "nombre": "Electrónica", "descripcion": "Productos electrónicos" }
```

**Salida esperada:**
```json
{
  "id": 1,
  "nombre": "Electrónica",
  "descripcion": "Productos electrónicos"
}
```

**Criterios de evaluación:**
- CRUD completo implementado
- Métodos asíncronos con async/await
- Inyección de dependencias del DbContext
- Códigos de estado HTTP correctos
- Persistencia en SQLite

---

### Nivel 3 — Reto: Relación Producto-Categoría con consultas LINQ

**Enunciado:**
Crea una API con dos entidades relacionadas: `Producto` y `Categoria` en una relación uno a muchos. Implementa endpoints que usen LINQ para consultas con filtros y relaciones.

**Requisitos:**
- `Categoria`: Id, Nombre, Descripcion
- `Producto`: Id, Nombre, Precio, Stock, CategoriaId (FK), FechaCreacion
- DbContext con ambas entidades y configuración de la relación
- Endpoints de CRUD para ambas entidades
- `GET /api/categorias/{id}/productos` → productos de una categoría
- `GET /api/productos/buscar?nombre=laptop` → búsqueda por nombre
- `GET /api/productos/stock-bajo?minimo=5` → productos con stock menor al mínimo
- Incluir `Include` para cargar la categoría en las respuestas de productos
- Endpoint `GET /api/productos` debe incluir el nombre de la categoría en la respuesta

**Entrada esperada:**
```
POST /api/categorias  Body: { "nombre": "Electrónica", "descripcion": "Aparatos electrónicos" }
POST /api/productos   Body: { "nombre": "Laptop", "precio": 899.00, "stock": 15, "categoriaId": 1 }
GET /api/categorias/1/productos
GET /api/productos/buscar?nombre=laptop
GET /api/productos/stock-bajo?minimo=10
```

**Salida esperada:**
- Producto debe incluir `categoriaNombre` en la respuesta
- Búsqueda por nombre debe devolver coincidencias parciales (case-insensitive)
- Stock bajo debe filtrar productos con stock < minimo

**Criterios de evaluación:**
- Relación uno a muchos correctamente configurada
- Consultas LINQ con `Where`, `Include`, `ToListAsync`
- Búsqueda por nombre con `Contains`
- Filtro dinámico por stock
- Respuestas con datos de la relación incluidos
- Código limpio y organizado
