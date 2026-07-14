# Clase 13 — Modelos, DTOs y Validaciones

## Descripción

Aprende a modelar datos correctamente usando DTOs (Data Transfer Objects), aplicar validaciones con Data Annotations y usar herramientas como AutoMapper para simplificar el mapeo.

## Qué aprenderás

- DTOs: qué son y por qué usarlos
- Data Annotations: `[Required]`, `[StringLength]`, `[Range]`
- ModelState y validación automática
- Validaciones personalizadas
- AutoMapper para mapeo de objetos

## Requisitos

- .NET SDK 8.0 instalado
- Conceptos de controladores y REST (clase 12)

## Instrucciones

```bash
dotnet new webapi -n ApiConValidaciones
cd ApiConValidaciones
dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection
dotnet run
```

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-13.md` | Teoría completa |
| `ejemplo-guiado/` | DTOs con validaciones en biblioteca |
| `ejercicios/` | 3 niveles: validar campos, crear DTOs, AutoMapper |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Data Annotations en C#](https://learn.microsoft.com/es-es/dotnet/api/system.componentmodel.dataannotations)
- [DTOs en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/web-api/overview/data/using-web-api-with-entity-framework/part-5)
- [Documentación de AutoMapper](https://docs.automapper.org/)

## Autor

Diplomado Programación con .NET — Módulo 3: Desarrollo Web con ASP.NET Core
