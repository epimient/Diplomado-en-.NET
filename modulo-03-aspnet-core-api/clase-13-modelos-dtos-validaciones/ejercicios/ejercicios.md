# Ejercicio guiado — API de estudiantes con modelos, DTOs y validaciones

## Enunciado

Construye una API REST sencilla en ASP.NET Core para registrar y consultar estudiantes.

La aplicación debe utilizar una clase `Estudiante` como modelo interno y dos DTOs diferentes:

* Un DTO para recibir los datos enviados por el cliente.
* Un DTO para devolver la información del estudiante en las respuestas.

El cliente no debe enviar manualmente el `Id` del estudiante. El servidor será responsable de generar este valor automáticamente.

Los datos recibidos deben validarse mediante Data Annotations. Si la información enviada no cumple las reglas, ASP.NET Core debe devolver automáticamente una respuesta `400 Bad Request` con los errores encontrados.

Los estudiantes se almacenarán temporalmente en una lista en memoria.

---

## Estructura del proyecto

Organiza el proyecto utilizando las siguientes carpetas:

```text
EstudiantesApi/
├── Controllers/
│   └── EstudiantesController.cs
├── Models/
│   └── Estudiante.cs
├── Dtos/
│   ├── EstudianteCreacionDto.cs
│   └── EstudianteDto.cs
├── Program.cs
└── EstudiantesApi.csproj
```

---

## 1. Modelo `Estudiante`

Crea una clase llamada `Estudiante` dentro de la carpeta `Models`.

Debe contener las siguientes propiedades:

| Propiedad         | Tipo       | Descripción                                  |
| ----------------- | ---------- | -------------------------------------------- |
| `Id`              | `int`      | Identificador único generado por el servidor |
| `Nombre`          | `string`   | Nombre completo del estudiante               |
| `Email`           | `string`   | Correo electrónico del estudiante            |
| `FechaNacimiento` | `DateTime` | Fecha de nacimiento del estudiante           |

La clase `Estudiante` representa los datos internos almacenados por la aplicación.

---

## 2. DTO de entrada `EstudianteCreacionDto`

Crea una clase llamada `EstudianteCreacionDto` dentro de la carpeta `Dtos`.

Debe contener:

| Propiedad         | Tipo        | Validación                                    |
| ----------------- | ----------- | --------------------------------------------- |
| `Nombre`          | `string`    | Obligatorio, mínimo 3 y máximo 100 caracteres |
| `Email`           | `string`    | Obligatorio y con formato de correo válido    |
| `FechaNacimiento` | `DateTime?` | Obligatoria                                   |

Este DTO no debe incluir la propiedad `Id`, porque el identificador será generado por el servidor.

Utiliza Data Annotations como:

```csharp
[Required]
[StringLength]
[EmailAddress]
```

Incluye mensajes de error personalizados en español.

---

## 3. DTO de salida `EstudianteDto`

Crea una clase llamada `EstudianteDto` dentro de la carpeta `Dtos`.

Debe contener:

| Propiedad         | Tipo       |
| ----------------- | ---------- |
| `Id`              | `int`      |
| `Nombre`          | `string`   |
| `Email`           | `string`   |
| `FechaNacimiento` | `DateTime` |

Este DTO representa la información que la API devolverá al cliente.

---

## 4. Controlador `EstudiantesController`

Crea un controlador llamado `EstudiantesController` dentro de la carpeta `Controllers`.

El controlador debe:

* Heredar de `ControllerBase`.
* Utilizar `[ApiController]`.
* Utilizar la ruta `[Route("api/[controller]")]`.
* Tener una lista estática de estudiantes.
* Tener una variable estática para generar identificadores consecutivos.

La lista debe ser:

```csharp
List<Estudiante>
```

El primer estudiante registrado debe recibir el `Id` número 1, el segundo el número 2 y así sucesivamente.

---

## 5. Endpoint para crear un estudiante

Implementa el siguiente endpoint:

```text
POST /api/estudiantes
```

El endpoint debe recibir un objeto `EstudianteCreacionDto` desde el cuerpo de la petición.

Debe realizar el siguiente proceso:

1. Recibir y validar automáticamente el DTO.
2. Crear un objeto `Estudiante`.
3. Generar automáticamente el `Id`.
4. Copiar al modelo los datos recibidos en el DTO.
5. Guardar el estudiante en la lista.
6. Convertir el modelo en un `EstudianteDto`.
7. Devolver `201 Created`.
8. Incluir la ubicación del nuevo recurso mediante `CreatedAtAction()`.

Ejemplo de entrada:

```json
{
  "nombre": "María García",
  "email": "maria@email.com",
  "fechaNacimiento": "2000-05-15"
}
```

Respuesta esperada:

