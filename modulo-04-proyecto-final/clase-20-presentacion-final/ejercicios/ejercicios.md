# Ejercicios — Clase 20: Presentación Final

## Nivel 1: Preparar presentación

**Enunciado:**  
Prepara una presentación de 5-7 diapositivas para exponer tu proyecto final ante el grupo.

**Requisitos:**
- Crear presentación en PowerPoint, Google Slides o Canva.
- Diapositivas sugeridas:
  1. Portada (nombre del proyecto, integrantes, fecha).
  2. Problemática y solución propuesta.
  3. Tecnologías utilizadas.
  4. Arquitectura y estructura del proyecto.
  5. Endpoints y funcionalidades principales.
  6. Capturas de funcionamiento.
  7. Aprendizajes y conclusiones.
- Diseño limpio y profesional.
- Incluir diagrama de la base de datos (entidades y relaciones).
- La presentación no debe exceder 7 diapositivas.

**Entrada esperada:**
```bash
# crear presentación
```

**Salida esperada:**  
Archivo de presentación (`presentacion.pptx` o `presentacion.pdf`) listo para exponer.

---

## Nivel 2: Ensayar demo de 5 min

**Enunciado:**  
Ensayar la demostración en vivo del proyecto. La demo no debe exceder 5 minutos y debe cubrir los puntos clave.

**Requisitos:**
- La demo en vivo debe incluir:
  - Mostrar el código en VS Code (estructura del proyecto).
  - Ejecutar la API con `dotnet run`.
  - Probar GET, POST, PUT, DELETE en Swagger.
  - Mostrar un caso de error (validación o 404).
  - Mostrar la base de datos (opcional con DB Browser for SQLite).
- Cronometrar el ensayo para asegurar que no exceda 5 minutos.
- Preparar datos de prueba previamente cargados.
- Tener la API corriendo antes de comenzar la presentación.
- Practicar la explicación de cada endpoint mientras se prueba.

**Entrada esperada:**
```bash
dotnet run
# abrir Swagger en el navegador
```

**Salida esperada:**  
Demo fluida de máximo 5 minutos mostrando toda la funcionalidad del proyecto.

---

## Nivel 3: Subir video + repo final

**Enunciado:**  
Realiza la entrega final del proyecto: sube el video de la presentación, asegura que el repositorio esté completo y comparte todo con el instructor.

**Requisitos:**
- Subir el video de la presentación final a YouTube (no listado o público).
- Verificar que el repositorio en GitHub contenga:
  - README.md completo y actualizado.
  - Código fuente funcional.
  - Capturas de pantalla en carpeta `capturas/`.
  - Migraciones de base de datos.
  - Presentación en PDF o PPTX.
- Hacer commit final con mensaje: `"feat: entrega final proyecto"`.
- Empujar a GitHub: `git push`.
- Compartir con el instructor:
  - URL del repositorio de GitHub.
  - URL del video de YouTube.
  - URL de la presentación (si está en la nube).
- Completar la lista de verificación de entrega.

**Entrada esperada:**
```bash
git add .
git commit -m "feat: entrega final proyecto"
git push
```

**Salida esperada:**  
Proyecto completo entregado con:
- Repositorio público en GitHub ✓
- README.md profesional ✓
- API funcional con CRUD ✓
- Capturas de prueba ✓
- Video demo ✓
- Presentación final ✓
- Todo enlazado y accesible ✓
