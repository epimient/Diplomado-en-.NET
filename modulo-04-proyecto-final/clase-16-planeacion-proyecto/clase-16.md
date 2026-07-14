# Clase 16 — Planeación del Proyecto Final

## Objetivo

Planificar el proyecto final del diplomado definiendo el tema, las entidades, los endpoints, la organización del equipo y la configuración inicial del repositorio en GitHub.

---

## Contenido

### 1. Objetivo del Proyecto Final

El proyecto final integra todos los conocimientos adquiridos durante el diplomado:

- Fundamentos de C# y .NET
- Programación Orientada a Objetos
- ASP.NET Core Web API
- Entity Framework Core y SQLite
- Control de versiones con Git
- Documentación técnica

Cada equipo debe construir una **API REST funcional** con base de datos, CRUD completo y documentación. El proyecto debe ser presentado frente al grupo.

### 2. Requisitos Mínimos

| Requisito | Descripción |
|-----------|-------------|
| Entidades relacionadas | Al menos 2 entidades con relación (1:N o N:N) |
| CRUD completo | GET, POST, PUT, DELETE por entidad principal |
| Entity Framework Core | ORM para acceso a datos |
| SQLite | Base de datos ligera embebida |
| Swagger / OpenAPI | Documentación interactiva de la API |
| DTOs | Modelos de entrada y salida separados |
| Validaciones | Data Annotations en modelos y DTOs |
| Controladores | Al menos un controlador por entidad principal |
| README.md | Documentación profesional del proyecto |
| Git + GitHub | Repositorio con commits regulares |

### 3. Elegir un Tema

Cada equipo debe seleccionar un tema. Algunas ideas:

| Tema | Entidades posibles |
|------|-------------------|
| Sistema de Biblioteca | Libro, Autor, Préstamo, Categoría |
| Sistema de Inventario | Producto, Categoría, Proveedor, Movimiento |
| Sistema de Restaurante | Plato, Categoría, Pedido, Cliente, Mesa |
| Sistema de Hotel | Habitación, Cliente, Reserva, Factura |
| Sistema de Gimnasio | Miembro, Clase, Entrenador, Membresía |
| Sistema de Parqueadero | Vehículo, Espacio, Ticket, Cliente |
| Agenda Médica | Paciente, Doctor, Cita, Especialidad |
| Sistema de Ventas | Cliente, Producto, Venta, DetalleVenta |
| Gestión de Clientes | Cliente, Pedido, Producto, Dirección |

**Criterios para elegir bien:**
- Que sea un dominio conocido por todo el equipo
- Que tenga al menos 2 entidades que se relacionen de forma clara
- Que no sea demasiado complejo (evitar más de 4 entidades)
- Que sea demostrable en la presentación final

### 4. Definir Entidades y Relaciones

Una vez elegido el tema, se deben definir:

- Las entidades principales
- Las propiedades de cada entidad
- Las relaciones entre entidades
- Los tipos de datos de cada propiedad

**Ejemplo: Sistema de Biblioteca**

```
Libro (Id, Titulo, AutorId, ISBN, AnioPublicacion, Disponible)
Autor (Id, Nombre, Apellido, FechaNacimiento, Nacionalidad)
Prestamo (Id, LibroId, Usuario, FechaPrestamo, FechaDevolucion, Devuelto)

Relaciones:
- Autor 1 --- N Libro (un autor tiene muchos libros)
- Libro 1 --- N Prestamo (un libro puede prestarse muchas veces)
```

### 5. Planificar Endpoints

Para cada entidad principal se deben definir los endpoints REST:

**Ejemplo: Endpoints para Biblioteca**

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | /api/libros | Obtener todos los libros |
| GET | /api/libros/{id} | Obtener libro por ID |
| POST | /api/libros | Crear un nuevo libro |
| PUT | /api/libros/{id} | Actualizar un libro |
| DELETE | /api/libros/{id} | Eliminar un libro |
| GET | /api/autores | Obtener todos los autores |
| GET | /api/autores/{id} | Obtener autor por ID |
| POST | /api/autores | Crear un nuevo autor |
| PUT | /api/autores/{id} | Actualizar un autor |
| DELETE | /api/autores/{id} | Eliminar un autor |
| GET | /api/prestamos | Obtener todos los préstamos |
| POST | /api/prestamos | Registrar un préstamo |
| PUT | /api/prestamos/{id}/devolver | Registrar devolución |

### 6. Mockups de la API

Antes de escribir código es útil planificar visualmente la respuesta de la API. Esto ayuda a definir los DTOs.

**Ejemplo: GET /api/libros respuesta esperada**

```json
[
  {
    "id": 1,
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "isbn": "978-84-376-0494-7",
    "anioPublicacion": 1967,
    "disponible": true
  }
]
```

