# Dudas — Clase 16

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cómo elegir las entidades del proyecto?

Identifica los objetos principales del dominio. Por ejemplo, para un sistema de biblioteca: `Libro`, `Autor`, `Prestamo`, `Usuario`. Cada entidad debe tener una identidad única (Id) y representar un concepto del negocio.

### ¿Cuántas entidades debe tener el proyecto final?

Mínimo 2 entidades relacionadas. Por ejemplo: `Producto` ↔ `Categoria` o `Libro` ↔ `Autor`. Se recomienda 3-4 entidades para un proyecto completo pero manejable.

### ¿Cómo diseñar los endpoints de la API?

Para cada entidad principal, crea un controlador con operaciones CRUD:

```
GET    /api/productos       → Listar todos
GET    /api/productos/{id}  → Obtener uno
POST   /api/productos       → Crear
PUT    /api/productos/{id}  → Actualizar
DELETE /api/productos/{id}  → Eliminar
```

### ¿Qué herramientas usar para planificar?

- Diagramas UML (puedes dibujarlos en papel o con herramientas como draw.io).
- Tabla de relaciones entre entidades.
- Lista de endpoints planeados.
- Trello, GitHub Projects o Notion para gestionar tareas.

### ¿Cómo documentar el plan del proyecto?

Crea un `README.md` inicial que incluya:

- Nombre del proyecto y descripción.
- Entidades y sus relaciones.
- Endpoints planeados.
- Tecnologías a usar (.NET, EF Core, SQLite, Swagger).
- Integrantes del equipo.

### ¿Qué pasa si me equivoco en el diseño inicial?

Es normal. El diseño inicial es una guía, no un contrato rígido. Las migraciones de EF Core permiten modificar la base de datos en cualquier momento. Lo importante es tener un punto de partida claro.

### ¿Es obligatorio usar GitHub?

Sí. El proyecto debe entregarse en un repositorio de GitHub. Esto incluye commits frecuentes, un README.md profesional y evidencia del trabajo en equipo.
