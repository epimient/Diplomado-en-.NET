# Ejemplo Guiado — CRUD con Swagger

## Pasos

```bash
dotnet new webapi -n TareasApi --no-https
cd TareasApi
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

Abrir en el navegador:

```txt
http://localhost:5000/swagger
```

## Conceptos aplicados

- Swagger / OpenAPI con Swashbuckle
- Documentación automática de endpoints
- UI interactiva para probar la API
- CRUD completo con EF Core + SQLite
- `AddEndpointsApiExplorer` y `UseSwaggerUI`
