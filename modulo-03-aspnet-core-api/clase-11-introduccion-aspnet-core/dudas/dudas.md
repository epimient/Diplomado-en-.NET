# Dudas y Notas de Clase — Clase 11: Introducción a ASP.NET Core

Esta guía responde a las dudas más comunes, errores habituales y conceptos clave al iniciar con el desarrollo de APIs REST en ASP.NET Core.

---

## 1. ¿Qué es ASP.NET Core y en qué se diferencia de ASP.NET Framework clásico?

**ASP.NET Core** es el framework moderno, multiplataforma y de alto rendimiento de Microsoft para construir aplicaciones web y APIs REST. Es el sucesor directo de ASP.NET Framework.

| Característica | ASP.NET Framework (Clásico) | ASP.NET Core (Moderno) |
|---|---|---|
| **Sistemas Operativos** | Solo Windows | Windows, Linux, macOS |
| **Arquitectura** | Monolítica, atada a IIS | Modular, ligera, servidores embebidos |
| **Rendimiento** | Moderado | Uno de los frameworks más rápidos del mundo |
| **Inyección de Dependencias** | Requiere librerías de terceros (Autofac, Ninject) | Integrada nativamente |
| **Código** | Código cerrado | Código abierto (Open Source en GitHub) |
| **Estado actual** | En mantenimiento (no recibirá nuevas características) | En desarrollo activo (usar .NET 8 LTS) |

> **Regla de oro**: Para cualquier proyecto nuevo siempre se debe usar **ASP.NET Core**.

---

## 2. ¿Por qué la aplicación levanta en dos URLs (HTTP y HTTPS)?

Al ejecutar `dotnet run`, la consola suele mostrar algo como:

```text
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:7238
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5238
```

Estas URLs provienen del archivo `Properties/launchSettings.json`:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5238",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7238;http://localhost:5238",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

### ¿Cuál debo usar para mis pruebas?
- **HTTP (`http://localhost:5238`)**: Es más sencillo para pruebas locales iniciales en Thunder Client, Postman o curl, ya que no requiere certificar SSL.
- **HTTPS (`https://localhost:7238`)**: Es el estándar seguro. Si la consola muestra advertencias sobre certificados SSL no confiables en Linux/Mac/Windows, puedes confiar el certificado local ejecutando:

```bash
dotnet dev-certs https --trust
```

---

## 3. ¿Qué es Kestrel y por qué no necesito instalar IIS o Apache en desarrollo?

**Kestrel** es el servidor web HTTP multiplataforma embebido dentro de la plataforma .NET. 

```txt
[ Cliente HTTP (Browser / Postman) ] 
                 │
                 ▼
     [ Servidor Kestrel (.NET) ]
                 │
                 ▼
    [ Pipeline HTTP / Controladores ]
```

- **En desarrollo**: No necesitas instalar Apache, Nginx o IIS. `dotnet run` inicia Kestrel directamente y la API empieza a escuchar peticiones de inmediato.
- **En producción**: Kestrel se ejecuta detrás de un **Proxy Inverso** (Nginx, IIS o Apache) que se encarga de la terminación SSL, balanceo de carga y protección contra ataques DDoS.

---

## 4. ¿Cuál es la diferencia entre Controller-based APIs y Minimal APIs?

ASP.NET Core ofrece dos formas de definir endpoints:

| Criterio | Controller-based API | Minimal API |
|---|---|---|
| **Estructura** | Basada en clases (`ControllerBase`) y atributos | Definida directamente en `Program.cs` |
| **Organización** | Un archivo por recurso (ej: `ProductosController.cs`) | Todo agrupado o en lambdas |
| **Complejidad** | Más código inicial, estructurada | Muy poco código inicial |
| **Caso ideal** | APIs medianas/grandes, arquitectura orientada a dominio | Microservicios, APIs de pocos endpoints, prototipos |

### Ejemplo comparativo (Mismo endpoint)

#### Controller-based API:
```csharp
// Controllers/SaludoController.cs
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class SaludoController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { mensaje = "Hola desde Controller" });
    }
}
```

