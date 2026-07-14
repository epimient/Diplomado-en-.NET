# Ejemplo Guiado — Modelado y Base de Datos

## Pasos

```bash
dotnet new console -n BibliotecaModelo
cd BibliotecaModelo
dotnet add package Microsoft.EntityFrameworkCore.Sqlite
dotnet add package Microsoft.EntityFrameworkCore.Design
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Conceptos aplicados

- Clases de modelo: `Autor`, `Libro`, `Prestamo`
- Relaciones: uno a muchos (`Autor → Libros`, `Libro → Prestamos`)
- DbContext con tres DbSet
- `EnsureCreated` para generar el esquema
- Incluir datos relacionados con `Include`
