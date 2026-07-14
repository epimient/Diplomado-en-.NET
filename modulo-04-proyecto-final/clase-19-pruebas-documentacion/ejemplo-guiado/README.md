# Ejemplo Guiado — Pruebas y Documentación

## Pruebas con Swagger

1. Ejecutar la API: `dotnet run`
2. Abrir `http://localhost:5000/swagger`
3. Probar cada endpoint desde la interfaz interactiva

## Pruebas con curl

```bash
# Listar libros
curl http://localhost:5000/api/libros

# Crear autor
curl -X POST http://localhost:5000/api/autores \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Isabel Allende","nacionalidad":"Chilena"}'

# Crear libro
curl -X POST http://localhost:5000/api/libros \
  -H "Content-Type: application/json" \
  -d '{"titulo":"La Casa de los Espíritus","isbn":"978-84-322-0845-6","anio":1982,"autorId":1}'

# Actualizar libro
curl -X PUT http://localhost:5000/api/libros/1 \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Cien Años de Soledad (Ed. Revisada)","isbn":"978-84-376-0494-7","anio":1967,"autorId":1}'

# Eliminar libro
curl -X DELETE http://localhost:5000/api/libros/1

# Registrar préstamo
curl -X POST http://localhost:5000/api/prestamos \
  -H "Content-Type: application/json" \
  -d '{"libroId":1}'

# Devolver libro
curl -X PUT http://localhost:5000/api/prestamos/1/devolver
```

## Pruebas con Thunder Client (VS Code)

1. Instalar extensión Thunder Client
2. Crear colección "Biblioteca"
3. Agregar requests para cada endpoint
4. Guardar respuestas como evidencia

## Documentación

- README.md principal con: descripción, instalación, endpoints, tecnologías
- Capturas de pantalla de Swagger y respuestas
- Video corto demostrando el funcionamiento
