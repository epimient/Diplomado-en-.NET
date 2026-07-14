# Ejercicios — Clase 14: Entity Framework Core y SQLite

## Nivel 1: Crear DbContext + migración

**Enunciado:**  
Crea un proyecto Web API con Entity Framework Core y SQLite. Define un modelo `Categoria` y genera la migración inicial.

**Requisitos:**
- Agregar paquetes: `Microsoft.EntityFrameworkCore`, `Microsoft.EntityFrameworkCore.Sqlite`, `Microsoft.EntityFrameworkCore.Design`.
- Clase `Categoria` con `Id` (int), `Nombre` (string requerido), `Descripcion` (string?).
- Clase `AppDbContext` que herede de `DbContext` con `DbSet<Categoria>`.
- Configurar conexión a SQLite en `appsettings.json` con archivo `app.db`.
- Crear migración con `dotnet ef migrations add InitialCreate`.
- Aplicar migración con `dotnet ef database update`.
- Verificar que la tabla se creó.

**Entrada esperada:**
```
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Salida esperada:**  
La base de datos `app.db` se crea con la tabla `Categorias` y columnas `Id`, `Nombre`, `Descripcion`.

---

## Nivel 2: CRUD Categorías con EF

**Enunciado:**  
Implementa un controlador `CategoriasController` con CRUD completo usando Entity Framework Core e inyección de dependencias.

**Requisitos:**
- Inyectar `AppDbContext` en el controlador.
- `GET /api/categorias` → lista todas las categorías.
- `GET /api/categorias/{id}` → una categoría o 404.
- `POST /api/categorias` → crear nueva categoría.
- `PUT /api/categorias/{id}` → actualizar.
- `DELETE /api/categorias/{id}` → eliminar.
- Todos los métodos deben ser asíncronos (async/await).
- Probar cada operación desde Swagger.

**Entrada esperada:**  
`POST /api/categorias` Body:
```json
{ "nombre": "Electrónica", "descripcion": "Productos electrónicos" }
```

**Salida esperada:**
```json
{ "id": 1, "nombre": "Electrónica", "descripcion": "Productos electrónicos" }
```

---

## Nivel 3: Relación Producto-Categoría con LINQ

**Enunciado:**  
Extiende el proyecto para incluir la entidad `Producto` con relación muchos-a-uno hacia `Categoria`. Usa LINQ para consultas con joins y filtros.

**Requisitos:**
- Clase `Producto` con `Id`, `Nombre`, `Precio`, `CategoriaId` (FK), `Categoria` (nav prop).
- Actualizar `AppDbContext` y crear migración.
- `GET /api/productos` → lista con nombre de categoría incluido (usar `Include` o proyección).
- `GET /api/productos/categoria/{categoriaId}` → filtrar productos por categoría usando LINQ `Where`.
- `GET /api/categorias/{id}/productos` → productos de una categoría específica.
- Probar consultas con datos relacionados.

**Entrada esperada:**  
`GET /api/productos`

**Salida esperada:**
```json
[
  {
    "id": 1,
    "nombre": "Laptop",
    "precio": 15000,
    "categoriaId": 1,
    "categoria": { "id": 1, "nombre": "Electrónica" }
  },
  {
    "id": 2,
    "nombre": "Mouse",
    "precio": 250,
    "categoriaId": 1,
    "categoria": { "id": 1, "nombre": "Electrónica" }
  }
]
```

**GET /api/productos/categoria/1** → solo productos de Electrónica.
