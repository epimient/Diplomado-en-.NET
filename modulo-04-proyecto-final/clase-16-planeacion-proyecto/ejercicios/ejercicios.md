# Ejercicios — Clase 16: Planeación del Proyecto

## Nivel 1: Definir tema y 2 entidades

**Enunciado:**  
Define el tema de tu proyecto final. Debes elegir un sistema de información (ej: biblioteca, inventario, restaurante) y definir al menos 2 entidades principales con sus atributos.

**Requisitos:**
- Elegir un tema de la lista sugerida (biblioteca, inventario, restaurante, hotel, gimnasio, parqueadero, agenda médica, ventas, gestión de clientes).
- Escribir una descripción de 1 párrafo del proyecto.
- Definir 2 entidades con sus propiedades (tipo de dato y descripción).
- Identificar la relación entre ellas (1:N, N:N, etc.).
- Guardar en un archivo `planeacion.md` dentro del proyecto.

**Entrada esperada:**  
Tema: Sistema de Biblioteca

**Salida esperada:**
```
PROYECTO: Sistema de Biblioteca
Descripción: Aplicación para gestionar libros y préstamos de una biblioteca municipal.

Entidad 1: Libro
  - Id (int)
  - Titulo (string)
  - Autor (string)
  - ISBN (string)
  - Disponible (bool)

Entidad 2: Prestamo
  - Id (int)
  - LibroId (int) → FK a Libro
  - NombreUsuario (string)
  - FechaPrestamo (DateTime)
  - FechaDevolucion (DateTime?)

Relación: Un Libro puede tener muchos Préstamos (1:N).
```

---

## Nivel 2: Listar endpoints planificados

**Enunciado:**  
A partir de las entidades definidas, lista todos los endpoints REST que necesitarás implementar en tu API.

**Requisitos:**
- Listar endpoints para cada entidad principal.
- Incluir verbo HTTP, ruta y descripción.
- Al menos 2 endpoints por entidad.
- Indicar si el endpoint requiere autenticación o no (para este curso, todos son públicos).
- Guardar en `planeacion.md`.

**Entrada esperada:**  
Entidades: Libro, Prestamo

**Salida esperada:**
```
ENDPOINTS PLANIFICADOS

Libro:
  GET    /api/libros           → Listar todos los libros
  GET    /api/libros/{id}      → Obtener libro por ID
  POST   /api/libros           → Crear nuevo libro
  PUT    /api/libros/{id}      → Actualizar libro
  DELETE /api/libros/{id}      → Eliminar libro

Prestamo:
  GET    /api/prestamos        → Listar todos los préstamos
  GET    /api/prestamos/{id}   → Obtener préstamo por ID
  POST   /api/prestamos        → Registrar nuevo préstamo
  PUT    /api/prestamos/{id}/devolver → Marcar como devuelto
```

---

## Nivel 3: Crear repo GitHub con README

**Enunciado:**  
Crea un repositorio en GitHub para tu proyecto final con un README.md profesional que incluya descripción, tecnologías, instrucciones de instalación y endpoints.

**Requisitos:**
- Crear repositorio en GitHub (público).
- Inicializar con `README.md`.
- README debe incluir:
  - Nombre del proyecto
  - Descripción
  - Tecnologías usadas (.NET 8, EF Core, SQLite, Swagger)
  - Requisitos previos (.NET SDK, VS Code)
  - Instrucciones de instalación y ejecución
  - Lista de endpoints
  - Integrantes del equipo
- Hacer commit y push inicial.
- Compartir la URL del repositorio.

**Entrada esperada:**  
```
git init
git add .
git commit -m "feat: planeación inicial del proyecto"
git branch -M main
git remote add origin https://github.com/usuario/mi-proyecto.git
git push -u origin main
```

**Salida esperada:**  
Repositorio en GitHub con README.md visible y código subido.
