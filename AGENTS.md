# AGENTS.md — Diplomado Programación con .NET

## Naturaleza

Este repositorio es un **curso práctico de 4 semanas de Programación con .NET**, no una aplicación única.

El diplomado está organizado en módulos semanales y clases diarias de lunes a viernes.
Cada clase debe ser autocontenida y debe incluir explicación, ejemplo guiado, ejercicios y recursos de apoyo.

Estructura general esperada:

```txt
modulo-01-fundamentos-csharp/
modulo-02-poo-csharp/
modulo-03-aspnet-core-api/
modulo-04-proyecto-final/
```

Cada clase debe seguir una estructura similar:

```txt
clase-XX-nombre/
├── clase-XX.md
├── ejemplo-guiado/
├── ejercicios/
├── dudas/
├── html/
└── README.md
```

El repositorio funciona como material académico, guía de clase, base para ejercicios y sitio de consulta para estudiantes.

---

## Enfoque pedagógico

El curso debe ser **altamente práctico**.

No debe centrarse en enseñar botones de Visual Studio.
El objetivo es enseñar programación con C#, .NET, Programación Orientada a Objetos, bases de datos y APIs modernas.

El curso debe poder desarrollarse desde:

* Linux
* Windows
* macOS

Herramienta principal recomendada:

```txt
Visual Studio Code + .NET SDK
```

Los proyectos deben ser compatibles con Visual Studio Community, pero el curso no debe depender de él.

---

## Duración

El diplomado dura **1 mes**.

```txt
4 semanas
20 clases
lunes a viernes
```

Distribución:

```txt
Semana 1 → Fundamentos de C# y .NET
Semana 2 → Programación Orientada a Objetos con C#
Semana 3 → Desarrollo Web con ASP.NET Core
Semana 4 → Proyecto Final Integrador
```

---

## Stack principal

```txt
Lenguaje: C#
Plataforma: .NET SDK
Editor: Visual Studio Code
Control de versiones: Git + GitHub
Base de datos: SQLite
ORM: Entity Framework Core
Web/API: ASP.NET Core Web API
Documentación API: Swagger / OpenAPI
Cliente de pruebas: Swagger, Thunder Client, Postman o curl
```

---

## Versión recomendada de .NET

Usar una versión LTS vigente de .NET.

Preferencia:

```txt
.NET 8 LTS
```

Evitar depender de versiones preview o características experimentales.

---

## Comandos base de .NET CLI

Los ejemplos deben favorecer el uso de terminal.

Crear proyecto de consola:

```bash
dotnet new console -n MiPrimeraApp
cd MiPrimeraApp
dotnet run
```

Crear solución:

```bash
dotnet new sln -n MiSolucion
```

Crear proyecto Web API:

```bash
dotnet new webapi -n MiApi
cd MiApi
dotnet run
```

Restaurar dependencias:

```bash
dotnet restore
```

Compilar:

```bash
dotnet build
```

Ejecutar:

```bash
dotnet run
```

Ejecutar con recarga automática:

```bash
dotnet watch run
```

---

## Estructura del curso

## Módulo 1 — Fundamentos de C# y .NET

Objetivo:

Que el estudiante comprenda la plataforma .NET y pueda crear programas básicos en C# utilizando la terminal y Visual Studio Code.

Clases sugeridas:

```txt
clase-01-introduccion-dotnet
clase-02-variables-tipos-operadores
clase-03-condicionales
clase-04-ciclos
clase-05-metodos-y-reto-integrador
```

Contenidos:

* ¿Qué es .NET?
* .NET Framework vs .NET Core vs .NET moderno
* SDK de .NET
* CLI de .NET
* Estructura de un proyecto
* Program.cs
* Variables
* Tipos de datos
* Operadores
* Entrada y salida por consola
* Conversión de datos
* if / else
* switch
* for
* while
* do while
* foreach
* Métodos
* Parámetros
* Retorno de valores

Producto del módulo:

```txt
Aplicación de consola funcional
```

Ideas:

* Calculadora
* Sistema de notas
* Conversor de unidades
* Cajero básico
* Menú interactivo por consola

---

## Módulo 2 — Programación Orientada a Objetos con C#

Objetivo:

Que el estudiante modele problemas usando clases, objetos, encapsulamiento, herencia, polimorfismo, interfaces y colecciones.

Clases sugeridas:

