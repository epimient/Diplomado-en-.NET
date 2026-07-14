# Clase 13 — Modelos, DTOs y Validaciones

## Objetivo

Comprender la diferencia entre modelos de dominio y DTOs, aprender a aplicar validaciones con Data Annotations, manejar errores de validación correctamente y estructurar una API con separación de responsabilidades en los datos de entrada y salida.

---

## Contenido

### Modelos (clases que representan datos)

En una aplicación .NET, los modelos son clases que representan las entidades del dominio. Por ejemplo, si trabajamos con productos, el modelo `Producto` representa los datos de un producto.

```csharp
public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public int Stock { get; set; }
    public DateTime FechaCreacion { get; set; }
}
```

Los modelos de dominio generalmente se usan con Entity Framework Core y reflejan la estructura de la base de datos. Contienen todas las propiedades necesarias para la persistencia, incluyendo IDs, fechas de creación y otros campos internos.

### DTOs (Data Transfer Objects)

Un DTO es un objeto que se usa para transferir datos entre el cliente y el servidor. A diferencia del modelo de dominio, el DTO contiene solo los datos necesarios para una operación específica.

**DTO de entrada (para crear un producto):**

```csharp
public class CrearProductoDto
{
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public string Descripcion { get; set; } = string.Empty;
    public int Stock { get; set; }
}
```

**DTO de salida (para devolver un producto al cliente):**

```csharp
public class ProductoResponseDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
    public bool Disponible { get; set; }
}
```

### Por qué usar DTOs

Usar DTOs en lugar de exponer los modelos de dominio directamente tiene varias ventajas:

**Seguridad:**
- Evitas exponer campos internos como `Id`, `FechaCreacion`, o datos sensibles como contraseñas
- Controlas exactamente qué información se envía y recibe

**Separación de responsabilidades:**
- El modelo de dominio puede cambiar sin afectar la API
- Los DTOs se adaptan a las necesidades del cliente, no a la base de datos

**Control sobre la entrada:**
- Validaciones específicas para cada operación
- Diferentes DTOs para crear y actualizar (Create vs Update)

**Reducción de datos:**
- El cliente solo recibe lo que necesita
- Menos tráfico de red

**Ejemplo de por qué NO exponer el modelo directamente:**

```csharp
// MAL: expone todo el modelo
[HttpPost]
public ActionResult<Producto> Crear(Producto producto)
{
    // El cliente podría enviar un Id que ya existe o manipular FechaCreacion
}

// BIEN: solo recibe lo necesario
[HttpPost]
public ActionResult<ProductoResponseDto> Crear(CrearProductoDto dto)
{
    // Solo se reciben los campos definidos en el DTO
}
```

### AutoMapper (concepto)

Cuando usamos DTOs, necesitamos convertir entre modelos de dominio y DTOs. Esta conversión se puede hacer manualmente:

```csharp
// Conversión manual
var producto = new Producto
{
    Nombre = dto.Nombre,
    Precio = dto.Precio,
    Descripcion = dto.Descripcion,
    Stock = dto.Stock,
    FechaCreacion = DateTime.UtcNow
};

var response = new ProductoResponseDto
{
    Id = producto.Id,
    Nombre = producto.Nombre,
    Precio = producto.Precio,
    Disponible = producto.Stock > 0
};
```

O usando una librería como **AutoMapper** que automatiza el mapeo:

```csharp
// Configuración del perfil
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<CrearProductoDto, Producto>();
        CreateMap<Producto, ProductoResponseDto>();
    }
}

// Uso en el controlador
var producto = _mapper.Map<Producto>(dto);
var response = _mapper.Map<ProductoResponseDto>(producto);
```

Para este curso introductorio usaremos conversión manual para entender el concepto. AutoMapper se puede explorar como tema avanzado.

### Validaciones con Data Annotations

ASP.NET Core incluye un sistema de validación basado en atributos (Data Annotations) que se aplican directamente a las propiedades del modelo o DTO.

**Atributos de validación principales:**

```csharp
public class CrearProductoDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 100 caracteres")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El precio es obligatorio")]
    [Range(0.01, 999999.99, ErrorMessage = "El precio debe estar entre 0.01 y 999999.99")]
    public decimal Precio { get; set; }

    [StringLength(500, ErrorMessage = "La descripción no puede exceder 500 caracteres")]
    public string Descripcion { get; set; } = string.Empty;

    [Required]
    [Range(0, int.MaxValue, ErrorMessage = "El stock no puede ser negativo")]
    public int Stock { get; set; }
}
```

**Atributos más comunes:**

| Atributo | Descripción |
|----------|-------------|
| `[Required]` | El campo no puede ser nulo o vacío |
| `[StringLength(max)]` | Longitud máxima de un string |
| `[StringLength(min, MaximumLength = max)]` | Longitud mínima y máxima |
| `[Range(min, max)]` | Valor dentro de un rango numérico |
| `[EmailAddress]` | Validación de formato de email |
| `[Phone]` | Validación de formato de teléfono |
| `[Url]` | Validación de formato de URL |
| `[RegularExpression(pattern)]` | Validación con expresión regular |
| `[Compare("otraPropiedad")]` | Compara con otra propiedad (ej: confirmar contraseña) |
| `[MinLength(n)]` | Longitud mínima de colección o string |
| `[MaxLength(n)]` | Longitud máxima de colección o string |

