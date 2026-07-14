# Ejemplo Guiado — API del Proyecto Final

## Pasos

```bash
dotnet new webapi -n BibliotecaApi --no-https
cd BibliotecaApi
```

Agregar paquetes:

```bash
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Swashbuckle.AspNetCore
```

Reemplazar `Program.cs` y `ejemplo-guiado.csproj`, luego:

```bash
dotnet run
```

Probar:

```bash
curl http://localhost:5000/api/libros
curl http://localhost:5000/swagger
```

## Conceptos aplicados

- Tres controladores: `AutoresController`, `LibrosController`, `PrestamosController`
- Relaciones entre entidades con EF Core
- CRUD completo para la entidad principal (Libro)
- Operación especial: devolución de préstamo
- Swagger para documentación y pruebas