#### Minimal API:
```csharp
// Program.cs
var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/saludo", () => new { mensaje = "Hola desde Minimal API" });

app.Run();
```

> **En este diplomado**: Nos enfocaremos en **Controller-based APIs** porque enseñan la separación de responsabilidades necesaria para proyectos grandes y estructurados.

---

## 5. ¿Qué significan `[ApiController]` y `[Route("api/[controller]")]`?

Cuando creas una clase de controlador en ASP.NET Core Web API:

```csharp
[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
}
```

### 1. `[Route("api/[controller]")]`
- Define la ruta base para todos los endpoints de esa clase.
- `[controller]` es una ficha de reemplazo (token) que ASP.NET Core sustituye automáticamente por el nombre de la clase **sin la palabra Controller**.
- Para `ProductosController`, la ruta base será `/api/productos`.
- Si renombras la clase a `ArticulosController`, la ruta cambiará automáticamente a `/api/articulos`.

### 2. `[ApiController]`
Habilita comportamientos automáticos para APIs REST:
- **Validación automática de modelos**: Si recibes un objeto no válido, devuelve automáticamente un HTTP 400 Bad Request con los detalles del error.
- **Inferencia de origen de datos**: Determina automáticamente si un parámetro viene del Body JSON (`[FromBody]`), de la URL (`[FromRoute]`) o de la query (`[FromQuery]`).
- **Respuestas de error estandarizadas**: Formatea los errores bajo el estándar RFC 7807 (Problem Details).

---

## 6. ¿Cómo se pasan parámetros a una Web API?

Hay tres formas principales de pasar datos a un endpoint:

### A. Parámetros de Ruta (`Route Parameters`)
Se usan para identificar un recurso específico. Forman parte del path de la URL.

```csharp
// Endpoint: GET /api/productos/5
[HttpGet("{id}")]
public IActionResult ObtenerPorId(int id)
{
    return Ok(new { idBuscado = id });
}
```

### B. Parámetros de Consulta (`Query Parameters`)
Se usan para filtrar, ordenar o paginar resultados. Van después del signo `?` en la URL.

```csharp
// Endpoint: GET /api/productos?categoria=laptops&limite=10
[HttpGet]
public IActionResult Buscar([FromQuery] string categoria, [FromQuery] int limite)
{
    return Ok(new { categoria, limite });
}
```

### C. Cuerpo de la Petición (`Request Body`)
Se usa para enviar estructuras complejas de datos (JSON) en peticiones `POST` o `PUT`.

```csharp
// Endpoint: POST /api/productos
// Body JSON: { "nombre": "Teclado", "precio": 49.99 }
[HttpPost]
public IActionResult Crear([FromBody] Producto nuevoProducto)
{
    return Ok(nuevoProducto);
}
```

---

## 7. ¿Por qué usar `IActionResult` en lugar de devolver el tipo de dato directo?

### Retornar tipo directo (Inflexible):
```csharp
[HttpGet("{id}")]
public Producto Obtener(int id)
{
    // ¿Qué pasa si el producto con ese ID no existe?
    // Devuelve null (HTTP 204 No Content o 200 con null), lo cual no es correcto semánticamente.
    return _lista.FirstOrDefault(p => p.Id == id); 
}
```

### Retornar `IActionResult` (Recomendado):
```csharp
[HttpGet("{id}")]
public IActionResult Obtener(int id)
{
    var producto = _lista.FirstOrDefault(p => p.Id == id);
    
    if (producto == null)
    {
        // Devuelve HTTP 404 Not Found explícito
        return NotFound(new { mensaje = $"Producto con ID {id} no fue encontrado." });
    }
    
    // Devuelve HTTP 200 OK con el contenido
    return Ok(producto);
}
```

### Helpers comunes de `ControllerBase`:
- `Ok(data)` → HTTP 200 OK
- `Created(uri, data)` o `CreatedAtAction(...)` → HTTP 201 Created
- `BadRequest(error)` → HTTP 400 Bad Request
- `NotFound(error)` → HTTP 404 Not Found
- `NoContent()` → HTTP 204 No Content

