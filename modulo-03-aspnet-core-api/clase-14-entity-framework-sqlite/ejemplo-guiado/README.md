# Ejemplo Guiado — Entity Framework Core + SQLite

## Pasos

```bash
dotnet new webapi -n EfProductos --no-https
cd EfProductos
```

Agregar paquetes:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

Reemplazar `Program.cs` y `ejemplo-guiado.csproj`, luego:

```bash
dotnet run
```

## Conceptos aplicados

- Entity Framework Core con proveedor SQLite
- DbContext con `DbSet<Product>`
- `EnsureCreated()` para crear la base de datos automáticamente
- CRUD asíncrono con `ToListAsync`, `FindAsync`, `SaveChangesAsync`
- Inyección de dependencias del DbContext
