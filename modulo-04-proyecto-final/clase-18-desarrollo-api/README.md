# Clase 18 — Desarrollo de la API

## Descripción

Implementa los controladores, DTOs, validaciones y documentación Swagger del proyecto final. Convierte el modelo de datos en una API REST funcional.

## Qué aprenderás

- Crear controladores para cada entidad
- Implementar DTOs de entrada y salida
- Validar datos con Data Annotations
- Manejar errores y códigos de estado
- Documentar con Swagger
- Inyectar dependencias (DbContext, servicios)

## Requisitos

- Proyecto con modelos y BD configurados (clase 17)
- Conceptos de controladores y DTOs (Módulo 3)

## Instrucciones

```bash
cd proyecto-final/MiProyectoFinal
dotnet run
dotnet build
```

Probar endpoints en `http://localhost:5000/swagger`.

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-18.md` | Teoría completa |
| `ejemplo-guiado/` | API completa de productos con validaciones |
| `ejercicios/` | 3 niveles: controlador simple, DTOs completos, API documentada |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Controladores en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/web-api/)
- [Validaciones en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/mvc/models/validation)
- [Swagger en ASP.NET Core](https://learn.microsoft.com/es-es/aspnet/core/tutorials/web-api-help-pages-using-swagger)

## Autor

Diplomado Programación con .NET — Módulo 4: Proyecto Final Integrador
