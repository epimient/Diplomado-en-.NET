# Dudas — Clase 13

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Qué es un DTO y por qué usarlo?

DTO (Data Transfer Object) es un objeto que transfiere datos entre capas. Se usa para:

- No exponer el modelo interno de la base de datos.
- Enviar solo los campos necesarios al cliente.
- Evitar problemas de serialización cíclica (referencias circulares).
- Separar la lógica de presentación del modelo de datos.

### ¿Qué son las Data Annotations?

Son atributos de C# que definen reglas de validación en los modelos:

```csharp
public class ProductoDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100)]
    public string Nombre { get; set; }

    [Range(0.01, 99999.99)]
    public decimal Precio { get; set; }
}
```

### ¿Qué es ModelState y cómo se usa?

`ModelState` contiene el resultado de la validación automática. En controladores con `[ApiController]`, si `ModelState` es inválido se devuelve `400 Bad Request` automáticamente. Puedes consultarlo manualmente:

```csharp
if (!ModelState.IsValid)
    return BadRequest(ModelState);
```

### ¿Cómo usar AutoMapper en ASP.NET Core?

Primero instala el paquete: `dotnet add package AutoMapper.Extensions.Microsoft.DependencyInjection`

```csharp
// Perfil de mapeo
public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Producto, ProductoDto>();
        CreateMap<ProductoDto, Producto>();
    }
}

// En Program.cs
builder.Services.AddAutoMapper(typeof(Program));

// En controlador
private readonly IMapper _mapper;
```

### ¿Es obligatorio usar AutoMapper?

No. Puedes mapear manualmente con constructores o métodos estáticos. AutoMapper es útil cuando hay muchos campos que mapear, pero para proyectos pequeños puede ser excesivo.

### ¿Cómo validar fechas con Data Annotations?

```csharp
[Required]
[DataType(DataType.Date)]
[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
public DateTime FechaNacimiento { get; set; }
```

Para rangos de fecha puedes usar una validación personalizada heredando de `ValidationAttribute`.

### ¿Qué son las validaciones personalizadas?

Creas una clase que hereda de `ValidationAttribute` y sobrescribes el método `IsValid`:

```csharp
public class EdadMinimaAttribute : ValidationAttribute
{
    protected override ValidationResult IsValid(object value, ValidationContext context)
    {
        if (value is DateTime fecha && fecha > DateTime.Now.AddYears(-18))
            return new ValidationResult("Debes ser mayor de edad");
        return ValidationResult.Success;
    }
}
```
