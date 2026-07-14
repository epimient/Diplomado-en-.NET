# Clase 12 — HTTP, REST y Controladores

## Descripción

Aprende los fundamentos de HTTP, los principios REST y cómo crear controladores en ASP.NET Core para construir APIs RESTful bien estructuradas.

## Qué aprenderás

- Verbos HTTP: GET, POST, PUT, PATCH, DELETE
- Códigos de estado HTTP
- Principios REST (stateless, recursos, URLs)
- Crear controladores con `[ApiController]`
- Enrutamiento por atributos
- Parámetros de ruta, query y body

## Requisitos

- .NET SDK 8.0 instalado
- Conceptos de ASP.NET Core (clase 11)
- Thunder Client, Postman o curl instalado

## Instrucciones

```bash
dotnet new webapi -n MiApiRest
cd MiApiRest
dotnet run
```

Probar endpoints con Thunder Client o Swagger.

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-12.md` | Teoría completa |
| `ejemplo-guiado/` | CRUD básico con controladores |
| `ejercicios/` | 3 niveles: endpoint GET, endpoints múltiples, API REST completa |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [HTTP en MDN](https://developer.mozilla.org/es/docs/Web/HTTP)
- [Controladores en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/web-api/)
- [REST API Tutorial](https://restfulapi.net/)

## Autor

Diplomado Programación con .NET — Módulo 3: Desarrollo Web con ASP.NET Core
