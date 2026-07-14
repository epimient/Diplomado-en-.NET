# Ejercicios — Clase 13: Modelos, DTOs y Validaciones

## Nivel 1: Modelo Producto con validaciones

**Enunciado:**  
Define una clase `Producto` con validaciones usando Data Annotations. Luego crea un endpoint POST que reciba un producto validado automáticamente.

**Requisitos:**
- Clase `Producto` con propiedades:
  - `Nombre` (requerido, máximo 50 caracteres)
  - `Precio` (requerido, rango 0.01 a 999999.99)
  - `Categoria` (requerido)
- Controlador `ProductosController` con `POST /api/productos`.
- Usar `[ApiController]` para validación automática.
- Si falla validación, devolver 400 con detalles.

**Entrada esperada:**  
```json
{ "nombre": "", "precio": -5, "categoria": "" }
```

**Salida esperada:**  
Código 400:
```json
{
  "errors": {
    "nombre": ["El campo Nombre es obligatorio"],
    "precio": ["El campo Precio debe estar entre 0.01 y 999999.99"],
    "categoria": ["El campo Categoria es obligatorio"]
  }
}
```

---

## Nivel 2: DTO separado del modelo

**Enunciado:**  
Separa el modelo de dominio del DTO de entrada/salida para un CRUD de estudiantes. El DTO de entrada no debe exponer el Id.

**Requisitos:**
- Clase `Estudiante` con `Id`, `Nombre`, `Email`, `FechaNacimiento`.
- Clase `EstudianteCreacionDto` con `Nombre`, `Email`, `FechaNacimiento` (sin Id).
- Clase `EstudianteDto` con todos los campos para respuesta.
- Controlador con `POST /api/estudiantes` y `GET /api/estudiantes`.
- Validaciones en el DTO: `Nombre` requerido, `Email` en formato válido.

**Entrada esperada:**  
`POST /api/estudiantes` Body:
```json
{ "nombre": "María García", "email": "maria@email.com", "fechaNacimiento": "2000-05-15" }
```

**Salida esperada:**
```json
{ "id": 1, "nombre": "María García", "email": "maria@email.com", "fechaNacimiento": "2000-05-15" }
```

---

## Nivel 3: API registro usuarios con validaciones + errores

**Enunciado:**  
Crea una API de registro de usuarios con validaciones personalizadas, DTOs separados y manejo de errores consistente.

**Requisitos:**
- `UsuarioCreacionDto` con:
  - `NombreCompleto` (requerido, min 3, max 100)
  - `Email` (requerido, formato email)
  - `Password` (requerido, min 8 caracteres, debe tener al menos 1 número y 1 mayúscula)
  - `ConfirmarPassword` (debe coincidir con Password)
- `POST /api/usuarios/registrar` → validar y crear.
- Si el email ya existe, devolver error 409 Conflict.
- Si las contraseñas no coinciden, devolver 400 con mensaje claro.
- Usar validación personalizada con `IValidatableObject` o atributo custom.
- Probar casos exitosos y de error.

**Entrada esperada:**  
```json
{
  "nombreCompleto": "Ana",
  "email": "ana@email.com",
  "password": "pass",
  "confirmarPassword": "pass"
}
```

**Salida esperada:**  
Código 400:
```json
{
  "errors": {
    "nombreCompleto": ["El nombre debe tener al menos 3 caracteres"],
    "password": ["La contraseña debe tener al menos 8 caracteres, un número y una mayúscula"],
    "confirmarPassword": ["Las contraseñas no coinciden"]
  }
}
```

**Entrada exitosa:**
```json
{
  "nombreCompleto": "Ana López",
  "email": "ana@email.com",
  "password": "Segura123",
  "confirmarPassword": "Segura123"
}
```

**Salida exitosa:**  
Código 201:
```json
{ "id": 1, "nombreCompleto": "Ana López", "email": "ana@email.com" }
```
