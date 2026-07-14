# Ejercicios — Clase 15: CRUD API y Swagger

## Nivel 1: Implementar endpoint PUT

**Enunciado:**  
Agrega el endpoint `PUT /api/productos/{id}` a una API de productos existente (con EF Core). Debe actualizar todos los campos del producto.

**Requisitos:**
- Validar que el `id` de la ruta coincida con el `id` del cuerpo.
- Buscar el producto en base de datos. Si no existe, devolver 404.
- Actualizar propiedades y guardar con `SaveChangesAsync`.
- Devolver el producto actualizado.
- Probar desde Swagger viendo el cambio en GET.

**Entrada esperada:**  
`PUT /api/productos/1` Body:
```json
{ "id": 1, "nombre": "Laptop Gamer", "precio": 25000, "categoriaId": 1 }
```

**Salida esperada:**
```json
{ "id": 1, "nombre": "Laptop Gamer", "precio": 25000, "categoriaId": 1 }
```

---

## Nivel 2: Búsqueda por nombre

**Enunciado:**  
Agrega un endpoint `GET /api/productos?nombre=valor` que permita buscar productos por nombre usando query string y LINQ.

**Requisitos:**
- Usar `[FromQuery]` para el parámetro `nombre`.
- Usar LINQ `Where` con `Contains` para búsqueda parcial (case insensitive).
- Si no hay resultados, devolver lista vacía (200, no 404).
- Si no se envía `nombre`, devolver todos los productos.
- Documentar el parámetro en Swagger con `[Description]`.

**Entrada esperada:**  
`GET /api/productos?nombre=laptop`

**Salida esperada:**
```json
[
  { "id": 1, "nombre": "Laptop Gamer", "precio": 25000, "categoriaId": 1 },
  { "id": 3, "nombre": "Laptop Oficina", "precio": 12000, "categoriaId": 1 }
]
```

**GET /api/productos?nombre=celular** → `[]`

---

## Nivel 3: API tareas con filtros + estados

**Enunciado:**  
Crea una API completa de tareas con filtros combinados, estados (pendiente/en-proceso/completada) y paginación básica.

**Requisitos:**
- Clase `Tarea` con `Id`, `Titulo`, `Descripcion`, `Estado` (enum), `FechaCreacion`.
- CRUD completo (GET, GET por id, POST, PUT, DELETE).
- `GET /api/tareas` con filtros opcionales:
  - `?estado=pendiente` → filtrar por estado.
  - `?busqueda=titulo` → buscar en título y descripción.
  - `?page=1&size=5` → paginación básica (skip/take).
- Combinar filtros (ej: `?estado=completada&busqueda=urgente`).
- Documentar todos los endpoints con `[ProducesResponseType]` para Swagger.

**Entrada esperada:**  
`GET /api/tareas?estado=pendiente&page=1&size=2`

**Salida esperada:**
```json
{
  "total": 10,
  "pagina": 1,
  "tamanoPagina": 2,
  "datos": [
    { "id": 1, "titulo": "Comprar víveres", "estado": "pendiente", "fechaCreacion": "2026-07-01" },
    { "id": 4, "titulo": "Pagar servicios", "estado": "pendiente", "fechaCreacion": "2026-07-02" }
  ]
}
```