**Ejemplo completo con validaciones:**

```csharp
public class RegistrarUsuarioDto
{
    [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
    [StringLength(50, MinimumLength = 3)]
    public string NombreUsuario { get; set; } = string.Empty;

    [Required]
    [EmailAddress(ErrorMessage = "El email no tiene un formato válido")]
    public string Email { get; set; } = string.Empty;

    [Required]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Contrasena { get; set; } = string.Empty;

    [Required]
    [Compare("Contrasena", ErrorMessage = "Las contraseñas no coinciden")]
    public string ConfirmarContrasena { get; set; } = string.Empty;

    [Range(18, 120, ErrorMessage = "Debes ser mayor de 18 años")]
    public int Edad { get; set; }
}
```

### Validación de modelos con ModelState

Cuando se usa `[ApiController]`, ASP.NET Core valida automáticamente el modelo al recibir una petición. Si hay errores, devuelve automáticamente un `400 Bad Request` con los detalles.

Ejemplo del response automático:

```json
{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "errors": {
    "Nombre": ["El nombre es obligatorio"],
    "Precio": ["El precio debe estar entre 0.01 y 999999.99"]
  }
}
```

Si necesitas validar manualmente, puedes usar `ModelState`:

```csharp
[HttpPost]
public IActionResult Crear([FromBody] CrearProductoDto dto)
{
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState);
    }

    // lógica de creación
    return Ok();
}
```

Con `[ApiController]` esto no es necesario porque la validación ocurre automáticamente antes de que el método se ejecute.

Para deshabilitar la validación automática (no recomendado):

```csharp
[ApiController]
public class ProductosController : ControllerBase
{
    // ...
}
```

No se recomienda deshabilitarla porque es una funcionalidad que mejora la seguridad y consistencia.

### Respuestas de error consistentes

Es importante que todas las respuestas de error tengan el mismo formato para que el cliente pueda manejarlas de manera predecible.

ASP.NET Core usa el estándar **Problem Details** (RFC 7807) para respuestas de error.

**Formato estándar:**

```json
{
  "type": "https://httpstatuses.com/404",
  "title": "Recurso no encontrado",
  "status": 404,
  "detail": "No se encontró un producto con el ID 99",
  "instance": "/api/productos/99",
  "traceId": "0HLKJ3M3N4K"
}
```

**Personalizar respuestas de validación:**

```csharp
// Program.cs
builder.Services.AddControllers()
    .ConfigureApiBehaviorOptions(options =>
    {
        options.InvalidModelStateResponseFactory = context =>
        {
            var errors = context.ModelState
                .Where(e => e.Value?.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value?.Errors.Select(e => e.ErrorMessage).ToArray()
                );

            var response = new
            {
                success = false,
                message = "Error de validación",
                errors
            };

            return new BadRequestObjectResult(response);
        };
    });
```

Respuesta personalizada:

```json
{
  "success": false,
  "message": "Error de validación",
  "errors": {
    "Nombre": ["El nombre es obligatorio"],
    "Precio": ["El precio debe estar entre 0.01 y 999999.99"]
  }
}
```

---

## Ejemplo guiado: API de usuarios con DTOs de entrada/salida y validaciones

Implementaremos una API de registro de usuarios con separación de capas y validaciones completas.

**Modelo de dominio:**

```csharp
public class Usuario
{
    public int Id { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string ContrasenaHash { get; set; } = string.Empty;
    public DateTime FechaRegistro { get; set; }
    public bool Activo { get; set; }
}
```

**DTO de entrada (crear usuario):**

```csharp
public class CrearUsuarioDto
{
    [Required(ErrorMessage = "El nombre de usuario es obligatorio")]
    [StringLength(30, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 30 caracteres")]
    public string NombreUsuario { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "La contraseña es obligatoria")]
    [StringLength(100, MinimumLength = 6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres")]
    public string Contrasena { get; set; } = string.Empty;
}
```

**DTO de salida (respuesta al cliente):**

```csharp
public class UsuarioResponseDto
{
    public int Id { get; set; }
    public string NombreUsuario { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public DateTime FechaRegistro { get; set; }
}
```

**Controlador:**

