# Clase 17 — Modelado y Base de Datos

> **Check-in 1 obligatorio:** Al finalizar esta clase el repositorio debe tener modelos creados, DbContext funcionando, migración aplicada y al menos 1 endpoint funcional. Sin avance real = -0.2 en nota final.

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

**Ejemplo: Modelo PuntoReciclaje**

```csharp
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class PuntoReciclaje
{
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    [MaxLength(200)]
    public string Direccion { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string TipoResiduo { get; set; } = string.Empty;

    [MaxLength(100)]
    public string Horario { get; set; } = string.Empty;

    public double Latitud { get; set; }

    public double Longitud { get; set; }

    // Propiedad de navegación: un punto tiene muchos reportes
    public List<Reporte> Reportes { get; set; } = new();
}
```

**Ejemplo: Modelo Residuo**

```csharp
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class Residuo
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Tipo { get; set; } = string.Empty;

    [MaxLength(500)]
    public string Descripcion { get; set; } = string.Empty;

    [MaxLength(500)]
    public string InstruccionesReciclaje { get; set; } = string.Empty;

    public int TiempoDescomposicion { get; set; }
}
```

**Ejemplo: Modelo Reporte**

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Models;

public class Reporte
{
    public int Id { get; set; }

    public int PuntoReciclajeId { get; set; }

    [ForeignKey(nameof(PuntoReciclajeId))]
    public PuntoReciclaje PuntoReciclaje { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Usuario { get; set; } = string.Empty;

    public DateTime Fecha { get; set; } = DateTime.UtcNow;

    [MaxLength(500)]
    public string? Observacion { get; set; }
}
```

### 2. Relaciones (1:N y N:N)

**Relación 1:N (uno a muchos)**

Un punto de reciclaje tiene muchos reportes. Esto se modela con:
- Una FK `PuntoReciclajeId` en la tabla `Reportes`
- Una propiedad de navegación `List<Reporte>` en `PuntoReciclaje`
- Una propiedad de navegación `PuntoReciclaje` en `Reporte`

```csharp
// En PuntoReciclaje
public List<Reporte> Reportes { get; set; } = new();

// En Reporte
public int PuntoReciclajeId { get; set; }
public PuntoReciclaje PuntoReciclaje { get; set; } = null!;
```

**Relación N:N (muchos a muchos)**

Si se necesitara una relación muchos a muchos (ej: un punto de reciclaje acepta múltiples tipos de residuo), se usa una tabla intermedia:

```csharp
public class PuntoResiduo
{
    public int PuntoReciclajeId { get; set; }
    public PuntoReciclaje PuntoReciclaje { get; set; } = null!;
    public int ResiduoId { get; set; }
    public Residuo Residuo { get; set; } = null!;
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

    public DbSet<PuntoReciclaje> PuntosReciclaje { get; set; } = null!;
    public DbSet<Residuo> Residuos { get; set; } = null!;
    public DbSet<Reporte> Reportes { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configurar relación PuntoReciclaje - Reporte
        modelBuilder.Entity<Reporte>()
            .HasOne(r => r.PuntoReciclaje)
            .WithMany(p => p.Reportes)
            .HasForeignKey(r => r.PuntoReciclajeId)
            .OnDelete(DeleteBehavior.Cascade);

        // Configurar índices
        modelBuilder.Entity<PuntoReciclaje>()
            .HasIndex(p => p.Nombre)
            .IsUnique();
    }
}
```

### 4. Configurar la Conexión a SQLite

En `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=eco-puntos.db"
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

        if (context.PuntosReciclaje.Any())
        {
            return; // Ya hay datos
        }

        var puntos = new PuntoReciclaje[]
        {
            new() { Nombre = "Punto Verde Centro", Direccion = "Calle 10 #5-20", TipoResiduo = "Plastico", Horario = "Lun-Sab 8am-6pm", Latitud = 4.7110, Longitud = -74.0721 },
            new() { Nombre = "Eco-punto Norte", Direccion = "Av. Caracas #45-10", TipoResiduo = "Vidrio", Horario = "Lun-Vie 9am-5pm", Latitud = 4.7346, Longitud = -74.0584 },
            new() { Nombre = "Recicla Sur", Direccion = "Calle 30 #20-50", TipoResiduo = "Papel", Horario = "Mar-Dom 10am-7pm", Latitud = 4.5981, Longitud = -74.0758 }
        };

        context.PuntosReciclaje.AddRange(puntos);
        context.SaveChanges();

        var residuos = new Residuo[]
        {
            new() { Tipo = "Plastico", Descripcion = "Botellas, envases, bolsas", InstruccionesReciclaje = "Lavar y secar antes de depositar", TiempoDescomposicion = 450 },
            new() { Tipo = "Vidrio", Descripcion = "Botellas, frascos, envases de vidrio", InstruccionesReciclaje = "Separar por color, retirar tapas", TiempoDescomposicion = 4000 },
            new() { Tipo = "Papel", Descripcion = "Periódicos, revistas, cuadernos, cajas", InstruccionesReciclaje = "Mantener seco, doblar para optimizar espacio", TiempoDescomposicion = 6 }
        };

        context.Residuos.AddRange(residuos);
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

## Ejemplo Práctico: Migración Inicial para Eco-puntos

```bash
cd EcoPuntosApi/Api

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
ls -la eco-puntos.db
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
