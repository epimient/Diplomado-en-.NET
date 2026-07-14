# Ejercicios — Clase 12: HTTP, REST y Controladores

## Nivel 1: Endpoint GET lista de tareas

**Enunciado:**  
Crea un controlador `TareasController` con un endpoint `GET /api/tareas` que devuelva una lista fija de 3 tareas en memoria.

**Requisitos:**
- Clase `Tarea` con `Id`, `Titulo`, `Completada`.
- Usar `List<Tarea>` estática con datos quemados.
- Devolver JSON con formato correcto.
- Probar con Swagger o Thunder Client.

**Entrada esperada:**  
Solicitud: `GET /api/tareas`

**Salida esperada:**
```json
[
  { "id": 1, "titulo": "Comprar víveres", "completada": false },
  { "id": 2, "titulo": "Estudiar C#", "completada": true },
  { "id": 3, "titulo": "Hacer ejercicio", "completada": false }
]
```

---

## Nivel 2: Controlador Tareas con GET + POST

**Enunciado:**  
Extiende el controlador anterior para que también permita crear nuevas tareas mediante `POST /api/tareas`.

**Requisitos:**
- `POST /api/tareas` recibe JSON con `titulo` y asigna `Id` autoincremental.
- `Completada` se inicializa en `false`.
- Validar que `titulo` no sea nulo ni vacío.
- Devolver 201 Created con la tarea creada.
- Mantener el GET del nivel 1.

**Entrada esperada:**  
`POST /api/tareas` Body:
```json
{ "titulo": "Leer documentación" }
```

**Salida esperada:**  
Código 201:
```json
{ "id": 4, "titulo": "Leer documentación", "completada": false }
```

---

## Nivel 3: CRUD completo de libros con IActionResult

**Enunciado:**  
Implementa un CRUD completo para libros usando `IActionResult` y devolviendo códigos HTTP apropiados.

**Requisitos:**
- Clase `Libro` con `Id`, `Titulo`, `Autor`, `Anio`.
- Lista estática en memoria.
- `GET /api/libros` → listar todos.
- `GET /api/libros/{id}` → obtener por id (404 si no existe).
- `POST /api/libros` → crear (201 Created).
- `PUT /api/libros/{id}` → actualizar (200 OK o 404).
- `DELETE /api/libros/{id}` → eliminar (204 No Content o 404).
- Todos los endpoints deben retornar `IActionResult`.
- Probar cada operación desde Swagger.

**Entrada esperada:**  
`PUT /api/libros/1` Body:
```json
{ "titulo": "C# Avanzado", "autor": "Juan Pérez", "anio": 2024 }
```

**Salida esperada:**
```json
{ "id": 1, "titulo": "C# Avanzado", "autor": "Juan Pérez", "anio": 2024 }
```

**DELETE /api/libros/1** → 204 No Content  
**DELETE /api/libros/99** → 404 Not Found