```csharp
[Route("api/[controller]")]
[ApiController]
public class UsuariosController : ControllerBase
{
    private static List<Usuario> _usuarios = new();
    private static int _nextId = 1;

    [HttpPost("registrar")]
    public ActionResult<UsuarioResponseDto> Registrar([FromBody] CrearUsuarioDto dto)
    {
        // Verificar si el email ya existe
        if (_usuarios.Any(u => u.Email == dto.Email))
        {
            return Conflict(new { message = "El email ya está registrado" });
        }

        // Mapear DTO a modelo de dominio
        var usuario = new Usuario
        {
            Id = _nextId++,
            NombreUsuario = dto.NombreUsuario,
            Email = dto.Email,
            ContrasenaHash = BCrypt.Net.BCrypt.HashPassword(dto.Contrasena),
            FechaRegistro = DateTime.UtcNow,
            Activo = true
        };

        _usuarios.Add(usuario);

        // Mapear modelo a DTO de respuesta
        var response = new UsuarioResponseDto
        {
            Id = usuario.Id,
            NombreUsuario = usuario.NombreUsuario,
            Email = usuario.Email,
            FechaRegistro = usuario.FechaRegistro
        };

        return CreatedAtAction(nameof(ObtenerPorId), new { id = usuario.Id }, response);
    }

    [HttpGet("{id}")]
    public ActionResult<UsuarioResponseDto> ObtenerPorId(int id)
    {
        var usuario = _usuarios.FirstOrDefault(u => u.Id == id);
        if (usuario == null)
            return NotFound();

        return new UsuarioResponseDto
        {
            Id = usuario.Id,
            NombreUsuario = usuario.NombreUsuario,
            Email = usuario.Email,
            FechaRegistro = usuario.FechaRegistro
        };
    }
}
```

---

## Ejercicios

### Nivel 1 — Básico: Modelo Producto con validaciones

**Enunciado:**
Define un DTO llamado `CrearProductoDto` con validaciones usando Data Annotations. No necesitas implementar el controlador, solo el DTO.

**Requisitos:**
- `Nombre`: obligatorio, entre 3 y 100 caracteres
- `Precio`: obligatorio, entre 0.01 y 10000.00
- `Descripcion`: opcional, máximo 500 caracteres
- `Categoria`: obligatorio, valor por defecto "General"
- `Stock`: obligatorio, mínimo 0

**Criterios de evaluación:**
- Atributos correctos para cada campo
- Mensajes de error personalizados
- Tipos de datos adecuados
- Valores por defecto donde corresponda

---

### Nivel 2 — Intermedio: DTO separado del modelo

**Enunciado:**
Crea una API con un modelo `Cliente` (Id, Nombre, Email, Telefono, FechaRegistro) y un DTO de salida `ClienteResponseDto` que no exponga el Id ni la FechaRegistro. Implementa GET y POST.

**Requisitos:**
- Modelo `Cliente` con todas las propiedades
- DTO de salida solo con `Nombre`, `Email`, `Telefono`
- DTO de entrada con validaciones: Nombre obligatorio, Email válido
- `GET /api/clientes` → lista con DTOs
- `POST /api/clientes` → recibe DTO de entrada, guarda modelo completo, devuelve DTO de salida

**Entrada esperada:**
```
POST /api/clientes  Body: { "nombre": "María García", "email": "maria@email.com", "telefono": "555-1234" }
```

**Salida esperada:**
```json
{
  "nombre": "María García",
  "email": "maria@email.com",
  "telefono": "555-1234"
}
```

**Criterios de evaluación:**
- Separación clara entre modelo y DTOs
- Validaciones funcionando correctamente
- POST con 201 Created
- El Id y FechaRegistro no se exponen

---

### Nivel 3 — Reto: API de registro con validaciones y respuestas de error

**Enunciado:**
Crea una API de registro de usuarios con DTOs de entrada y salida, validaciones completas, y manejo de errores consistente. Incluye un endpoint de login simple.

**Requisitos:**
- `POST /api/usuarios/registrar` con validaciones:
  - Nombre: obligatorio, 3-50 caracteres
  - Email: obligatorio, formato email, único
  - Contraseña: obligatorio, mínimo 8 caracteres, al menos 1 mayúscula y 1 número
  - ConfirmarContraseña: debe coincidir con Contraseña
- `POST /api/usuarios/login` que recibe email y contraseña y devuelve éxito o error 401
- `GET /api/usuarios/{id}` que devuelve el perfil sin contraseña
- Respuestas de error consistentes con formato `{ "success": false, "message": "...", "errors": {...} }`
- Validación de email duplicado devuelve 409 Conflict

**Entrada esperada:**
```
POST /api/usuarios/registrar
Body: {
  "nombre": "Eddy",
  "email": "eddy@email.com",
  "contrasena": "Pass1234",
  "confirmarContrasena": "Pass1234"
}

POST /api/usuarios/login
Body: { "email": "eddy@email.com", "contrasena": "Pass1234" }
```

**Salida esperada:**
- Registro exitoso: 201 Created con datos del usuario (sin contraseña)
- Login exitoso: 200 OK con `{ "mensaje": "Inicio de sesión exitoso", "nombre": "Eddy" }`
- Login fallido: 401 Unauthorized con `{ "mensaje": "Credenciales inválidas" }`
- Email duplicado: 409 Conflict con mensaje claro
- Validación fallida: 400 con errores detallados

**Criterios de evaluación:**
- Todos los DTOs definidos y separados
- Validaciones completas con Data Annotations
- Validación personalizada (email único, coincidencia de contraseñas)
- Manejo de errores consistente en toda la API
- Códigos de estado HTTP correctos
- Contraseña nunca expuesta en respuestas
