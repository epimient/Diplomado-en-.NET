# Ejemplo Guiado — CRUD de Productos con Controladores

## Pasos

```bash
dotnet new webapi -n ProductosApi --no-https
cd ProductosApi
```

Reemplazar `Program.cs` y `ejemplo-guiado.csproj`, luego:

```bash
dotnet run
```

Probar con curl:

```bash
curl http://localhost:5000/api/products
curl -X POST http://localhost:5000/api/products -H "Content-Type: application/json" -d '{"nombre":"Teclado","precio":45}'
```

## Conceptos aplicados

- Controlador API con `[ApiController]` y `[Route("api/[controller]")]`
- Verbos HTTP: GET, POST, PUT, DELETE
- Inyección de dependencias con `AddSingleton<List<Producto>>`
- Códigos de respuesta: 200 OK, 201 Created, 204 NoContent, 404 NotFound