**Ejemplo: POST /api/libros cuerpo de solicitud**

```json
{
  "titulo": "El amor en los tiempos del cólera",
  "autorId": 1,
  "isbn": "978-84-376-0495-4",
  "anioPublicacion": 1985
}
```

### 7. Organización del Equipo

Para equipos de 2 a 4 personas, se recomienda:

| Rol | Responsabilidades |
|-----|-------------------|
| Líder técnico | Coordina el equipo, revisa PRs, gestiona repositorio |
| Modelador | Define modelos, DbContext, migraciones |
| API developer | Implementa controladores, DTOs, validaciones |
| Documentador | Escribe README, documenta endpoints, capturas |

Los roles no son excluyentes. Todos deben contribuir al código.

### 8. Crear Repositorio en GitHub

Pasos para la configuración inicial:

```bash
# Crear carpeta del proyecto
mkdir SistemaBiblioteca
cd SistemaBiblioteca

# Inicializar repositorio
git init

# Crear solución y proyecto
dotnet new sln -n SistemaBiblioteca
dotnet new webapi -n Api
dotnet sln add Api/Api.csproj

# Commit inicial
git add .
git commit -m "chore: estructura inicial del proyecto"

# Conectar con GitHub
git branch -M main
git remote add origin https://github.com/usuario/sistema-biblioteca.git
git push -u origin main
```

### 9. Milestones del Proyecto

| Milestone | Fecha | Entregable |
|-----------|-------|------------|
| M1 - Planeación | Clase 16 | Tema definido, entidades, endpoints, repo creado |
| M2 - Modelado | Clase 17 | Modelos, DbContext, migración, seed data |
| M3 - API | Clase 18 | Controladores CRUD, DTOs, validaciones, Swagger |
| M4 - Documentación | Clase 19 | README, pruebas, capturas, video |
| M5 - Presentación | Clase 20 | Slides, demo, entrega final |

---

## Ejemplo Práctico: Plan de Proyecto para "Sistema de Biblioteca"

**Tema:** Sistema de gestión de biblioteca

**Entidades:**
- Libro (Id, Titulo, AutorId, ISBN, AnioPublicacion, Disponible)
- Autor (Id, Nombre, Apellido, FechaNacimiento, Nacionalidad)
- Prestamo (Id, LibroId, Usuario, FechaPrestamo, FechaDevolucion, Devuelto)

**Relaciones:** Autor 1:N Libro, Libro 1:N Prestamo

**Endpoints planificados:** 13 endpoints (5 libros, 5 autores, 3 préstamos)

**Equipo:** 3 personas (líder, modelador, api developer)

**Repositorio:** `github.com/equipo/sistema-biblioteca`

**Milestone 1:** Tema definido, entidades documentadas, endpoints listados, repo creado con README inicial.

---

## Ejercicios

### Nivel 1 — Básico

**Enunciado:** Define el tema de tu proyecto final y las entidades principales.

**Requisitos:**
- Elegir un tema de la lista o proponer uno propio
- Definir al menos 2 entidades principales
- Listar 3 propiedades por cada entidad con su tipo de dato
- Identificar la relación entre las entidades

**Entregable:** Un documento en Markdown con el tema, las entidades, propiedades y relaciones.

**Criterios de evaluación:**
- Tema claramente definido
- Entidades con propiedades y tipos correctos
- Relaciones identificadas correctamente

### Nivel 2 — Intermedio

**Enunciado:** Planifica todos los endpoints de tu API.

**Requisitos:**
- Listar todos los endpoints REST para cada entidad
- Indicar método HTTP y URL para cada endpoint
- Describir brevemente lo que hace cada endpoint
- Incluir al menos un endpoint que no sea CRUD básico (ej: buscar, filtrar, devolver)

**Entregable:** Tabla de endpoints en el README del proyecto.

**Criterios de evaluación:**
- Todos los endpoints necesarios están listados
- Los métodos HTTP son correctos según la acción
- Hay al menos un endpoint de búsqueda o filtro

### Nivel 3 — Reto

**Enunciado:** Crea el repositorio en GitHub con la estructura inicial del proyecto y un README.md profesional.

**Requisitos:**
- Crear el repositorio en GitHub (público)
- Inicializar con solución .NET y proyecto Web API
- README.md con: nombre del proyecto, descripción, tecnologías, integrantes, cómo ejecutar
- Al menos 2 commits con mensajes descriptivos
- Compartir la URL del repositorio

**Entregable:** URL del repositorio de GitHub con README inicial.

**Criterios de evaluación:**
- Repositorio creado correctamente
- README completo y profesional
- Commits con mensajes descriptivos
- La solución compila correctamente (`dotnet build`)
