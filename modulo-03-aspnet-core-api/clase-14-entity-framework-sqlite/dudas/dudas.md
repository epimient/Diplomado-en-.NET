# Dudas — Clase 14

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Qué es Entity Framework Core?

EF Core es un ORM (Object-Relational Mapper) que permite trabajar con bases de datos usando objetos de C#. Traduce operaciones sobre objetos a consultas SQL automáticamente.

### ¿Cómo configurar SQLite con EF Core?

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

```csharp
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=app.db"));
```

### ¿Qué es una migración y cómo se crea?

Una migración es un archivo que representa cambios en el esquema de la base de datos.

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

Cada migración contiene métodos `Up` y `Down` para aplicar o revertir cambios.

### ¿Cómo hacer consultas con LINQ y EF Core?

```csharp
var productos = await context.Productos
    .Where(p => p.Precio > 100)
    .OrderBy(p => p.Nombre)
    .ToListAsync();

var producto = await context.Productos
    .FirstOrDefaultAsync(p => p.Id == id);
```

### ¿Qué diferencia hay entre FirstOrDefault y SingleOrDefault?

`FirstOrDefault` devuelve el primer elemento que cumple la condición o `null`. `SingleOrDefault` espera exactamente un resultado: lanza excepción si hay más de uno. Usa `FirstOrDefault` cuando esperes varios resultados y solo necesites el primero.

### ¿Cómo manejar relaciones entre tablas?

```csharp
public class Autor
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public List<Libro> Libros { get; set; }
}

public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; }
    public int AutorId { get; set; }
    public Autor Autor { get; set; }
}
```

EF Core detecta la relación por la propiedad de navegación y la FK.

### ¿Cómo ver las consultas SQL que genera EF Core?

Configura el logging en `appsettings.json`:

```json
{
  "Logging": {
    "LogLevel": {
      "Microsoft.EntityFrameworkCore.Database.Command": "Information"
    }
  }
}
```

### ¿Qué hago si cambio el modelo después de crear la BD?

Crea una nueva migración:

```bash
dotnet ef migrations add AgregarCampoDescripcion
dotnet ef database update
```

EF Core genera el SQL necesario para alterar la tabla sin perder datos.
