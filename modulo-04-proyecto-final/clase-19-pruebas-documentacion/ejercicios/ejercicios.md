# Ejercicios — Clase 19: Pruebas y Documentación

## Nivel 1: Probar todos los endpoints en Swagger

**Enunciado:**  
Ejecuta la API y prueba cada uno de los endpoints desde la interfaz de Swagger. Captura pantallas de cada prueba.

**Requisitos:**
- Ejecutar la API con `dotnet run`.
- Abrir Swagger en `http://localhost:5000/swagger`.
- Probar cada endpoint (GET, GET por id, POST, PUT, DELETE) y cada filtro implementado.
- Probar casos de éxito y casos de error (404, 400).
- Capturar pantalla de cada operación.
- Guardar las capturas en una carpeta `capturas/` dentro del proyecto.

**Entrada esperada:**  
```bash
dotnet run
```

**Salida esperada:**  
Swagger UI funcionando en el navegador. Capturas de pantalla para:
- GET /api/libros → lista completa
- GET /api/libros/1 → libro específico
- POST /api/libros → creación exitosa
- POST /api/libros (con datos inválidos) → error 400
- PUT /api/libros/1 → actualización
- DELETE /api/libros/1 → eliminación
- GET /api/libros?busqueda=net → filtro

---

## Nivel 2: Escribir README.md completo

**Enunciado:**  
Redacta un README.md profesional para tu proyecto que sirva como documentación principal.

**Requisitos:**
El README debe incluir:
- Nombre del proyecto y logo (opcional).
- Descripción del proyecto (2-3 párrafos).
- Tecnologías utilizadas (listado con badges o íconos).
- Requisitos previos (.NET 8 SDK, VS Code, SQLite).
- Instalación y configuración paso a paso.
- Ejecución del proyecto (comandos).
- Documentación de endpoints en formato tabla:

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /api/libros | Lista todos los libros |
| GET | /api/libros/{id} | Obtiene libro por ID |
| POST | /api/libros | Crea un nuevo libro |
| PUT | /api/libros/{id} | Actualiza un libro |
| DELETE | /api/libros/{id} | Elimina un libro |
| GET | /api/libros?busqueda= | Busca libros |

- Capturas de pantalla de las pruebas.
- Estructura del proyecto.
- Integrantes del equipo.
- Estado del proyecto y mejoras futuras.

**Entrada esperada:**
```bash
code README.md
```

**Salida esperada:**  
Archivo `README.md` completo en la raíz del proyecto.

---

## Nivel 3: Grabar video demo

**Enunciado:**  
Graba un video corto (3-5 minutos) demostrando el funcionamiento de tu API.

**Requisitos:**
- El video debe mostrar:
  - El proyecto abierto en VS Code.
  - La estructura de archivos.
  - Ejecución de la API con `dotnet run`.
  - Prueba de cada endpoint en Swagger.
  - Mostrar al menos una operación de cada tipo (GET, POST, PUT, DELETE).
  - Mostrar la base de datos SQLite (opcional).
- Usar cualquier herramienta de grabación (OBS, Windows Game Bar, etc.).
- Subir el video a YouTube (público o no listado).
- Incluir el enlace en el README.md.
- El video debe tener buena iluminación y audio claro.

**Entrada esperada:**  
```bash
# grabar video con OBS Studio
```

**Salida esperada:**  
Video de 3-5 minutos en YouTube.  
Enlace agregado al `README.md` del proyecto.
