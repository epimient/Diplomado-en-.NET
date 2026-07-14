# Clase 17 — Modelado y Base de Datos

## Objetivo

Crear los modelos de C# que representan las entidades del proyecto, configurar Entity Framework Core con SQLite, generar la migración inicial y agregar datos de prueba (seed data).

---

## Contenido

### 1. Definir Modelos en C#

Los modelos son clases que representan las entidades del dominio. Cada propiedad de la clase corresponde a una columna en la base de datos.

**Reglas generales:**
- Usar propiedades autoimplementadas
- La propiedad `Id` se convierte en llave primaria por convención
- Usar atributos `[Required]`, `[MaxLength]`, etc. para validaciones
- Las propiedades de navegación representan relaciones

**Ejemplo: Modelo Autor**

```csharp
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Autor
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Apellido { get; set; } = string.Empty;

    public DateTime FechaNacimiento { get; set; }

    [MaxLength(50)]
    public string Nacionalidad { get; set; } = string.Empty;

    // Propiedad de navegación: un autor tiene muchos libros
    public List<Libro> Libros { get; set; } = new();
}
```

**Ejemplo: Modelo Libro**

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models;

public class Libro
{
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Titulo { get; set; } = string.Empty;

    // FK hacia Autor
    public int AutorId { get; set; }

    [ForeignKey(nameof(AutorId))]
    public Autor Autor { get; set; } = null!;

    [MaxLength(20)]
    public string? ISBN { get; set; }

    public int AnioPublicacion { get; set; }

    public bool Disponible { get; set; } = true;

    // Propiedad de navegación: un libro tiene muchos préstamos
    public List<Prestamo> Prestamos { get; set; } = new();
}
```

**Ejemplo: Modelo Prestamo**

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models;

public class Prestamo
{
    public int Id { get; set; }

    public int LibroId { get; set; }

    [ForeignKey(nameof(LibroId))]
    public Libro Libro { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Usuario { get; set; } = string.Empty;

    public DateTime FechaPrestamo { get; set; } = DateTime.UtcNow;

    public DateTime? FechaDevolucion { get; set; }

    public bool Devuelto { get; set; } = false;
}
```

### 2. Relaciones (1:N y N:N)

**Relación 1:N (uno a muchos)**

Un autor tiene muchos libros. Esto se modela con:
- Una FK `AutorId` en la tabla `Libros`
- Una propiedad de navegación `List<Libro>` en `Autor`
- Una propiedad de navegación `Autor` en `Libro`

```csharp
// En Autor
public List<Libro> Libros { get; set; } = new();

// En Libro
public int AutorId { get; set; }
public Autor Autor { get; set; } = null!;
```

**Relación N:N (muchos a muchos)**

Si se necesitara una relación muchos a muchos (ej: un libro puede tener múltiples categorías), se usa una tabla intermedia:

```csharp
public class LibroCategoria
{
    public int LibroId { get; set; }
    public Libro Libro { get; set; } = null!;
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;
}
```

### 3. DbContext con EF Core

El `DbContext` es la clase principal que coordina las operaciones con la base de datos.

```csharp
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Libro> Libros { get; set; } = null!;
    public DbSet<Autor> Autores { get; set; } = null!;
    public DbSet<Prestamo> Prestamos { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relación Autor - Libro
        modelBuilder.Entity<Libro>()
            .HasOne(l => l.Autor)
            .WithMany(a => a.Libros)
            .HasForeignKey(l => l.AutorId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurar relación Libro - Prestamo
        modelBuilder.Entity<Prestamo>()
            .HasOne(p => p.Libro)
            .WithMany(l => l.Prestamos)
            .HasForeignKey(p => p.LibroId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurar índices
        modelBuilder.Entity<Libro>()
            .HasIndex(l => l.ISBN)
            .IsUnique();
    }
}
```

### 4. Configurar la Conexión a SQLite

En `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=biblioteca.db"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  }
}
```

En `Program.cs`:

```csharp
using Microsoft.EntityFrameworkCore;
using Api.Data;

var builder = WebApplication.CreateBuilder(args);

// Agregar DbContext con SQLite
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

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

// Aplicar migraciones al iniciar (opcional, solo desarrollo)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();
```

### 5. Migraciones

Las migraciones son cambios incrementales en el esquema de la base de datos.

**Instalar herramienta de migraciones (una vez):**

```bash
dotnet tool install --global dotnet-ef
```

**Agregar paquetes NuGet:**

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

**Crear la migración inicial:**

```bash
dotnet ef migrations add InitialCreate
```

Este comando genera una carpeta `Migrations/` con los archivos necesarios.

**Aplicar la migración a la base de datos:**

```bash
dotnet ef database update
```

**Comandos útiles:**

| Comando | Descripción |
|---------|-------------|
| `dotnet ef migrations add Nombre` | Crear nueva migración |
| `dotnet ef database update` | Aplicar migraciones pendientes |
| `dotnet ef migrations remove` | Eliminar la última migración |
| `dotnet ef database drop` | Eliminar la base de datos |

