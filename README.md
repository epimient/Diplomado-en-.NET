# Diplomado Programacion con .NET

4 semanas - 20 clases - C# - ASP.NET Core - EF Core - SQLite - IA

## Descripcion

Curso practico de programacion con .NET. Desde fundamentos de C# hasta construir una API REST con inteligencia artificial integrada. Enfoque en resolucion de problemas reales alineados a los Objetivos de Desarrollo Sostenible (ODS).

Cada clase incluye: teoria en markdown, slides navegables, ejemplo guiado, ejercicios por niveles y seccion de dudas frecuentes.

## Evaluacion — 4 notas

| Nota | Tipo | Peso | Que | Cuando |
|---|---|---|---|---|
| N1 | Formativa | 16.66% | Validador Luhn | Domingo semana 1 |
| N2 | Formativa | 16.66% | Sistema Tareas POO | Domingo semana 2 |
| N3 | Formativa | 16.66% | API Clima + Groq | Domingo semana 3 |
| N4 | Cognitiva | 50% | Proyecto Final grupal | Semana 4 |

**Formula:** Nota Final = ((N1 + N2 + N3) / 3) x 0.5 + N4 x 0.5

## Calendario

| Semana | Modulo | Clases | Entrega |
|---|---|---|---|
| 1 | Fundamentos de C# y .NET | 01 a 05 | Ejercicio 1 — Luhn (domingo) |
| 2 | Programacion Orientada a Objetos | 06 a 10 | Ejercicio 2 — Tareas POO (domingo) |
| 3 | Desarrollo Web con ASP.NET Core | 11 a 15 | Ejercicio 3 — API Clima + IA (domingo) |
| 4 | Proyecto Final Integrador | 16 a 20 | Proyecto grupal + 2 check-ins |

## Modulos

| Modulo | Clases | Contenido | Producto |
|---|---|---|---|
| 1 — Fundamentos C# | 01-05 | .NET, variables, tipos, operadores, condicionales, ciclos, metodos | App de consola |
| 2 — POO con C# | 06-10 | Clases, objetos, encapsulamiento, herencia, polimorfismo, interfaces, colecciones, JSON | Sistema con POO + JSON |
| 3 — ASP.NET Core API | 11-15 | HTTP, REST, controladores, DTOs, validaciones, EF Core, SQLite, Swagger, IA con Groq | API REST + BD + IA |
| 4 — Proyecto Final | 16-20 | Planeacion, modelado BD, desarrollo API, pruebas, documentacion, presentacion | Proyecto grupal completo |

## Proyecto Final

**Grupos de 4 personas con roles:**

| Rol | Responsabilidad |
|---|---|
| Backend / TL | Arquitectura, modelos, DbContext, endpoints principales |
| API / IA | Integracion con Groq, HttpClient, prompt engineering |
| BD / DTOs | Validaciones, DTOs, consultas LINQ, seed data, filtros |
| Docs / QA | README, Swagger, capturas, casos valido e invalido |

**Check-ins obligatorios (semana 4):**

- Check-in 1: Modelos creados, DbContext + migracion, al menos 1 endpoint funcional
- Check-in 2: CRUD completo, IA integrada, Swagger funcionando
- Penalizacion: -0.2 por cada check-in sin avance real (maximo -0.4 sobre la nota final)

**Entregables:**

- API REST funcional con CRUD completo, base de datos y analisis con IA
- Swagger documentado con capturas de 1 caso valido y 1 caso invalido por endpoint
- README.md profesional con descripcion, tecnologias, instalacion, ejecucion y endpoints
- Repositorio en GitHub (cada grupo crea el suyo)

**Problematicas sugeridas (alineadas a ODS):**

