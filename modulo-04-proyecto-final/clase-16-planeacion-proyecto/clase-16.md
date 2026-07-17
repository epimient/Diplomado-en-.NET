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

Cada equipo debe seleccionar un tema alineado a los **Objetivos de Desarrollo Sostenible (ODS)**. El proyecto debe resolver un problema real o simulado usando la API.

**Problemáticas sugeridas:**

| Proyecto | ODS |
|----------|-----|
| Clasificador de quejas ciudadanas con IA | ODS 11 — Ciudades sostenibles |
| Match tutor-estudiante vulnerable | ODS 4 — Educación de calidad |
| Eco-puntos: clasificador de residuos | ODS 12 — Producción responsables |
| Reducción de desperdicio alimenticio | ODS 2 — Hambre cero |
| Detección de plagas en cultivos | ODS 2 — Hambre cero |
| Monitoreo de calidad del aire | ODS 11 — Ciudades sostenibles |
| Marketplace local agricultor-consumidor | ODS 8 — Trabajo decente |
| Propio (validado con instructor) | — |

**Criterios para elegir bien:**
- Que sea un dominio conocido por todo el equipo
- Que tenga al menos 2 entidades que se relacionen de forma clara
- Que no sea demasiado complejo (evitar más de 4 entidades)
- Que sea demostrable en la presentación final
- Que pueda integrar análisis con IA (Groq) de forma natural

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

Grupos de **4 personas** con roles definidos:

| Rol | Responsabilidad |
|-----|----------------|
| Backend / TL | Arquitectura, modelos, DbContext, endpoints principales, coordina al equipo |
| API / IA | Integración con Groq, HttpClient, prompt engineering, endpoints de análisis |
| BD / DTOs | Validaciones, DTOs, consultas LINQ, seed data, filtros y búsquedas |
| Docs / QA | README, Swagger, capturas de pruebas, casos válidos e inválidos, presentación |

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

### 10. Check-ins Obligatorios (Semana 4)

Cada equipo debe cumplir con **2 check-ins obligatorios** durante la semana 4 para verificar el avance real del proyecto:

| Check-in | Cuándo | Qué debe funcionar |
|----------|--------|--------------------|
| Check-in 1 | Después de clase 17 | Modelos creados, DbContext + migración, al menos 1 endpoint funcional |
| Check-in 2 | Después de clase 18 | CRUD completo, IA integrada (Groq), Swagger funcionando |

**Penalización por incumplimiento:**
- -0.2 puntos sobre la nota final por cada check-in sin avance real
- Máximo descuento: -0.4 puntos
- Se considera "sin avance real" cuando el repositorio no muestra commits nuevos o el código no compila

---

## Ejemplo Práctico: Plan de Proyecto para "Eco-puntos"

**Tema:** Clasificador de puntos de reciclaje (ODS 12 — Producción responsables)

**ODS:** ODS 12 — Producción y consumo responsables

**Entidades:**
- PuntoReciclaje (Id, Nombre, Direccion, TipoResiduo, Horario, Latitud, Longitud)
- Residuo (Id, Tipo, Descripcion, InstruccionesReciclaje, TiempoDescomposicion)
- Reporte (Id, PuntoReciclajeId, Usuario, Fecha, Foto, Observacion)

**Relaciones:** PuntoReciclaje 1:N Reporte

**IA (Groq):** Endpoint `POST /api/reportes/{id}/analizar` que envía la observación del reporte a Groq para clasificar automáticamente el tipo de residuo y sugerir acciones.

**Endpoints planificados:** 12 endpoints (5 puntos, 4 residuos, 3 reportes + 1 análisis IA)

**Equipo:**
- Backend / TL: Arquitectura, endpoints principales, coordinación
- API / IA: Integración con Groq, HttpClient, prompt engineering
- BD / DTOs: Validaciones, DTOs, seed data, consultas LINQ
- Docs / QA: README, Swagger, capturas, casos de prueba

**Repositorio:** `github.com/equipo/eco-puntos-api`

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
