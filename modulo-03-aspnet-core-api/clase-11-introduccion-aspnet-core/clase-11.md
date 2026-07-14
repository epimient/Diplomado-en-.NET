# Clase 11 — Introducción a ASP.NET Core

## Objetivo

Comprender qué es ASP.NET Core, su arquitectura básica, el modelo de proyecto web, los fundamentos de HTTP y routing, y ser capaz de crear el primer endpoint de una API REST utilizando la CLI de .NET.

---

## Contenido

### ¿Qué es ASP.NET Core?

ASP.NET Core es un framework moderno, multiplataforma, de código abierto y de alto rendimiento desarrollado por Microsoft para construir aplicaciones web, APIs REST, aplicaciones en tiempo real y más.

A diferencia de ASP.NET Framework clásico (que solo funcionaba en Windows), ASP.NET Core funciona en Windows, Linux y macOS. Está construido sobre .NET y es el sucesor de ASP.NET Framework.

Características principales:

- Multiplataforma (Windows, Linux, macOS)
- Alto rendimiento (está entre los frameworks más rápidos)
- Código abierto (repositorio en GitHub)
- Inyección de dependencias integrada
- Middleware para personalizar el pipeline HTTP
- compatible con contenedores (Docker)
- Soporte para desarrollo de APIs REST y MVC

### Web API vs MVC

ASP.NET Core permite dos enfoques principales:

**MVC (Model-View-Controller):** Se usa cuando devolvemos vistas HTML. Incluye controladores que devuelven `View()` con una interfaz de usuario renderizada en el servidor. Ideal para aplicaciones web tradicionales con frontend server-side.

**Web API:** Se usa cuando devolvemos datos (generalmente JSON o XML). Los controladores devuelven `IActionResult` con objetos serializados. Ideal para servicios REST, aplicaciones SPA, móviles o cualquier cliente HTTP.

En este módulo nos enfocaremos en Web API.

### dotnet new webapi

El SDK de .NET incluye plantillas para crear proyectos rápidamente desde la terminal.

Comando para crear un proyecto Web API:

```bash
dotnet new webapi -n MiPrimeraApi
cd MiPrimeraApi
dotnet run
```

Opciones útiles:

- `-n` o `--name`: nombre del proyecto
- `-o` o `--output`: directorio de salida
- `--use-controllers`: usa controladores (por defecto en .NET 8)
- `--use-minimal-apis`: usa Minimal APIs

El comando crea la siguiente estructura de carpetas y archivos.

### Estructura del proyecto

```
MiPrimeraApi/
├── Controllers/       → Controladores de la API
│   └── WeatherForecastController.cs
├── Models/            → Clases que representan los datos
│   └── WeatherForecast.cs
├── Properties/        → Configuración de lanzamiento
│   └── launchSettings.json
├── Program.cs         → Punto de entrada y configuración
├── appsettings.json   → Configuración general
├── appsettings.Development.json → Config específica de desarrollo
└── MiPrimeraApi.csproj → Archivo del proyecto
```

