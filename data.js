const TITLE = 'Diplomado Programación con .NET';
const SUBTITLE = '4 semanas · 20 clases · C# · ASP.NET Core · EF Core · SQLite';
const DESCRIPTION = 'Curso práctico para aprender desarrollo de software con .NET desde cero. Fundamentos de C#, Programación Orientada a Objetos, APIs REST con ASP.NET Core y un proyecto final integrador.';

const UNITS = [
  {
    id: 'u1',
    title: 'Fundamentos de C# y .NET',
    subtitle: 'Módulo 1',
    desc: 'Comprende la plataforma .NET y crea programas básicos en C# usando la terminal y Visual Studio Code.',
    product: 'Aplicación de consola funcional',
    color: 'cyan',
    classes: [
      { id: '01', title: 'Introducción a .NET', dir: 'modulo-01-fundamentos-csharp/clase-01-introduccion-dotnet' },
      { id: '02', title: 'Variables, Tipos y Operadores', dir: 'modulo-01-fundamentos-csharp/clase-02-variables-tipos-operadores' },
      { id: '03', title: 'Condicionales', dir: 'modulo-01-fundamentos-csharp/clase-03-condicionales' },
      { id: '04', title: 'Ciclos', dir: 'modulo-01-fundamentos-csharp/clase-04-ciclos' },
      { id: '05', title: 'Métodos y Reto Integrador', dir: 'modulo-01-fundamentos-csharp/clase-05-metodos-reto' },
    ]
  },
  {
    id: 'u2',
    title: 'Programación Orientada a Objetos',
    subtitle: 'Módulo 2',
    desc: 'Modela problemas usando clases, objetos, encapsulamiento, herencia, polimorfismo, interfaces y colecciones.',
    product: 'Sistema de gestión en consola',
    color: 'blue',
    classes: [
      { id: '06', title: 'Clases, Objetos y Constructores', dir: 'modulo-02-poo-csharp/clase-06-clases-objetos-constructores' },
      { id: '07', title: 'Encapsulamiento y Propiedades', dir: 'modulo-02-poo-csharp/clase-07-encapsulamiento-propiedades' },
      { id: '08', title: 'Herencia', dir: 'modulo-02-poo-csharp/clase-08-herencia' },
      { id: '09', title: 'Polimorfismo e Interfaces', dir: 'modulo-02-poo-csharp/clase-09-polimorfismo-interfaces' },
      { id: '10', title: 'Colecciones, JSON y Archivos', dir: 'modulo-02-poo-csharp/clase-10-colecciones-json-archivos' },
    ]
  },
  {
    id: 'u3',
    title: 'Desarrollo Web con ASP.NET Core',
    subtitle: 'Módulo 3',
    desc: 'Desarrolla una API REST funcional con ASP.NET Core, Entity Framework Core y SQLite.',
    product: 'API REST con base de datos',
    color: 'purple',
    classes: [
      { id: '11', title: 'Introducción a ASP.NET Core', dir: 'modulo-03-aspnet-core-api/clase-11-introduccion-aspnet-core' },
      { id: '12', title: 'HTTP, REST y Controladores', dir: 'modulo-03-aspnet-core-api/clase-12-http-rest-controladores' },
      { id: '13', title: 'Modelos, DTOs y Validaciones', dir: 'modulo-03-aspnet-core-api/clase-13-modelos-dtos-validaciones' },
      { id: '14', title: 'Entity Framework Core y SQLite', dir: 'modulo-03-aspnet-core-api/clase-14-entity-framework-sqlite' },
      { id: '15', title: 'CRUD API y Swagger', dir: 'modulo-03-aspnet-core-api/clase-15-crud-api-swagger' },
    ]
  },
  {
    id: 'u4',
    title: 'Proyecto Final Integrador',
    subtitle: 'Módulo 4',
    desc: 'Desarrolla un proyecto funcional aplicando C#, POO, ASP.NET Core, EF Core, SQLite, Git y documentación técnica.',
    product: 'Proyecto completo con API + BD',
    color: 'green',
    classes: [
      { id: '16', title: 'Planeación del Proyecto', dir: 'modulo-04-proyecto-final/clase-16-planeacion-proyecto' },
      { id: '17', title: 'Modelado y Base de Datos', dir: 'modulo-04-proyecto-final/clase-17-modelado-base-datos' },
      { id: '18', title: 'Desarrollo de la API', dir: 'modulo-04-proyecto-final/clase-18-desarrollo-api' },
      { id: '19', title: 'Pruebas y Documentación', dir: 'modulo-04-proyecto-final/clase-19-pruebas-documentacion' },
      { id: '20', title: 'Presentación Final', dir: 'modulo-04-proyecto-final/clase-20-presentacion-final' },
    ]
  }
];

const EXERCISES = [
  { id: '01', title: 'Validador Luhn', module: 'Fundamentos C#', desc: 'App de consola que valida tarjetas con algoritmo de Luhn. Strings, ciclos, metodos.', dir: 'diplomado-ejercicios/ejercicio-01-luhn', icon: 'N1' },
  { id: '02', title: 'Sistema Tareas POO', module: 'POO con C#', desc: 'Gestion de tareas con herencia, interfaces, polimorfismo y persistencia JSON.', dir: 'diplomado-ejercicios/ejercicio-02-poo', icon: 'N2' },
  { id: '03', title: 'API Clima + IA', module: 'ASP.NET Core', desc: 'API REST con EF Core, SQLite, consumo de API externa y analisis con Groq.', dir: 'diplomado-ejercicios/ejercicio-03-clima-api', icon: 'N3' }
];

const PROJECT_INFO = {
  title: 'Proyecto Final Integrador',
  desc: 'API REST con IA que resuelve una problematica real alineada a los ODS. Grupos de 4 con roles definidos.',
  icon: 'N4',
  dir: 'proyecto-final'
};

const RESOURCES = [
  { title: '.NET SDK 8.0', url: 'https://dotnet.microsoft.com/download/dotnet/8.0' },
  { title: 'Documentación C#', url: 'https://learn.microsoft.com/dotnet/csharp/' },
  { title: 'ASP.NET Core Docs', url: 'https://learn.microsoft.com/aspnet/core/' },
  { title: 'Entity Framework Core', url: 'https://learn.microsoft.com/ef/core/' },
  { title: 'Visual Studio Code', url: 'https://code.visualstudio.com/' },
  { title: 'Swagger / OpenAPI', url: 'https://swagger.io/' },
  { title: 'SQLite', url: 'https://www.sqlite.org/' },
  { title: 'Postman', url: 'https://www.postman.com/' },
];