### 6. Seed Data

Los datos de prueba (seed data) permiten poblar la base de datos al iniciar la aplicación.

```csharp
using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data;

public static class SeedData
{
    public static void Initialize(IServiceProvider serviceProvider)
    {
        using var context = new AppDbContext(
            serviceProvider.GetRequiredService<DbContextOptions<AppDbContext>>());

        if (context.Autores.Any())
        {
            return; // Ya hay datos
        }

        var autores = new Autor[]
        {
            new() { Nombre = "Gabriel", Apellido = "García Márquez", FechaNacimiento = new DateTime(1927, 3, 6), Nacionalidad = "Colombiana" },
            new() { Nombre = "Isabel", Apellido = "Allende", FechaNacimiento = new DateTime(1942, 8, 2), Nacionalidad = "Chilena" },
            new() { Nombre = "Jorge Luis", Apellido = "Borges", FechaNacimiento = new DateTime(1899, 8, 24), Nacionalidad = "Argentina" }
        };

        context.Autores.AddRange(autores);
        context.SaveChanges();

        var libros = new Libro[]
        {
            new() { Titulo = "Cien años de soledad", AutorId = 1, ISBN = "978-84-376-0494-7", AnioPublicacion = 1967, Disponible = true },
            new() { Titulo = "El amor en los tiempos del cólera", AutorId = 1, ISBN = "978-84-376-0495-4", AnioPublicacion = 1985, Disponible = true },
            new() { Titulo = "La casa de los espíritus", AutorId = 2, ISBN = "978-84-376-0496-1", AnioPublicacion = 1982, Disponible = true },
            new() { Titulo = "Ficciones", AutorId = 3, ISBN = "978-84-376-0497-8", AnioPublicacion = 1944, Disponible = false }
        };

        context.Libros.AddRange(libros);
        context.SaveChanges();
    }
}
```

Llamar al seed en `Program.cs`:

```csharp
// Después de app.Build()
using (var scope = app.Services.CreateScope())
{
    SeedData.Initialize(scope.ServiceProvider);
}
```

### 7. Resumen del Flujo de Trabajo

1. Definir modelos en `Models/`
2. Configurar `AppDbContext` en `Data/`
3. Agregar connection string en `appsettings.json`
4. Registrar DbContext en `Program.cs`
5. Crear migración inicial
6. Aplicar migración
7. Agregar seed data
8. Verificar con `dotnet run`

---

## Ejemplo Práctico: Migración Inicial para Biblioteca

```bash
cd SistemaBiblioteca/Api

# Agregar paquetes
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design

# Crear migración
dotnet ef migrations add InitialCreate

# Resultado esperado:
# Build succeeded
# Done. To undo this action, use 'ef migrations remove'

# Aplicar migración
dotnet ef database update

# Resultado esperado:
# Build succeeded
# Done.

# Verificar base de datos creada
ls -la biblioteca.db
```

---

## Ejercicios

### Nivel 1 — Básico

**Enunciado:** Crea los modelos de C# para las entidades de tu proyecto final.

**Requisitos:**
- Crear al menos 2 modelos con sus propiedades
- Agregar atributos de validación (`[Required]`, `[MaxLength]`)
- Incluir propiedades de navegación para las relaciones
- Usar tipos de datos apropiados

**Entregable:** Archivos `.cs` con los modelos en la carpeta `Models/`.

**Criterios de evaluación:**
- Los modelos compilan sin errores
- Las propiedades tienen los tipos correctos
- Las relaciones están bien definidas

### Nivel 2 — Intermedio

**Enunciado:** Configura el DbContext y genera la migración inicial.

**Requisitos:**
- Crear la clase `AppDbContext` con los `DbSet` correspondientes
- Configurar la cadena de conexión a SQLite
- Registrar el DbContext en `Program.cs`
- Crear la migración inicial con `dotnet ef migrations add InitialCreate`
- Aplicar la migración con `dotnet ef database update`

**Entregable:** Código de `AppDbContext`, `Program.cs` actualizado, migración generada, base de datos creada.

**Criterios de evaluación:**
- DbContext configurado correctamente
- Migración se crea sin errores
- Base de datos SQLite se genera
- `dotnet build` compila sin errores

### Nivel 3 — Reto

**Enunciado:** Agrega seed data a tu proyecto y verifica que la base de datos se pobla al iniciar.

**Requisitos:**
- Crear una clase `SeedData` con datos de prueba
- Agregar al menos 3 registros por entidad
- Llamar al seed desde `Program.cs`
- Verificar los datos ejecutando la aplicación y consultando la BD
- Usar `dotnet watch run` para desarrollo

**Entregable:** Código de `SeedData`, `Program.cs` actualizado, captura de pantalla mostrando los datos cargados desde Swagger.

**Criterios de evaluación:**
- Seed data se ejecuta correctamente al iniciar
- Los datos de prueba son coherentes y variados
- Se puede verificar la existencia de los datos vía API