**Controllers/**: Contiene las clases que manejan las peticiones HTTP. Cada método público es un endpoint.

**Models/**: Contiene las clases que representan las entidades del dominio (Producto, Usuario, etc.).

**Program.cs**: Punto de entrada. Aquí se configuran servicios, middleware y el pipeline HTTP. En versiones modernas de .NET usa la sintaxis de top-level statements.

**appsettings.json**: Archivo de configuración en formato JSON. Aquí se definen cadenas de conexión, configuraciones de logging, etc.

### Kestrel

Kestrel es el servidor web integrado de ASP.NET Core. Es multiplataforma, de alto rendimiento y está diseñado para ejecutarse detrás de un proxy inverso como Nginx, Apache o IIS en producción.

En desarrollo, Kestrel se ejecuta directamente y escucha en las URLs definidas en `launchSettings.json`. No requiere instalación adicional porque viene incluido en el SDK.

Ventajas de Kestrel:

- Rápido y eficiente en memoria
- Multiplataforma
- Seguro por defecto (escucha en localhost en desarrollo)
- Compatible con HTTP/1.1, HTTP/2 y HTTP/3

### launchSettings.json

Este archivo define cómo se ejecuta la aplicación en diferentes perfiles:

```json
{
  "profiles": {
    "http": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "http://localhost:5238",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": true,
      "applicationUrl": "https://localhost:7238;http://localhost:5238",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

Cada perfil define la URL, variables de entorno y si abre el navegador.

### Métodos HTTP

Una API REST utiliza métodos HTTP estándar para realizar operaciones CRUD:

| Método | Descripción | Ejemplo de uso |
|--------|-------------|----------------|
| GET | Obtener recursos | Obtener lista de productos |
| POST | Crear un recurso | Crear un nuevo producto |
| PUT | Actualizar un recurso completo | Actualizar todos los campos de un producto |
| PATCH | Actualizar parcialmente un recurso | Actualizar solo el precio |
| DELETE | Eliminar un recurso | Eliminar un producto |

Cada método tiene un significado semántico claro y debe usarse según su propósito.

### Routing

El routing es el mecanismo que asocia una URL entrante con un endpoint específico.

En controladores se usa con atributos:

```csharp
[Route("api/[controller]")]
[ApiController]
public class ProductosController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { mensaje = "Hola Mundo" });
    }
}
```

El atributo `[Route]` define la plantilla de ruta. `[controller]` se reemplaza por el nombre del controlador sin el sufijo "Controller". Así, `ProductosController` responde en `/api/productos`.

### Crear primer endpoint: "Hola Mundo"

Crear un proyecto nuevo:

```bash
dotnet new webapi -n HolaMundoApi
cd HolaMundoApi
```

Agregar un controlador llamado `SaludoController.cs` en la carpeta `Controllers/`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace HolaMundoApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SaludoController : ControllerBase
{
    [HttpGet]
    public IActionResult ObtenerSaludo()
    {
        return Ok(new { mensaje = "Hola Mundo desde ASP.NET Core" });
    }

    [HttpGet("{nombre}")]
    public IActionResult ObtenerSaludoPersonalizado(string nombre)
    {
        return Ok(new { mensaje = $"Hola {nombre}, bienvenido a ASP.NET Core" });
    }
}
```

Ejecutar:

```bash
dotnet run
```

Probar:

- `GET /api/saludo` → `{ "mensaje": "Hola Mundo desde ASP.NET Core" }`
- `GET /api/saludo/Eddy` → `{ "mensaje": "Hola Eddy, bienvenido a ASP.NET Core" }`

### Minimal APIs vs Controller-based

ASP.NET Core ofrece dos estilos para crear endpoints:

**Minimal APIs:** Introducidas en .NET 6. Son más simples y requieren menos código. Ideales para APIs pequeñas o microservicios.

```csharp
// Program.cs
var app = WebApplication.Create(args);

app.MapGet("/api/saludo", () => new { mensaje = "Hola Mundo" });

app.Run();
```

**Controller-based:** El enfoque tradicional con clases y atributos. Más organizado para proyectos grandes. Separa responsabilidades y facilita el testing.

```csharp
[Route("api/[controller]")]
[ApiController]
public class SaludoController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new { mensaje = "Hola Mundo" });
    }
}
```

¿Cuál elegir?

| Situación | Recomendación |
|-----------|---------------|
| API pequeña (< 10 endpoints) | Minimal API |
| API mediana/grande | Controller-based |
| Equipo acostumbrado a MVC | Controller-based |
| Prototipo rápido | Minimal API |
| Proyecto con testing estructurado | Controller-based |

En este curso usaremos Controller-based por ser más didáctico y escalable.

---

## Ejemplo guiado: API de Salud con endpoint GET /api/health

Crearemos un endpoint que devuelve el estado de la aplicación.

**Paso 1:** Crear el proyecto

```bash
dotnet new webapi -n HealthApi
cd HealthApi
```

**Paso 2:** Crear el controlador `HealthController.cs` en `Controllers/`

```csharp
using Microsoft.AspNetCore.Mvc;

namespace HealthApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult GetHealth()
    {
        var response = new
        {
            status = "Healthy",
            timestamp = DateTime.UtcNow,
            version = "1.0.0",
            uptime = Environment.TickCount64 / 1000
        };

        return Ok(response);
    }
}
```

**Paso 3:** Ejecutar y probar

```bash
dotnet run
```

Respuesta esperada:

```json
{
  "status": "Healthy",
  "timestamp": "2026-07-07T14:30:00Z",
  "version": "1.0.0",
  "uptime": 4523
}
```

Este endpoint es útil para health checks en balanceadores de carga, orquestadores y monitoreo.

---

## Ejercicios

### Nivel 1 — Básico: API que devuelve lista de strings

**Enunciado:**
Crea un proyecto Web API con un controlador llamado `FrutasController` que tenga un endpoint GET que devuelva una lista de nombres de frutas como strings.

**Requisitos:**
- Usar `dotnet new webapi`
- Crear `FrutasController` con atributo `[Route("api/[controller]")]`
- Endpoint GET que retorna `List<string>`
- Usar `Ok()` para la respuesta

**Entrada esperada:**
```
GET /api/frutas
```

**Salida esperada:**
```json
["Manzana", "Banana", "Naranja", "Uva", "Fresa"]
```

**Criterios de evaluación:**
- Proyecto creado correctamente
- Controlador con atributos correctos
- Endpoint funcional devolviendo una lista
- Código limpio y bien indentado

---

### Nivel 2 — Intermedio: Endpoint con parámetro de ruta

**Enunciado:**
Crea un controlador `CalculadoraController` con dos endpoints: uno que sume dos números recibidos como parámetros de ruta y otro que los multiplique.

**Requisitos:**
- Endpoint `GET /api/calculadora/sumar/{a}/{b}`
- Endpoint `GET /api/calculadora/multiplicar/{a}/{b}`
- Los parámetros deben ser enteros
- Devolver el resultado como JSON `{ "resultado": 15 }`

**Entrada esperada:**
```
GET /api/calculadora/sumar/10/5
GET /api/calculadora/multiplicar/10/5
```

**Salida esperada:**
```json
{ "resultado": 15 }
{ "resultado": 50 }
```

**Criterios de evaluación:**
- Uso correcto de `[HttpGet("{a}/{b}")]`
- Conversión correcta de parámetros
- Uso de `Ok()` con objeto anónimo
- Ambos endpoints funcionales

---

### Nivel 3 — Reto: API con varios endpoints que manejan productos en memoria

**Enunciado:**
Crea una API de productos que use una lista en memoria (static) y tenga los siguientes endpoints: GET para listar todos, GET por id, POST para crear y DELETE para eliminar.

**Requisitos:**
- Modelo `Producto` con `Id` (int), `Nombre` (string), `Precio` (decimal)
- Lista estática en el controlador con al menos 3 productos de ejemplo
- `GET /api/productos` → lista completa
- `GET /api/productos/{id}` → producto por id
- `POST /api/productos` → crear producto (recibir JSON)
- `DELETE /api/productos/{id}` → eliminar producto
- Manejar el caso de id no encontrado con `NotFound()`
- Asignar Id autoincremental

**Entrada esperada:**

```
GET /api/productos
POST /api/productos  Body: { "nombre": "Teclado", "precio": 45.99 }
DELETE /api/productos/1
GET /api/productos/99
```

**Salida esperada:**

Lista completa:
```json
[
  { "id": 1, "nombre": "Mouse", "precio": 25.50 },
  { "id": 2, "nombre": "Monitor", "precio": 199.99 },
  { "id": 3, "nombre": "Laptop", "precio": 899.00 }
]
```

Producto no encontrado:
```json
{ "type": "https://httpstatuses.com/404", "title": "Not Found", "status": 404 }
```

**Criterios de evaluación:**
- Modelo correctamente definido
- CRUD completo en memoria
- Manejo de errores con NotFound
- POST recibe y procesa JSON correctamente
- Código organizado y funcional