```txt
clase-06-clases-objetos-constructores
clase-07-encapsulamiento-propiedades
clase-08-herencia
clase-09-polimorfismo-interfaces
clase-10-colecciones-json-archivos
```

Contenidos:

* Clases
* Objetos
* Constructores
* Métodos
* Propiedades
* get / set
* Encapsulamiento
* Herencia
* Sobrescritura de métodos
* Polimorfismo
* Interfaces
* Clases abstractas
* List
* Dictionary
* Manejo de excepciones
* Archivos
* JSON

Producto del módulo:

```txt
Sistema de gestión en consola usando POO
```

Ideas:

* Biblioteca
* Inventario
* Veterinaria
* Hotel
* Parqueadero
* Agenda médica
* Sistema de empleados

---

## Módulo 3 — Desarrollo Web con ASP.NET Core

Objetivo:

Que el estudiante desarrolle una API REST funcional con ASP.NET Core, Entity Framework Core y SQLite.

Clases sugeridas:

```txt
clase-11-introduccion-aspnet-core
clase-12-http-rest-controladores
clase-13-modelos-dtos-validaciones
clase-14-entity-framework-sqlite
clase-15-crud-api-swagger
```

Contenidos:

* ¿Qué es ASP.NET Core?
* Web API
* HTTP
* REST
* Endpoints
* GET
* POST
* PUT
* DELETE
* Controladores
* Routing
* Modelos
* DTOs
* Validaciones básicas
* Inyección de dependencias
* Entity Framework Core
* DbContext
* SQLite
* Migraciones
* CRUD
* Swagger / OpenAPI

Producto del módulo:

```txt
API REST funcional con base de datos
```

Ideas:

* API de productos
* API de biblioteca
* API de tareas
* API de clientes
* API de reservas
* API de ventas

---

## Módulo 4 — Proyecto Final Integrador

Objetivo:

Que el estudiante desarrolle un proyecto funcional aplicando C#, POO, ASP.NET Core, Entity Framework Core, SQLite, Git y documentación técnica.

Clases sugeridas:

```txt
clase-16-planeacion-proyecto
clase-17-modelado-y-base-datos
clase-18-desarrollo-api
clase-19-pruebas-documentacion
clase-20-presentacion-final
```

El proyecto final debe incluir:

* Programación Orientada a Objetos
* API REST
* Base de datos SQLite
* Entity Framework Core
* CRUD completo
* Validaciones
* Swagger
* Git
* GitHub
* README.md profesional
* Capturas de pruebas
* Presentación final

Ideas de proyecto:

* Sistema de inventario
* Sistema de biblioteca
* Sistema de restaurante
* Sistema de hotel
* Sistema de gimnasio
* Sistema de parqueadero
* Sistema de agenda médica
* Sistema de ventas
* Sistema de gestión de clientes

---

## Proyecto final — Requisitos mínimos

Cada equipo debe entregar:

```txt
1. Repositorio en GitHub
2. Código fuente funcional
3. API REST documentada con Swagger
4. Base de datos SQLite
5. CRUD completo de al menos 2 entidades
6. README.md profesional
7. Capturas de pruebas
8. Video corto de funcionamiento
9. Presentación final
```

Requisitos técnicos mínimos:

```txt
- Al menos 2 entidades relacionadas
- Al menos 1 controlador por entidad principal
- Uso de Entity Framework Core
- Uso de DTOs o modelos de entrada
- Manejo básico de errores
- Validaciones básicas
- Pruebas desde Swagger, Postman, Thunder Client o curl
```

---

## Estructura recomendada para proyectos ASP.NET Core

Para proyectos sencillos:

```txt
MiApi/
├── Controllers/
├── Models/
├── Data/
├── DTOs/
├── Services/
├── Program.cs
├── appsettings.json
└── README.md
```

Para proyectos un poco más organizados:

```txt
MiApi/
├── Controllers/
├── Data/
│   └── AppDbContext.cs
├── Models/
├── DTOs/
├── Services/
├── Interfaces/
├── Migrations/
├── Program.cs
├── appsettings.json
└── README.md
```

No sobredimensionar la arquitectura.
El curso es introductorio-intermedio, no un curso avanzado de arquitectura empresarial.

---

## Dependencias frecuentes

Entity Framework Core con SQLite:

