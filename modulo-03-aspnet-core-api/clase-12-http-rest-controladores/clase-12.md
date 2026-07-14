# Clase 12 — HTTP, REST y Controladores

## Objetivo

Comprender el protocolo HTTP, sus verbos y códigos de estado, los principios de REST, y aprender a implementar controladores en ASP.NET Core que expongan APIs RESTful correctamente estructuradas.

---

## Contenido

### ¿Qué es HTTP?

HTTP (Hypertext Transfer Protocol) es el protocolo de comunicación que permite la transferencia de información en la web. Es un protocolo cliente-servidor sin estado: cada petición es independiente y el servidor no guarda información entre peticiones (a menos que se usen mecanismos como cookies o tokens).

Características fundamentales:

- **Cliente-servidor:** El cliente envía una solicitud, el servidor responde
- **Sin estado:** Cada petición es independiente
- **Basado en texto:** Los mensajes son legibles (aunque HTTPS los cifra)
- **Orientado a recursos:** Se trabaja con URLs que representan recursos
- **Métodos estandarizados:** GET, POST, PUT, DELETE, PATCH, entre otros

### Request / Response

Una comunicación HTTP consta de dos partes:

**Request (solicitud):**

```
GET /api/productos HTTP/1.1
Host: localhost:5238
Accept: application/json
Authorization: Bearer token123
```

Componentes:
- Línea de solicitud: método + ruta + versión HTTP
- Headers: metadatos (tipo de contenido, autenticación, etc.)
- Body: datos (solo en POST, PUT, PATCH)

**Response (respuesta):**

```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 142

{ "id": 1, "nombre": "Laptop", "precio": 899.00 }
```

Componentes:
- Línea de estado: versión HTTP + código + mensaje
- Headers: metadatos de la respuesta
- Body: datos devueltos (puede estar vacío)

### Verbos HTTP

Los verbos (o métodos) HTTP indican la acción a realizar sobre un recurso:

| Verbo | CRUD | Descripción | Idempotente | Seguro |
|-------|------|-------------|-------------|--------|
| GET | Read | Obtener recurso(s) | Sí | Sí |
| POST | Create | Crear un nuevo recurso | No | No |
| PUT | Update | Reemplazar un recurso completo | Sí | No |
| PATCH | Update (parcial) | Actualizar parte de un recurso | No | No |
| DELETE | Delete | Eliminar un recurso | Sí | No |

**Idempotente:** Realizar la misma petición múltiples veces produce el mismo resultado.
**Seguro:** No modifica el estado del servidor (solo lectura).

### Códigos de estado HTTP

Los códigos de estado se agrupan en categorías:

**2xx — Éxito**

| Código | Descripción | Uso típico |
|--------|-------------|------------|
| 200 OK | Solicitud exitosa | GET, PUT, PATCH exitosos |
| 201 Created | Recurso creado | POST exitoso |
| 204 No Content | Sin contenido | DELETE exitoso, PUT sin body |

**3xx — Redirección**

| Código | Descripción |
|--------|-------------|
| 301 Moved Permanently | Recurso movido permanentemente |
| 302 Found | Redirección temporal |
| 304 Not Modified | Usar caché |

**4xx — Error del cliente**

| Código | Descripción | Uso típico |
|--------|-------------|------------|
| 400 Bad Request | Solicitud mal formada | Validación fallida |
| 401 Unauthorized | No autenticado | Falta token |
| 403 Forbidden | No autorizado | Sin permisos |
| 404 Not Found | Recurso no encontrado | ID inexistente |
| 409 Conflict | Conflicto | Duplicado |

**5xx — Error del servidor**

| Código | Descripción | Uso típico |
|--------|-------------|------------|
| 500 Internal Server Error | Error inesperado | Excepción no manejada |
| 502 Bad Gateway | Error en proxy/gateway | Infraestructura |
| 503 Service Unavailable | Servicio no disponible | Mantenimiento |

### ¿Qué es REST?

REST (Representational State Transfer) es un estilo arquitectónico para diseñar servicios web. Fue definido por Roy Fielding en su tesis doctoral del año 2000.

Principios REST:

1. **Cliente-servidor:** Separación clara entre interfaz y almacenamiento
2. **Sin estado (stateless):** Cada petición contiene toda la información necesaria
3. **Cacheable:** Las respuestas pueden indicar si son cacheables
4. **Interfaz uniforme:** Recursos identificados por URLs, representaciones estándar, mensajes autodescriptivos
5. **Sistema en capas:** El cliente no sabe si se comunica directamente con el servidor final o con un intermediario
6. **Código bajo demanda (opcional):** El servidor puede extender la funcionalidad del cliente

### Principios REST aplicados a APIs

