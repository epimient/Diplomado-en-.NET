# Dudas — Clase 11

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Qué es exactamente ASP.NET Core?

ASP.NET Core es un framework web multiplataforma de código abierto desarrollado por Microsoft. Permite construir aplicaciones web, APIs REST y aplicaciones en tiempo real. Funciona en Windows, Linux y macOS.

### ¿Qué es Kestrel?

Kestrel es el servidor web interno de ASP.NET Core. Es un servidor multiplataforma basado en libuv que maneja solicitudes HTTP directamente. Para producción suele combinarse con IIS o Nginx como proxy inverso.

### ¿Cuál es la diferencia entre ASP.NET Core y ASP.NET Framework?

ASP.NET Core es multiplataforma, modular y de código abierto. ASP.NET Framework solo funciona en Windows y está en modo mantenimiento. Para proyectos nuevos se recomienda ASP.NET Core.

### ¿Qué estructura tiene un proyecto ASP.NET Core?

```
MiApi/
├── Controllers/     → Controladores de la API
├── Models/          → Modelos de datos
├── Data/            → DbContext y config BD
├── DTOs/            → Objetos de transferencia
├── Services/        → Lógica de negocio
├── Program.cs       → Punto de entrada
└── appsettings.json → Configuración
```

### ¿Qué son las Minimal APIs?

Las Minimal APIs son una forma simplificada de crear APIs con menos archivos y configuración. Todo se define en `Program.cs` usando lambdas:

```csharp
var app = WebApplication.Create(args);
app.MapGet("/productos", () => "Lista de productos");
app.Run();
```

Son ideales para APIs pequeñas o microservicios.

### ¿Cómo se ejecuta una aplicación ASP.NET Core por primera vez?

```bash
dotnet new webapi -n MiApi
cd MiApi
dotnet run
```

Luego abre `http://localhost:5000/swagger` en el navegador.

### ¿Qué archivos debo modificar para configurar la aplicación?

Los principales son:

- `Program.cs`: configura servicios, middleware y endpoints.
- `appsettings.json`: almacena cadenas de conexión y configuraciones.
- `appsettings.Development.json`: configuraciones específicas para desarrollo.