```bash
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

Herramienta de migraciones:

```bash
dotnet tool install --global dotnet-ef
```

Crear migración:

```bash
dotnet ef migrations add InitialCreate
```

Aplicar migración:

```bash
dotnet ef database update
```

---

## No usar en este curso

Evitar incluir estos temas en el primer diplomado:

```txt
Windows Forms
WPF
MAUI
Blazor
Azure
Docker
Microservicios
Clean Architecture avanzada
CQRS
MediatR
RabbitMQ
Autenticación compleja
JWT avanzado
Identity
```

Estos temas pueden quedar para un diplomado de nivel 2.

---

## Git y GitHub

Cada estudiante o equipo debe trabajar con Git desde el inicio.

Comandos mínimos:

```bash
git init
git add .
git commit -m "primer commit"
git branch -M main
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
```

El README.md debe incluir:

```txt
- Nombre del proyecto
- Descripción
- Tecnologías usadas
- Instalación
- Ejecución
- Endpoints
- Capturas de prueba
- Integrantes
- Estado del proyecto
```

---

## Sitio estático del curso

El curso puede tener una página de aterrizaje estática para GitHub Pages.

No debe requerir build step.

Ejecución local:

```bash
python -m http.server 8000
```

Abrir:

```txt
http://localhost:8000
```

Archivos principales:

```txt
index.html
landing.css
landing.js
data.js
engine/
```

---

## Navegación del sitio

Usar hash routing para facilitar GitHub Pages.

Formato:

```txt
#/clase-01/slides
#/clase-01/docs
#/clase-02/slides
#/clase-02/docs
```

Ejemplo de URL:

```txt
https://usuario.github.io/Curso-Programacion-DotNet/#/clase-07/docs
```

Los slides deben estar en:

```txt
clase-XX-nombre/html/
```

El markdown de la clase debe renderizarse desde:

```txt
clase-XX-nombre/clase-XX.md
```

---

## Estilo visual

Mantener estética oscura, moderna y limpia.

Variables CSS sugeridas estilo Tokio Nights:

```css
--bg-base: #1a1b2e;
--bg-panel: #24283b;
--cyan: #7dcfff;
--blue: #7aa2f7;
--green: #9ece6a;
--red: #f7768e;
--orange: #ff9e64;
--purple: #9d7cd8;
```

---

## Convención de nombres

Usar nombres claros y ordenados.

Ejemplos:

```txt
clase-01-introduccion-dotnet
clase-02-variables-tipos-operadores
clase-03-condicionales
clase-04-ciclos
clase-05-metodos-reto
```

Los archivos principales deben llamarse:

```txt
clase-XX.md
README.md
```

Los ejemplos deben ir en:

```txt
ejemplo-guiado/
```

Los ejercicios deben ir en:

```txt
ejercicios/
```

Las dudas o notas de clase deben ir en:

```txt
dudas/
```

---

## Reglas para los ejemplos

Cada ejemplo debe:

* Ejecutar correctamente con `dotnet run`.
* Tener nombres claros.
* Tener comentarios útiles, no excesivos.
* Evitar complejidad innecesaria.
* Incluir instrucciones en README.md.
* Mostrar primero lo simple y luego mejorar progresivamente.

No crear ejemplos demasiado empresariales para estudiantes principiantes.

---

## Reglas para ejercicios

Cada clase debe tener ejercicios de tres niveles:

```txt
Nivel 1: básico
Nivel 2: intermedio
Nivel 3: reto
```

Cada ejercicio debe incluir:

```txt
- Enunciado
- Requisitos
- Entrada esperada
- Salida esperada
- Criterios de evaluación
```

---

## Evaluación sugerida

```txt
Talleres prácticos: 20%
Retos por módulo: 20%
Quices cortos: 20%
Participación: 10%
Proyecto final: 30%
```

---

## Criterios de evaluación del proyecto final

```txt
Funcionalidad: 30%
Uso correcto de C# y .NET: 20%
Base de datos y persistencia: 15%
API REST y Swagger: 15%
Documentación: 10%
Presentación: 10%
```

---

## Filosofía del curso

Este diplomado debe enseñar a construir software funcional con .NET.

La prioridad es:

```txt
entender → practicar → construir → documentar → presentar
```

No se debe sacrificar comprensión por exceso de herramientas.

El estudiante debe terminar el curso con un proyecto real que pueda mostrar en su portafolio.
