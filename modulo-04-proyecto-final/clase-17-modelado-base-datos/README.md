# Clase 17 — Modelado de Base de Datos

## Descripción

Modela la base de datos del proyecto final usando Entity Framework Core. Define las entidades, relaciones, migraciones y datos iniciales (seed).

## Qué aprenderás

- Definir modelos de datos con relaciones
- Crear relaciones 1:N y N:N con EF Core
- Generar migraciones desde el modelo
- Configurar seed data
- Administrar la base de datos SQLite

## Requisitos

- .NET SDK 8.0 instalado
- Proyecto base de la clase 16
- Entity Framework Core configurado

## Instrucciones

```bash
cd proyecto-final/MiProyectoFinal
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet ef migrations add InitialCreate
dotnet ef database update
```

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-17.md` | Teoría completa |
| `ejemplo-guiado/` | Modelado de biblioteca con relaciones |
| `ejercicios/` | 3 niveles: modelos básicos, relaciones, seed data |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Migraciones en EF Core](https://learn.microsoft.com/es-es/ef/core/managing-schemas/migrations/)
- [Relaciones en EF Core](https://learn.microsoft.com/es-es/ef/core/modeling/relationships/)
- [Seed Data en EF Core](https://learn.microsoft.com/es-es/ef/core/modeling/data-seeding/)

## Autor

Diplomado Programación con .NET — Módulo 4: Proyecto Final Integrador
