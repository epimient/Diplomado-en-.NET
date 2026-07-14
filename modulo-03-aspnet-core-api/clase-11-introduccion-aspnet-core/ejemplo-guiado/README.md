# Ejemplo Guiado — Minimal API Hola Mundo

## Pasos

```bash
dotnet new webapi -n HolaMundoApi --no-https
cd HolaMundoApi
```

Reemplazar `Program.cs` y agregar `ejemplo-guiado.csproj`, luego:

```bash
dotnet run
```

Probar en otra terminal:

```bash
curl http://localhost:5000/api/health
curl http://localhost:5000/api/saludo/Mundo
```

## Conceptos aplicados

- ASP.NET Core Minimal API
- Endpoint GET con y sin parámetros de ruta
- Retorno de objetos JSON con `Results.Ok`
- Inicio rápido sin controladores