---

## 8. ¿Por qué obtengo un error `404 Not Found` al probar mi API?

Si al hacer una petición obtienes un `404 Not Found`, revisa esta lista de verificación:

1. **Ruta mal escrita en la URL**:
   - Revisa si tu controlador incluye el prefijo `api/`.
   - Ejemplo: La URL correcta es `http://localhost:5238/api/saludo` y no `http://localhost:5238/saludo`.
2. **Nombre del controlador sin el sufijo `Controller`**:
   - La clase DEBE llamarse `NombreController` (ej: `ProductosController.cs`). Si la llamas solo `Productos.cs`, el routing no la reconocerá.
3. **Controladores no mapeados en `Program.cs`**:
   - Asegúrate de que `Program.cs` contenga:
     ```csharp
     builder.Services.AddControllers();
     // ...
     app.MapControllers();
     ```
4. **Verbo HTTP incorrecto**:
   - Hacer un `GET` a un endpoint marcado únicamente con `[HttpPost]`.
5. **No haber reiniciado la aplicación**:
   - Si creaste un controlador nuevo pero no ejecutaste `dotnet run` (o no tenías `dotnet watch run` activado), Kestrel no conocerá los nuevos endpoints.

---

## 9. ¿Cómo usar `dotnet watch run` para recargar cambios automáticamente?

Para evitar detener la consola (`Ctrl + C`) y escribir `dotnet run` cada vez que editas código, usa:

```bash
dotnet watch run
```

### Ventajas:
- Detecta cambios en archivos `.cs` y aplica **Hot Reload** (recarga en caliente) al instante.
- Si requiere recompilar por completo, reinicia la app automáticamente.
- Ahorra mucho tiempo durante el desarrollo.

---

## 10. ¿Por qué los datos guardados en una lista `static` se pierden al reiniciar la app?

En los primeros ejercicios de la clase usamos una lista estática para simular persistencia:

```csharp
public class ProductosController : ControllerBase
{
    private static List<Producto> _productos = new List<Producto>();
}
```

### ¿Por qué ocurre esto?
- Una variable `static` reside **únicamente en la memoria RAM** del proceso del servidor web (Kestrel).
- Al apagar el servidor o reiniciar la app con `dotnet run`, el proceso finaliza y la memoria se libera.
- En la **Clase 14** aprenderemos a solucionar esto conectando la API a una base de datos SQLite con **Entity Framework Core**.

---

## 11. ¿Qué diferencia hay entre `appsettings.json` y `appsettings.Development.json`?

ASP.NET Core utiliza una jerarquía de archivos de configuración JSON:

```
appsettings.json                  ← Configuración general por defecto
appsettings.Development.json      ← Sobrescribe valores solo en ambiente de Desarrollo
```

ASP.NET Core detecta la variable de entorno `ASPNETCORE_ENVIRONMENT`.
- Si `ASPNETCORE_ENVIRONMENT` es `"Development"`, lee `appsettings.json` y luego **sobrescribe** los valores definidos en `appsettings.Development.json`.
- En producción (`"Production"`), solo usará `appsettings.json` o variables de entorno del servidor.

---

## 12. Resumen rápido / Cheatsheet

- **Crear Web API desde la terminal**:
  ```bash
  dotnet new webapi -n MiApi
  cd MiApi
  dotnet run
  ```
- **Ejecutar con recarga automática**:
  ```bash
  dotnet watch run
  ```
- **Ruta de un controlador**:
  `[Route("api/[controller]")]` → Asocia `ProductosController` a `/api/productos`.
- **Verbos HTTP principales**:
  `GET` (Leer), `POST` (Crear), `PUT` (Actualizar todo), `DELETE` (Eliminar).
- **Retorno flexibilizado con estado HTTP**:
  Usar `IActionResult` (`Ok()`, `NotFound()`, `BadRequest()`).
- **Servidor integrado**:
  Kestrel escucha en `localhost` en los puertos definidos en `launchSettings.json`.

