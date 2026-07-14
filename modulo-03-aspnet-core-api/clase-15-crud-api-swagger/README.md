# Clase 15 — CRUD completo y Documentación con Swagger

## Descripción

Integra todo lo aprendido: crea un CRUD completo con ASP.NET Core, Entity Framework Core y documenta la API con Swagger. Al final tendrás una API funcional y documentada.

## Qué aprenderás

- Implementar CRUD completo (GET, POST, PUT, DELETE)
- Usar Entity Framework Core en controladores
- Habilitar y personalizar Swagger
- Documentar endpoints con XML comments
- Probar la API desde Swagger UI

## Requisitos

- .NET SDK 8.0 instalado
- Conceptos de EF Core (clase 14) y controladores (clase 12)

## Instrucciones

```bash
dotnet new webapi -n MiCrudAPI
cd MiCrudAPI
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
dotnet run
```

Abrir `http://localhost:5000/swagger`.

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-15.md` | Teoría completa |
| `ejemplo-guiado/` | CRUD de productos con Swagger |
| `ejercicios/` | 3 niveles: CRUD básico, documentación, API completa |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Swagger en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/tutorials/web-api-help-pages-using-swagger)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Guía de REST APIs](https://learn.microsoft.com/es-es/azure/architecture/best-practices/api-design)

## Autor

Diplomado Programación con .NET — Módulo 3: Desarrollo Web con ASP.NET Core