```json
{
  "id": 1,
  "nombre": "María García",
  "email": "maria@email.com",
  "fechaNacimiento": "2000-05-15T00:00:00"
}
```

Código de estado esperado:

```text
201 Created
```

---

## 6. Endpoint para listar estudiantes

Implementa el siguiente endpoint:

```text
GET /api/estudiantes
```

Debe:

1. Recorrer la lista de modelos `Estudiante`.
2. Convertir cada modelo en un `EstudianteDto`.
3. Devolver la lista resultante.

Respuesta esperada:

```json
[
  {
    "id": 1,
    "nombre": "María García",
    "email": "maria@email.com",
    "fechaNacimiento": "2000-05-15T00:00:00"
  }
]
```

Código de estado esperado:

```text
200 OK
```

Si no existen estudiantes, debe devolver:

```json
[]
```

---

## 7. Endpoint para obtener un estudiante por Id

Implementa el siguiente endpoint:

```text
GET /api/estudiantes/{id}
```

Ejemplo:

```text
GET /api/estudiantes/1
```

El endpoint debe:

1. Recibir el `Id` desde la ruta.
2. Buscar el estudiante en la lista.
3. Si existe, convertirlo en un `EstudianteDto`.
4. Devolver el estudiante con `200 OK`.
5. Si no existe, devolver `404 Not Found`.

Respuesta cuando existe:

```json
{
  "id": 1,
  "nombre": "María García",
  "email": "maria@email.com",
  "fechaNacimiento": "2000-05-15T00:00:00"
}
```

Respuesta cuando no existe:

```json
{
  "mensaje": "No existe un estudiante con Id 99"
}
```

---

## 8. Validaciones automáticas

El controlador debe utilizar:

```csharp
[ApiController]
```

Gracias a este atributo, ASP.NET Core debe validar automáticamente el DTO antes de ejecutar el endpoint.

Prueba la siguiente petición inválida:

```json
{
  "nombre": "",
  "email": "correo-invalido",
  "fechaNacimiento": null
}
```

La API debe responder con:

```text
400 Bad Request
```

La respuesta debe incluir errores relacionados con:

* Nombre obligatorio.
* Email con formato inválido.
* Fecha de nacimiento obligatoria.

No es necesario comprobar manualmente:

```csharp
if (!ModelState.IsValid)
```

porque `[ApiController]` realiza la validación automáticamente.

---

## Endpoints requeridos

| Método | Ruta                    | Operación            | Respuesta exitosa |
| ------ | ----------------------- | -------------------- | ----------------- |
| `POST` | `/api/estudiantes`      | Registrar estudiante | `201 Created`     |
| `GET`  | `/api/estudiantes`      | Listar estudiantes   | `200 OK`          |
| `GET`  | `/api/estudiantes/{id}` | Consultar por Id     | `200 OK`          |

Cuando el estudiante solicitado no exista:

```text
404 Not Found
```

Cuando los datos enviados sean inválidos:

```text
400 Bad Request
```

---

## Requisitos técnicos

* Utilizar ASP.NET Core Web API con controladores.
* Separar `Models`, `Dtos` y `Controllers`.
* No recibir directamente el modelo `Estudiante` en el endpoint `POST`.
* No permitir que el cliente establezca el `Id`.
* Utilizar Data Annotations.
* Utilizar `[FromBody]` en el endpoint `POST`.
* Utilizar una lista estática como almacenamiento temporal.
* Realizar el mapeo manual entre DTOs y modelo.
* Utilizar `CreatedAtAction()` al crear.
* Utilizar `Ok()` en las consultas exitosas.
* Utilizar `NotFound()` cuando el estudiante no exista.
* Mantener el código organizado y correctamente indentado.

---

## Criterios de evaluación

| Criterio                                       | Valor |
| ---------------------------------------------- | ----: |
| Modelo `Estudiante` correctamente definido     |  15 % |
| DTO de entrada sin propiedad `Id`              |  15 % |
| DTO de salida correctamente definido           |  10 % |
| Validaciones con Data Annotations              |  15 % |
| Endpoint `POST` funcional                      |  15 % |
| Endpoint `GET` para listar                     |  10 % |
| Endpoint `GET` por Id                          |  10 % |
| Códigos HTTP correctos                         |   5 % |
| Organización de carpetas y claridad del código |   5 % |

---

## Resultado esperado

Al finalizar el ejercicio, el estudiante debe poder explicar el siguiente flujo:

```text
JSON enviado por el cliente
            ↓
EstudianteCreacionDto
            ↓
Validaciones automáticas
            ↓
Modelo Estudiante
            ↓
Lista en memoria
            ↓
EstudianteDto
            ↓
JSON enviado como respuesta
```

La finalidad principal del ejercicio es comprender que el modelo representa los datos internos de la aplicación, mientras que los DTOs controlan la información que entra y sale de la API.
