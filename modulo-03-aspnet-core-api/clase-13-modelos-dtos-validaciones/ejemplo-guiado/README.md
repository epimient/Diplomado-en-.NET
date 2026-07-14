# Ejemplo Guiado — DTOs y Validaciones

## Pasos

```bash
dotnet new webapi -n UsersApi --no-https
cd UsersApi
```

Reemplazar `Program.cs` y `ejemplo-guiado.csproj`, luego:

```bash
dotnet run
```

Probar validaciones:

```bash
curl -X POST http://localhost:5000/api/users -H "Content-Type: application/json" -d '{"nombre":"A","email":"invalido","edad":10}'
```

## Conceptos aplicados

- DTOs (`UserDto`, `CreateUserDto`) para separar entrada de salida
- Atributos de validación: `[Required]`, `[StringLength]`, `[EmailAddress]`, `[Range]`
- `ModelState.IsValid` para validar en el controlador
- Código 400 BadRequest con errores de validación
