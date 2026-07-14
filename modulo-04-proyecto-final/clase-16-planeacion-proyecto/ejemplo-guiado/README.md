# Ejemplo Guiado — Planeación del Proyecto Final

## Proyecto: Sistema de Gestión de Biblioteca

### Descripción

API REST para gestionar libros, autores y préstamos en una biblioteca.

### Entidades

- **Libro** — Título, ISBN, Año, AutorId
- **Autor** — Nombre, Nacionalidad
- **Prestamo** — LibroId, FechaPrestamo, FechaDevolucion, Estado

### Relaciones

- Autor 1 → N Libros
- Libro 1 → N Prestamos

### Endpoints planeados

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/libros | Listar libros |
| GET | /api/libros/{id} | Obtener libro |
| POST | /api/libros | Crear libro |
| PUT | /api/libros/{id} | Actualizar libro |
| DELETE | /api/libros/{id} | Eliminar libro |
| GET | /api/autores | Listar autores |
| POST | /api/autores | Crear autor |
| GET | /api/prestamos | Listar préstamos |
| POST | /api/prestamos | Registrar préstamo |
| PUT | /api/prestamos/{id}/devolver | Devolver libro |

### Stack

- .NET 8 LTS
- ASP.NET Core Web API
- Entity Framework Core + SQLite
- Swagger
- Git + GitHub

### Cronograma (3 clases restantes)

1. **Clase 17** — Modelado y base de datos (modelos, DbContext, migración)
2. **Clase 18** — Desarrollo de la API (controladores, CRUD)
3. **Clase 19-20** — Pruebas, documentación y presentación
