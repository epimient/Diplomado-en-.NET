# Clase 16 — Planeación del Proyecto Final

## Descripción

Inicia el proyecto final del diplomado. En esta clase se define el alcance, las entidades, los endpoints y la organización del trabajo en equipo.

## Qué aprenderás

- Definir el alcance del proyecto
- Identificar entidades y sus relaciones
- Diseñar los endpoints de la API
- Organizar el trabajo en equipo con Git
- Crear el README.md inicial del proyecto

## Requisitos

- .NET SDK 8.0 instalado
- Conceptos de los Módulos 1, 2 y 3
- Cuenta en GitHub

## Instrucciones

```bash
mkdir proyecto-final
cd proyecto-final
dotnet new webapi -n MiProyectoFinal
dotnet new sln -n MiProyectoFinal
dotnet sln add MiProyectoFinal/MiProyectoFinal.csproj
git init
dotnet build
```

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-16.md` | Teoría completa |
| `ejemplo-guiado/` | Plantilla de plan de proyecto |
| `ejercicios/` | 3 niveles: definir entidades, diseñar endpoints, plan completo |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Git y GitHub para principiantes](https://learn.microsoft.com/es-es/training/modules/introduction-to-github/)
- [Diseño de APIs REST](https://learn.microsoft.com/es-es/azure/architecture/best-practices/api-design)
- [Plantilla de README.md](https://www.makeareadme.com/)

## Autor

Diplomado Programación con .NET — Módulo 4: Proyecto Final Integrador
