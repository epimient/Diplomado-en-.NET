# Taller de definición del Proyecto Final

## Objetivo

Definir de manera clara qué hará la API REST del proyecto, qué información administrará, qué funcionalidades tendrá y cómo se integrará con un modelo de inteligencia artificial.

El resultado de este taller será la guía inicial para comenzar el desarrollo del proyecto final.

---

## Organización

El trabajo se realizará en los grupos de cuatro integrantes definidos para el proyecto.

Cada integrante deberá participar de acuerdo con su rol:

| Rol          | Participación en el taller                                    |
| ------------ | ------------------------------------------------------------- |
| Backend / TL | Define arquitectura general, recursos y endpoints principales |
| API / IA     | Define la funcionalidad de inteligencia artificial            |
| BD / DTOs    | Define modelos, datos, relaciones y validaciones              |
| Docs / QA    | Organiza el documento, ejemplos y casos de prueba             |

---

# Actividad 1. Definición del problema

Respondan de forma breve:

1. ¿Qué problema desean resolver?
2. ¿Quiénes se beneficiarían de la solución?
3. ¿Cómo ayudaría una API a resolver el problema?
4. ¿Qué relación tiene la propuesta con el ODS seleccionado?

### Producto esperado

Un párrafo de máximo 150 palabras.

---

# Actividad 2. Funcionalidad general de la API

Completen la siguiente frase:

> Nuestra API permitirá ________________________________________________.

Después escriban entre cinco y ocho funcionalidades principales.

### Ejemplo

Para una API de clasificación de quejas ciudadanas:

* Registrar una queja.
* Consultar las quejas registradas.
* Actualizar una queja.
* Eliminar una queja.
* Clasificar una queja mediante inteligencia artificial.
* Consultar las quejas por categoría.
* Consultar las quejas por estado.

### Producto esperado

Una tabla como la siguiente:

| Módulo                  | Funcionalidades                             |
| ----------------------- | ------------------------------------------- |
| Quejas                  | Registrar, consultar, actualizar y eliminar |
| Inteligencia artificial | Clasificar la queja y sugerir prioridad     |
| Consultas               | Filtrar por categoría, estado o fecha       |

---

# Actividad 3. Recurso principal y modelo de datos

Identifiquen el recurso principal que administrará la API.

### Ejemplos

* Queja.
* Residuo.
* Cultivo.
* Alimento.
* Tutor.
* Estudiante.
* Producto.
* Registro de calidad del aire.

Definan sus campos principales.

### Ejemplo

| Campo       | Tipo de dato | Obligatorio | Descripción        |
| ----------- | ------------ | ----------: | ------------------ |
| Id          | int          |          Sí | Identificador      |
| Descripcion | string       |          Sí | Texto de la queja  |
| Categoria   | string       |          No | Categoría asignada |
| Prioridad   | string       |          No | Prioridad sugerida |
| Fecha       | DateTime     |          Sí | Fecha de registro  |
| Estado      | string       |          Sí | Estado de la queja |

Si el sistema necesita más de un modelo, indiquen también sus relaciones.

### Producto esperado

* Lista de modelos.
* Campos principales.
* Relación entre los modelos.

---

# Actividad 4. Endpoints principales

Definan los endpoints básicos de la API.

Como mínimo, el proyecto debe incluir:

| Método | Endpoint                     | Función                  |
| ------ | ---------------------------- | ------------------------ |
| GET    | `/api/recurso`               | Consultar todos          |
| GET    | `/api/recurso/{id}`          | Consultar uno            |
| POST   | `/api/recurso`               | Crear                    |
| PUT    | `/api/recurso/{id}`          | Actualizar               |
| DELETE | `/api/recurso/{id}`          | Eliminar                 |
| POST   | `/api/recurso/{id}/analizar` | Ejecutar análisis con IA |

Reemplacen `recurso` por el nombre correspondiente al proyecto.

### Ejemplo

```http
GET /api/quejas
GET /api/quejas/5
POST /api/quejas
PUT /api/quejas/5
DELETE /api/quejas/5
POST /api/quejas/5/analizar
```

