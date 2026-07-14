# Ejercicios — Clase 11: Introducción a ASP.NET Core

## Nivel 1: Endpoint GET que lista colores

**Enunciado:**  
Crea un proyecto Web API con un único endpoint GET en `/api/colores` que devuelva una lista de 5 colores en formato JSON.

**Requisitos:**
- Crear proyecto con `dotnet new webapi`.
- Un solo controlador llamado `ColoresController`.
- Endpoint `GET /api/colores` que retorna `string[]` o `List<string>`.
- Probar con Swagger o curl.

**Entrada esperada:**  
Solicitud: `GET /api/colores`

**Salida esperada:**
```json
["Rojo", "Azul", "Verde", "Amarillo", "Negro"]
```

---

## Nivel 2: Endpoint con parámetro de ruta

**Enunciado:**  
Agrega al proyecto anterior un endpoint `GET /api/colores/{id}` que devuelva un color según su posición en la lista (1-indexed). Si el id está fuera de rango, devolver 404.

**Requisitos:**
- Usar parámetro de ruta `{id}` de tipo `int`.
- Validar que el índice exista en la lista.
- Devolver `NotFound` si no existe.
- Probar con varios valores.

**Entrada esperada:**  
Solicitud: `GET /api/colores/2`

**Salida esperada:**
```json
"Azul"
```

**Entrada esperada:**  
Solicitud: `GET /api/colores/10`

**Salida esperada:**  
Código 404 con mensaje: `"Color no encontrado"`

---

## Nivel 3: API de productos en memoria con 3 endpoints

**Enunciado:**  
Crea una API REST que administre una lista de productos en memoria. Debe tener 3 endpoints: GET para listar todos, GET por id y POST para crear un producto.

**Requisitos:**
- Clase `Producto` con `Id`, `Nombre`, `Precio`.
- Almacenar productos en `static List<Producto>`.
- `GET /api/productos` → lista completa.
- `GET /api/productos/{id}` → producto por id o 404.
- `POST /api/productos` → recibe JSON y agrega producto. El id se asigna automáticamente.
- Probar todo desde Swagger.

**Entrada esperada:**  
`POST /api/productos` Body:
```json
{ "nombre": "Laptop", "precio": 15000 }
```

**Salida esperada:**
```json
{ "id": 1, "nombre": "Laptop", "precio": 15000 }
```

**GET /api/productos:**
```json
[
  { "id": 1, "nombre": "Laptop", "precio": 15000 }
]
```
