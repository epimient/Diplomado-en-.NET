# Clase 14 — Entity Framework Core con SQLite

## Descripción

Introducción a Entity Framework Core como ORM para acceder a bases de datos desde C#. Usaremos SQLite como motor de base de datos por su simplicidad y portabilidad.

## Qué aprenderás

- Qué es un ORM y cómo funciona EF Core
- Configurar DbContext y entidades
- Crear y aplicar migraciones
- Consultar datos con LINQ
- Relaciones entre tablas (1:N, N:N)
- Ver las consultas SQL generadas

## Requisitos

- .NET SDK 8.0 instalado
- Conceptos de API REST (clases 11-13)

## Instrucciones

```bash
dotnet new webapi -n ApiConBD
cd ApiConBD
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-14.md` | Teoría completa |
| `ejemplo-guiado/` | Productos con categorías usando EF Core |
| `ejercicios/` | 3 niveles: migración básica, consultas LINQ, relaciones |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Documentación EF Core](https://learn.microsoft.com/es-es/ef/core/)
- [SQLite con EF Core](https://learn.microsoft.com/es-es/ef/core/providers/sqlite/)
- [Referencia LINQ](https://learn.microsoft.com/es-es/dotnet/csharp/linq/)

## Autor

Diplomado Programación con .NET — Módulo 3: Desarrollo Web con ASP.NET Core