También pueden agregar endpoints de búsqueda o filtros.

### Ejemplo

```http
GET /api/quejas?categoria=seguridad
GET /api/quejas?estado=pendiente
```

### Producto esperado

Una tabla con:

* método HTTP;
* ruta;
* descripción;
* datos de entrada;
* respuesta esperada.

---

# Actividad 5. Integración con inteligencia artificial

Definan una sola funcionalidad principal que será realizada por Groq.

Respondan:

1. ¿Qué información se enviará al modelo?
2. ¿Qué debe hacer el modelo?
3. ¿Qué respuesta deberá devolver?
4. ¿Dónde se almacenará el resultado?
5. ¿Qué ocurrirá si la IA no responde?

### Ejemplo

La API enviará la descripción de una queja al modelo de inteligencia artificial.

El modelo deberá devolver:

* categoría;
* nivel de prioridad;
* resumen;
* recomendación de atención.

### Entrada de ejemplo

```json
{
  "descripcion": "En el barrio no funciona el alumbrado público desde hace dos semanas."
}
```

### Respuesta esperada

```json
{
  "categoria": "Servicios públicos",
  "prioridad": "Media",
  "resumen": "Falla prolongada en el alumbrado público",
  "recomendacion": "Remitir a la entidad responsable del mantenimiento eléctrico"
}
```

La respuesta del modelo debe tener una estructura clara. No se acepta como diseño técnico algo como “la IA analizará los datos y dará una respuesta inteligente”. Eso pertenece al reino místico del PowerPoint.

---

# Actividad 6. Diagrama general del sistema

Realicen un diagrama sencillo que muestre los componentes principales.

Debe incluir:

```text
Cliente o Swagger
        ↓
      API REST
        ↓
Servicio o lógica de negocio
   ├── Entity Framework Core
   ├── Base de datos SQLite
   └── Servicio de inteligencia artificial
                ↓
             Groq API
```

El diagrama puede realizarse en:

* Draw.io.
* Mermaid.
* Canva.
* Excalidraw.
* Papel, siempre que sea legible.

### Producto esperado

Un diagrama de arquitectura general.

---

# Entregable del taller

Cada equipo debe entregar un documento corto que contenga:

1. Nombre del proyecto.
2. ODS relacionado.
3. Descripción del problema.
4. Funcionalidades principales.
5. Modelos y campos.
6. Tabla de endpoints.
7. Funcionalidad de inteligencia artificial.
8. Ejemplo de entrada y salida JSON.
9. Diagrama general del sistema.
10. Distribución inicial de tareas por integrante.

---

# Distribución inicial de tareas

| Integrante   | Rol          | Primera tarea asignada              |
| ------------ | ------------ | ----------------------------------- |
| Integrante 1 | Backend / TL | Crear proyecto y estructura inicial |
| Integrante 2 | API / IA     | Probar conexión con Groq            |
| Integrante 3 | BD / DTOs    | Diseñar modelos y DTOs              |
| Integrante 4 | Docs / QA    | Crear README y registrar decisiones |

---

# Presentación

Cada grupo dispondrá de cinco minutos para explicar:

* qué problema resolverá;
* cuál será el recurso principal;
* qué endpoints tendrá;
* qué hará la inteligencia artificial;
* y cómo se dividirá el trabajo.

---

# Criterios de revisión

| Criterio                               | Porcentaje |
| -------------------------------------- | ---------: |
| Claridad del problema                  |       15 % |
| Funcionalidades coherentes             |       20 % |
| Modelos y datos definidos              |       15 % |
| Endpoints correctamente planteados     |       20 % |
| Integración con IA claramente definida |       20 % |
| Diagrama y organización del equipo     |       10 % |
| **Total**                              |  **100 %** |

---

# Resultado esperado

Al finalizar la actividad, el equipo debe poder responder claramente:

* ¿Qué administra la API?
* ¿Qué operaciones permite?
* ¿Qué datos recibe?
* ¿Qué datos devuelve?
* ¿Qué función realiza la inteligencia artificial?
* ¿Qué información se almacena?
* ¿Cómo se distribuye el trabajo?
