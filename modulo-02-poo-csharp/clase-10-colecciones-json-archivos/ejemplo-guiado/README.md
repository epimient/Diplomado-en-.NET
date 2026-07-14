# Ejemplo Guiado — Agenda de Contactos con Colecciones y JSON

## Pasos

```bash
dotnet new console -n AgendaContactos
cd AgendaContactos
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Conceptos aplicados

- Clase `Contacto` con propiedades auto-implementadas
- Clase `AgendaContactos` que encapsula una `List<Contacto>`
- CRUD: agregar, listar, buscar
- Persistencia con `System.Text.Json` (serializar / deserializar)
- Archivo JSON como almacenamiento local
- Menú interactivo por consola