**Recursos, no acciones:**
- ✅ `GET /api/productos` — obtener productos
- ❌ `GET /api/obtenerProductos` — acción en la URL
- ✅ `POST /api/productos` — crear producto
- ❌ `GET /api/crearProducto` — verbo en la URL

**Plurales para colecciones:**
- ✅ `/api/productos`, `/api/usuarios`
- ❌ `/api/producto`, `/api/getUser`

**Anidamiento para relaciones:**
- ✅ `GET /api/categorias/1/productos` — productos de una categoría

**Versiones:**
- ✅ `/api/v1/productos`, `/api/v2/productos`

### Controladores en ASP.NET Core

Un controlador es una clase que maneja peticiones HTTP. Hereda de `ControllerBase` y se decora con atributos.

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MiApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
    [HttpGet]
    public IActionResult ObtenerTodos()
    {
        // lógica
    }

    [HttpGet("{id}")]
    public IActionResult ObtenerPorId(int id)
    {
        // lógica
    }

    [HttpPost]
    public IActionResult Crear([FromBody] ProductoDto producto)
    {
        // lógica
    }

    [HttpPut("{id}")]
    public IActionResult Actualizar(int id, [FromBody] ProductoDto producto)
    {
        // lógica
    }

    [HttpDelete("{id}")]
    public IActionResult Eliminar(int id)
    {
        // lógica
    }
}
```

### [ApiController]

El atributo `[ApiController]` aporta comportamientos automáticos:

- **Validación automática:** Si el modelo no es válido, devuelve 400 automáticamente
- **Inferencia de parámetros:** Asume `[FromBody]` para tipos complejos y `[FromRoute]` para tipos simples
- **Problema detallado:** Las respuestas de error usan el estándar Problem Details (RFC 7807)

### [Route]

Define la plantilla de URL. Soporta tokens:

- `[controller]` → se reemplaza por el nombre del controlador (sin "Controller")
- `[action]` → se reemplaza por el nombre del método

Ejemplos:

```csharp
[Route("api/[controller]")]        // /api/productos
[Route("api/v1/[controller]")]     // /api/v1/productos
[Route("api/tienda/[controller]")] // /api/tienda/productos
```

### Atributos de acción

Cada verbo HTTP tiene su atributo correspondiente:

```csharp
[HttpGet]          // GET
[HttpPost]         // POST
[HttpPut]          // PUT
[HttpPatch]        // PATCH
[HttpDelete]       // DELETE
```

Pueden recibir una plantilla de ruta adicional:

```csharp
[HttpGet("{id}")]              // GET /api/productos/5
[HttpGet("categoria/{catId}")] // GET /api/productos/categoria/2
```

### FromBody, FromRoute, FromQuery

Estos atributos indican de dónde debe tomar el valor el parámetro:

```csharp
[HttpPost]
public IActionResult Crear([FromBody] ProductoDto producto)
{
    // El body viene en JSON y se deserializa a ProductoDto
}

[HttpGet("{id}")]
public IActionResult ObtenerPorId([FromRoute] int id)
{
    // id viene de la ruta: /api/productos/5
}

[HttpGet]
public IActionResult Buscar([FromQuery] string nombre, [FromQuery] decimal? precioMax)
{
    // nombre y precioMax vienen del query string: /api/productos?nombre=laptop&precioMax=1000
}
```

En controladores con `[ApiController]`, la inferencia es automática:
- Tipos complejos (clases, records) → `[FromBody]`
- Tipos simples (int, string, decimal) → `[FromRoute]`
- Parámetros `IFormFile` → `[FromForm]`

### IActionResult vs ActionResult<T>

**IActionResult:** Interfaz base que permite devolver cualquier tipo de respuesta.

```csharp
[HttpGet("{id}")]
public IActionResult Obtener(int id)
{
    var producto = repositorio.Obtener(id);
    if (producto == null)
        return NotFound();

    return Ok(producto);
}
```

**ActionResult<T>:** Versión genérica que permite devolver un tipo específico o un código de estado. Mejor integración con Swagger.

```csharp
[HttpGet("{id}")]
public ActionResult<Producto> Obtener(int id)
{
    var producto = repositorio.Obtener(id);
    if (producto == null)
        return NotFound();

    return producto;
}
```

La diferencia principal: `ActionResult<T>` documenta automáticamente el tipo de respuesta en Swagger.

---

## Ejemplo guiado: Controlador CRUD de productos con endpoints RESTful

Implementaremos un controlador completo para gestionar productos usando una lista en memoria.

```csharp
using Microsoft.AspNetCore.Mvc;

