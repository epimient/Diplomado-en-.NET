# Clase 11 — Introducción a ASP.NET Core

## Descripción

Primer contacto con ASP.NET Core. Conoce la plataforma, su estructura de proyectos, el servidor Kestrel y las distintas formas de crear APIs (controladores y Minimal APIs).

## Qué aprenderás

- Qué es ASP.NET Core y cómo se diferencia de .NET Framework
- Estructura de un proyecto Web API
- Servidor Kestrel y pipeline de middleware
- Minimal APIs vs Controladores
- Ejecutar y depurar una aplicación web

## Requisitos

- .NET SDK 8.0 instalado
- Visual Studio Code con extensión C#
- Conocimientos de C# básico (Módulo 1)

## Instrucciones

```bash
dotnet new webapi -n MiPrimeraApi
cd MiPrimeraApi
dotnet run
```

Abrir `http://localhost:5000/swagger` en el navegador.

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-11.md` | Teoría completa |
| `ejemplo-guiado/` | Creación de primera API |
| `ejercicios/` | 3 niveles: explorar proyecto, crear endpoint, Minimal API |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Documentación de ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/)
- [Tutorial de Web API](https://learn.microsoft.com/es-es/aspnet/core/tutorials/first-web-api)
- [Minimal APIs](https://learn.microsoft.com/es-es/aspnet/core/fundamentals/minimal-apis)

## Autor

Diplomado Programación con .NET — Módulo 3: Desarrollo Web con ASP.NET Core
