# Ejercicios — Clase 18: Desarrollo de la API

## Nivel 1: GET y POST para entidad principal

**Enunciado:**  
Implementa los endpoints GET (listar y por id) y POST para la entidad principal de tu proyecto.

**Requisitos:**
- Controlador con inyección de `AppDbContext`.
- `GET /api/libros` → lista todos (usar `Include` para relaciones si aplica).
- `GET /api/libros/{id}` → obtener por id o 404.
- `POST /api/libros` → crear nuevo registro.
- Validar campos requeridos.
- Devolver 201 Created con ubicación.
- Probar con datos seed desde Swagger.

**Entrada esperada:**  
`POST /api/libros` Body:
```json
{ "titulo": "Aprendiendo .NET", "autor": "Laura Díaz", "isbn": "978-9876543210" }
```

**Salida esperada:**  
Código 201:
```json
{ "id": 4, "titulo": "Aprendiendo .NET", "autor": "Laura Díaz", "isbn": "978-9876543210", "disponible": true }
```

---

## Nivel 2: PUT y DELETE

**Enunciado:**  
Agrega los endpoints PUT y DELETE para completar el CRUD de la entidad principal.

**Requisitos:**
- `PUT /api/libros/{id}` → actualizar todos los campos.
  - Validar que id de ruta coincida con id del cuerpo.
  - Marcar entidad como modificada y guardar.
  - Devolver 200 con el registro actualizado.
- `DELETE /api/libros/{id}` → eliminar registro.
  - Verificar que exista (404 si no).
  - Eliminar y guardar.
  - Devolver 204 No Content.
- Probar ciclo completo: crear, actualizar, listar, eliminar.

**Entrada esperada:**  
`PUT /api/libros/4` Body:
```json
{ "id": 4, "titulo": "Aprendiendo .NET 8", "autor": "Laura Díaz", "isbn": "978-9876543210", "disponible": false }
```

**Salida esperada:**
```json
{ "id": 4, "titulo": "Aprendiendo .NET 8", "autor": "Laura Díaz", "isbn": "978-9876543210", "disponible": false }
```

**DELETE /api/libros/4** → 204 No Content

---

## Nivel 3: Búsqueda + filtros

**Enunciado:**  
Agrega endpoints de búsqueda y filtros avanzados para mejorar la funcionalidad de tu API.

**Requisitos:**
- `GET /api/libros?autor=valor` → filtrar por autor (búsqueda parcial con `Contains`).
- `GET /api/libros/disponibles` → solo libros disponibles.
- `GET /api/libros?busqueda=valor` → buscar en título y autor simultáneamente.
- Combinar filtros: `GET /api/libros?busqueda=csharp&disponibles=true`.
- Implementar paginación básica con `skip` y `take`.
- Devolver total de resultados para facilitar paginación.

**Entrada esperada:**  
`GET /api/libros?busqueda=net&disponibles=true&page=1&size=10`

**Salida esperada:**
```json
{
  "total": 2,
  "pagina": 1,
  "tamanoPagina": 10,
  "datos": [
    {
      "id": 4,
      "titulo": "Aprendiendo .NET 8",
      "autor": "Laura Díaz",
      "isbn": "978-9876543210",
      "disponible": true
    }
  ]
}
```
