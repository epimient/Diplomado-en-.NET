# Clase 10 — Colecciones, JSON y Archivos

## Descripción

Aprende a manejar colecciones de datos (`List`, `Dictionary`), archivos JSON y operaciones de entrada/salida en C#. Esta clase prepara para trabajar con persistencia de datos usando archivos.

## Qué aprenderás

- Usar `List<T>` y `Dictionary<TKey, TValue>`
- Leer y escribir archivos de texto
- Serializar y deserializar JSON con `System.Text.Json`
- Manejar excepciones de archivos
- Usar LINQ básico para consultar colecciones

## Requisitos

- .NET SDK 8.0 instalado
- Visual Studio Code o Visual Studio Community
- Conocimientos básicos de clases y objetos (clase 6)

## Instrucciones

```bash
dotnet new console -n ColeccionesJson
cd ColeccionesJson
dotnet add package System.Text.Json
dotnet run
```

## Estructura de la clase

| Archivo | Descripción |
|---------|-------------|
| `clase-10.md` | Teoría completa |
| `ejemplo-guiado/` | Gestión de inventario con JSON |
| `ejercicios/` | 3 niveles: lista de tareas, diccionario, minibiblioteca |
| `dudas/dudas.md` | Preguntas frecuentes |

## Recursos

- [Documentación de System.Text.Json](https://learn.microsoft.com/es-es/dotnet/standard/serialization/system-text-json/overview)
- [Documentación de List<T>](https://learn.microsoft.com/es-es/dotnet/api/system.collections.generic.list-1)
- [LINQ en C#](https://learn.microsoft.com/es-es/dotnet/csharp/linq/)

## Autor

Diplomado Programación con .NET — Módulo 2: POO con C#
