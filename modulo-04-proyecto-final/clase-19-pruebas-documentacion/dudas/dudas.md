# Dudas — Clase 19

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cómo probar la API desde Swagger?

Swagger UI permite probar cada endpoint directamente. Haz clic en "Try it out", completa los parámetros y ejecuta. Revisa el código de estado y la respuesta JSON.

### ¿Cómo probar con Thunder Client o Postman?

Crea una nueva colección. Para cada endpoint configura:

- Método HTTP (GET, POST, PUT, DELETE).
- URL: `http://localhost:5000/api/productos`.
- Headers: `Content-Type: application/json`.
- Body (para POST/PUT): JSON con los datos.
- Captura la respuesta y el código de estado.

### ¿Cómo probar con curl desde la terminal?

```bash
curl -X GET http://localhost:5000/api/productos
curl -X POST http://localhost:5000/api/productos -H "Content-Type: application/json" -d '{"nombre":"Laptop","precio":999.99}'
```

### ¿Qué debe incluir el README.md del proyecto?

- Nombre y descripción del proyecto.
- Tecnologías usadas (.NET, EF Core, SQLite, Swagger).
- Instrucciones de instalación y ejecución.
- Endpoints documentados.
- Capturas de pantalla de pruebas.
- Integrantes del equipo.
- Enlace al repositorio.

### ¿Cómo hacer el video de demostración?

Usa herramientas como OBS Studio o la grabación de pantalla de tu sistema. El video debe mostrar:

- Inicio del proyecto con `dotnet run`.
- Prueba de cada endpoint desde Swagger.
- Funcionamiento del CRUD completo.
- Duración recomendada: 3-5 minutos.

### ¿Cómo organizar las capturas de pantalla?

Crea una carpeta `screenshots/` en el proyecto. Captura:

- Swagger UI mostrando los endpoints.
- Respuesta exitosa de cada operación.
- Validaciones funcionando (errores 400).
- Base de datos SQLite (puedes usar DB Browser for SQLite).

### ¿Qué formato debe tener la presentación final?

Usa PowerPoint, Google Slides o Canva. Incluye:

- Portada con nombre del proyecto e integrantes.
- Descripción y objetivos.
- Tecnologías usadas.
- Demostración de la API.
- Enlace al repositorio.
- Conclusiones y aprendizajes.
