# Dudas — Clase 17

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cómo modelar relaciones uno a muchos?

```csharp
public class Categoria
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public List<Producto> Productos { get; set; }
}

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; }
}
```

### ¿Cómo modelar relaciones muchos a muchos?

En EF Core 5+ puedes usar:

```csharp
public class Estudiante
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public List<Curso> Cursos { get; set; }
}

public class Curso
{
    public int Id { get; set; }
    public string Nombre { get; set; }
    public List<Estudiante> Estudiantes { get; set; }
}
```

EF Core crea automáticamente la tabla pivote `CursoEstudiante`.

### ¿Cómo crear la primera migración?

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### ¿Qué es y cómo usar seed data?

El seed data son datos iniciales para poblar la base de datos. Se configura en `AppDbContext`:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Producto>().HasData(
        new Producto { Id = 1, Nombre = "Laptop", Precio = 999.99m, CategoriaId = 1 },
        new Producto { Id = 2, Nombre = "Mouse", Precio = 29.99m, CategoriaId = 1 }
    );
}
```

### ¿Cómo actualizar el modelo después de la primera migración?

```bash
dotnet ef migrations add AgregarStock
dotnet ef database update
```

EF Core genera automáticamente el SQL `ALTER TABLE` necesario.

### ¿Qué hago si la migración falla?

Revisa el mensaje de error. Causas comunes:

- Tabla ya existe: elimina la BD (`dotnet ef database drop`).
- FK conflictiva: revisa los tipos de datos.
- Archivo .db en uso: cierra cualquier programa que lo tenga abierto.

### ¿Cómo eliminar la base de datos SQLite?

```bash
dotnet ef database drop
```

O simplemente elimina el archivo `app.db` manualmente.

### ¿Dónde se guarda el archivo SQLite?

Por defecto en la raíz del proyecto con el nombre `app.db`. La ruta se configura en `appsettings.json`:

```json
"ConnectionStrings": {
    "DefaultConnection": "Data Source=app.db"
}
```