namespace MiApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
    private static List<Producto> _productos = new()
    {
        new Producto { Id = 1, Nombre = "Laptop", Precio = 899.00m },
        new Producto { Id = 2, Nombre = "Mouse", Precio = 25.50m },
        new Producto { Id = 3, Nombre = "Teclado", Precio = 45.99m }
    };

    private static int _nextId = 4;

    [HttpGet]
    public ActionResult<List<Producto>> ObtenerTodos()
    {
        return Ok(_productos);
    }

    [HttpGet("{id}")]
    public ActionResult<Producto> ObtenerPorId(int id)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto == null)
            return NotFound();

        return producto;
    }

    [HttpPost]
    public ActionResult<Producto> Crear([FromBody] Producto nuevo)
    {
        nuevo.Id = _nextId++;
        _productos.Add(nuevo);
        return CreatedAtAction(nameof(ObtenerPorId), new { id = nuevo.Id }, nuevo);
    }

    [HttpPut("{id}")]
    public IActionResult Actualizar(int id, [FromBody] Producto actualizado)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto == null)
            return NotFound();

        producto.Nombre = actualizado.Nombre;
        producto.Precio = actualizado.Precio;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Eliminar(int id)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto == null)
            return NotFound();

        _productos.Remove(producto);
        return NoContent();
    }
}

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
}
```

Códigos de respuesta utilizados:
- `200 OK` para GET exitoso
- `201 Created` con `Location` header en POST
- `204 No Content` para PUT y DELETE exitosos
- `404 Not Found` cuando el recurso no existe

---

## Ejercicios

### Nivel 1 — Básico: Endpoint GET con parámetro query

**Enunciado:**
Crea un controlador `SaludosController` con un endpoint GET que reciba un parámetro query `nombre` y devuelva un saludo personalizado.

**Requisitos:**
- Endpoint: `GET /api/saludos?nombre=Eddy`
- Si no se envía `nombre`, devolver "Hola, invitado"
- Usar `[FromQuery]` explícitamente

**Entrada esperada:**
```
GET /api/saludos?nombre=Eddy
GET /api/saludos
```

**Salida esperada:**
```json
{ "mensaje": "Hola, Eddy" }
{ "mensaje": "Hola, invitado" }
```

**Criterios de evaluación:**
- Controlador correctamente decorado
- Parámetro query recibido y procesado
- Valor por defecto cuando no se envía nombre

---

### Nivel 2 — Intermedio: Controlador de tareas con GET y POST

**Enunciado:**
Crea un controlador `TareasController` que maneje una lista de tareas en memoria con GET (listar todas y obtener por id) y POST (crear tarea).

**Requisitos:**
- Modelo `Tarea` con `Id` (int), `Titulo` (string), `Completada` (bool)
- `GET /api/tareas` → lista todas
- `GET /api/tareas/{id}` → obtiene una
- `POST /api/tareas` → crea y devuelve 201
- Manejar 404 si la tarea no existe

**Entrada esperada:**
```
GET /api/tareas
POST /api/tareas  Body: { "titulo": "Estudiar C#", "completada": false }
```

**Salida esperada:**
```json
{
  "id": 1,
  "titulo": "Estudiar C#",
  "completada": false
}
```

**Criterios de evaluación:**
- Modelo definido correctamente
- GET funcional con lista y por id
- POST con CreatedAtAction
- Manejo de NotFound

---

### Nivel 3 — Reto: CRUD completo de libros usando IActionResult

**Enunciado:**
Crea un controlador CRUD completo para libros. Cada libro tiene: `Id`, `Titulo`, `Autor`, `AñoPublicacion` y `Disponible` (bool). Usa IActionResult en todos los endpoints.

**Requisitos:**
- `GET /api/libros` → lista completa (200)
- `GET /api/libros/{id}` → libro por id (200) o 404
- `GET /api/libros/disponibles` → solo libros disponibles (200)
- `POST /api/libros` → crear libro (201)
- `PUT /api/libros/{id}` → actualizar libro (204) o 404
- `DELETE /api/libros/{id}` → eliminar libro (204) o 404
- Lista inicial con 5 libros de ejemplo
- Id autoincremental

**Entrada esperada:**
```
GET /api/libros
GET /api/libros/disponibles
POST /api/libros  Body: { "titulo": "C# Avanzado", "autor": "John Doe", "anioPublicacion": 2024, "disponible": true }
PUT /api/libros/1  Body: { "titulo": "Editado", "autor": "Otro", "anioPublicacion": 2023, "disponible": false }
DELETE /api/libros/3
```

**Salida esperada:**
- GET lista: array de libros
- GET /disponibles: solo los que tienen `disponible: true`
- POST: 201 Created con el libro creado y Location header
- PUT: 204 No Content
- DELETE: 204 No Content
- 404 para IDs inexistentes

**Criterios de evaluación:**
- Todos los endpoints RESTful implementados
- Códigos de estado correctos en cada operación
- Endpoint adicional de filtrado (disponibles)
- Manejo completo de errores con 404
- Uso de IActionResult y CreatedAtAction
- Código limpio y organizado
