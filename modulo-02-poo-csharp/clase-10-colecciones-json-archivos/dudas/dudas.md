# Dudas — Clase 10

*Espacio para anotar preguntas y notas de clase.*

## Preguntas frecuentes

### ¿Cuándo usar List en lugar de array?

Usa `List<T>` cuando necesites agregar o eliminar elementos dinámicamente. Usa arrays cuando la cantidad de elementos sea fija y conozcas el tamaño de antemano. `List<T>` ofrece métodos como `Add`, `Remove`, `Find` que facilitan la manipulación.

### ¿Cómo recorrer un Dictionary?

```csharp
foreach (var kvp in miDiccionario)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
```

Puedes acceder también a las llaves con `dic.Keys` y a los valores con `dic.Values`.

### ¿Cómo guardar y leer JSON en C#?

Usa `System.Text.Json`:

```csharp
// Guardar
string json = JsonSerializer.Serialize(miLista);
File.WriteAllText("datos.json", json);

// Leer
string jsonLeido = File.ReadAllText("datos.json");
var lista = JsonSerializer.Deserialize<List<Persona>>(jsonLeido);
```

### ¿Qué diferencia hay entre File.ReadAllText y StreamReader?

`File.ReadAllText` lee todo el archivo de una vez, ideal para archivos pequeños. `StreamReader` lee línea por línea, útil para archivos grandes porque no carga todo en memoria.

### ¿Cómo capturar errores al trabajar con archivos?

```csharp
try
{
    var contenido = File.ReadAllText("archivo.txt");
}
catch (FileNotFoundException)
{
    Console.WriteLine("El archivo no existe.");
}
catch (IOException ex)
{
    Console.WriteLine($"Error de E/S: {ex.Message}");
}
```

### ¿Por qué mi JSON tiene los nombres de propiedad en mayúscula?

`System.Text.Json` usa por defecto los nombres exactos de la clase. Puedes configurar `PropertyNamingPolicy = JsonNamingPolicy.CamelCase` para nombres en camelCase:

```csharp
var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
```

### ¿Cómo ordenar una List?

```csharp
lista.Sort();                    // Orden ascendente
lista.OrderBy(x => x).ToList();  // LINQ, ascendente
lista.OrderByDescending(x => x).ToList(); // LINQ, descendente
```

### ¿Qué es LINQ y para qué sirve?

LINQ (Language Integrated Query) permite consultar colecciones con sintaxis similar a SQL:

```csharp
var mayores = personas.Where(p => p.Edad >= 18).ToList();
var nombres = personas.Select(p => p.Nombre).ToList();
var primera = personas.FirstOrDefault(p => p.Id == 1);
```
