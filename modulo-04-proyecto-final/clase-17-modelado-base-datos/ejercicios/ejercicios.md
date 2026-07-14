# Ejercicios — Clase 17: Modelado y Base de Datos

## Nivel 1: Crear modelos del proyecto

**Enunciado:**  
Crea las clases modelo en C# para las entidades definidas en la planeación. Incluye Data Annotations y relaciones de navegación.

**Requisitos:**
- Crear proyecto Web API con `dotnet new webapi`.
- Crear carpeta `Models/` con una clase por entidad.
- Usar Data Annotations: `[Key]`, `[Required]`, `[MaxLength]`, `[ForeignKey]`.
- Incluir propiedades de navegación para relaciones.
- Al menos 2 entidades con relación 1:N o N:N.

**Entrada esperada:**  
Modelo `Libro`:
```csharp
public class Libro
{
    public int Id { get; set; }
    [Required, MaxLength(100)]
    public string Titulo { get; set; }
    [Required, MaxLength(100)]
    public string Autor { get; set; }
    [MaxLength(20)]
    public string ISBN { get; set; }
    public bool Disponible { get; set; } = true;
    public List<Prestamo> Prestamos { get; set; } = new();
}
```

**Salida esperada:**  
Archivos `Libro.cs` y `Prestamo.cs` en `Models/` con código compilable.

---

## Nivel 2: DbContext + migración inicial

**Enunciado:**  
Crea la clase `AppDbContext` y configura la conexión a SQLite. Genera la migración inicial y aplica los cambios a la base de datos.

**Requisitos:**
- Clase `AppDbContext` con `DbSet` para cada entidad.
- Configurar cadena de conexión en `appsettings.json` con `Data Source=proyecto.db`.
- Registrar `AppDbContext` en `Program.cs` con `AddDbContext`.
- Agregar paquetes EF Core necesarios.
- Crear migración con `dotnet ef migrations add MigracionInicial`.
- Aplicar migración con `dotnet ef database update`.

**Entrada esperada:**  
```bash
dotnet ef migrations add MigracionInicial
dotnet ef database update
```

**Salida esperada:**  
Base de datos `proyecto.db` creada con tablas para cada entidad y sus relaciones (FK, índices).

---

## Nivel 3: Seed data con 3 registros

**Enunciado:**  
Agrega datos iniciales (seed) a tu base de datos usando `HasData` en `OnModelCreating` o un seed en `Program.cs`.

**Requisitos:**
- Insertar al menos 3 registros de prueba por entidad principal.
- Usar `HasData` en `OnModelCreating` con IDs fijos.
- Generar nueva migración con los datos seed.
- Verificar que al ejecutar la API los datos aparezcan en los endpoints GET.
- Incluir datos variados para probar filtros y relaciones.

**Entrada esperada:**  
```bash
dotnet ef migrations add SeedData
dotnet ef database update
```

**Salida esperada:**  
`GET /api/libros` devuelve 3 libros.  
`GET /api/prestamos` devuelve préstamos relacionados con esos libros.
```json
[
  {
    "id": 1,
    "titulo": "C# para Principiantes",
    "autor": "Juan Pérez",
    "isbn": "978-1234567890",
    "disponible": false,
    "prestamos": [
      { "id": 1, "nombreUsuario": "Ana López", "fechaPrestamo": "2026-07-01" }
    ]
  },
  {
    "id": 2,
    "titulo": "Programación Avanzada",
    "autor": "María García",
    "isbn": "978-0987654321",
    "disponible": true,
    "prestamos": []
  },
  {
    "id": 3,
    "titulo": "Patrones de Diseño",
    "autor": "Carlos Ruiz",
    "isbn": "978-1122334455",
    "disponible": true,
    "prestamos": []
  }
]
```