| Proyecto | ODS |
|---|---|
| Clasificador de quejas ciudadanas con IA | ODS 11 — Ciudades sostenibles |
| Match tutor-estudiante vulnerable | ODS 4 — Educacion de calidad |
| Eco-puntos: clasificador de residuos | ODS 12 — Produccion responsables |
| Reduccion de desperdicio alimenticio | ODS 2 — Hambre cero |
| Deteccion de plagas en cultivos | ODS 2 — Hambre cero |
| Monitoreo de calidad del aire | ODS 11 — Ciudades sostenibles |
| Marketplace local agricultor-consumidor | ODS 8 — Trabajo decente |
| Propio (validado con instructor) | — |

## Stack tecnologico

| Tecnologia | Version | Uso |
|---|---|---|
| .NET SDK | 8 LTS | Plataforma de desarrollo |
| C# | 12 | Lenguaje de programacion |
| ASP.NET Core | 8 | Framework web |
| Entity Framework Core | 8 | ORM para base de datos |
| SQLite | — | Base de datos embebida |
| Groq API | — | IA (Llama 3 / Mixtral) |
| Swagger / OpenAPI | — | Documentacion de API |
| Visual Studio Code | — | Editor de codigo |
| Git + GitHub | — | Control de versiones |

## Repositorios del curso

| Repositorio | Contenido |
|---|---|
| **Este repositorio** | 20 clases con slides, ejemplos, ejercicios internos y sitio web SPA |
| **diplomado-ejercicios** | 3 ejercicios formativos evaluados (solo enunciados) |
| **diplomado-proyecto-final-grupoX** | Cada grupo crea su propio repositorio para el proyecto final |

## Estructura del repositorio

```
/
├── modulo-01-fundamentos-csharp/     (clases 01-05)
├── modulo-02-poo-csharp/             (clases 06-10)
├── modulo-03-aspnet-core-api/        (clases 11-15)
├── modulo-04-proyecto-final/         (clases 16-20)
├── diplomado-ejercicios/             (3 ejercicios evaluados)
├── engine/                           (motor de slides)
├── index.html                        (sitio web SPA)
├── landing.css                       (estilos del sitio web)
├── landing.js                        (logica del sitio web)
├── data.js                           (datos del curso)
├── AGENTS.md                         (guia del curso para IA)
├── DESIGN.md                         (sistema de diseno visual)
└── README.md                         (este archivo)
```

Cada clase sigue esta estructura:

```
clase-XX-nombre/
├── clase-XX.md               (teoria completa)
├── html/slides.html          (presentacion navegable)
├── ejemplo-guiado/           (codigo de ejemplo funcional)
│   ├── Program.cs
│   └── README.md
├── ejercicios/               (3 niveles: basico, intermedio, reto)
├── dudas/dudas.md            (preguntas frecuentes)
└── README.md                 (guia rapida de la clase)
```

## Como navegar el curso

**Opcion 1 — Sitio web SPA (recomendado):**
Abrir `index.html` en cualquier navegador. Usa hash routing para navegar entre clases y acciones (doc, slides, example, exercises, faq).

**Opcion 2 — Leer los markdowns:**
Cada clase tiene su archivo `clase-XX.md` con la teoria completa.

**Opcion 3 — Slides:**
Cada clase tiene `html/slides.html` con presentacion navegable por teclado (flechas izquierda/derecha) y touch.

## Requisitos de instalacion

```bash
# Verificar que .NET SDK este instalado
dotnet --version

# Clonar el repositorio
git clone https://github.com/tu-usuario/Diplomado_NET.git
cd Diplomado_NET

# Abrir el sitio web (opcional)
# Simplemente abre index.html en tu navegador
```

Registros necesarios para el modulo 3 y proyecto final:
- OpenWeatherMap API: https://openweathermap.org/api (gratis)
- Groq API: https://console.groq.com (gratis, sin tarjeta)

## Politica de entregas

- Fecha limite: domingos 11:59 PM de la semana correspondiente
- Retraso en la entrega: 50% de penalizacion sobre la nota
- Ejercicio que no compila con `dotnet build`: nota maxima 3.0
- Ejercicios copiados entre companeros: 0 automatico
- Check-ins de proyecto sin avance real: -0.2 cada uno

## Licencia

Uso educativo. Proyecto de aprendizaje.
