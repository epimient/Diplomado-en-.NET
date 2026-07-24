# Dudas — Clase 10

## ¿Cuándo usar `List<T>` en lugar de un array?

| Criterio | Array (`T[]`) | `List<T>` |
|----------|--------------|-----------|
| Tamaño | Fijo al crearse | Dinámico (crece/decrece) |
| Agregar elementos | No directamente | `Add()`, `Insert()` |
| Eliminar elementos | No directamente | `Remove()`, `RemoveAt()` |
| Rendimiento | Ligeramente más rápido | Muy similar en la práctica |
| Cuándo usar | Tamaño conocido y fijo | Tamaño variable o desconocido |

```csharp
// ❌ Array: incómodo si no sabes cuántos elementos habrá
string[] nombres = new string[3]; // ¿Y si necesito 4?

// ✅ List: crece dinámicamente
List<string> nombres = new List<string>();
nombres.Add("Ana");
nombres.Add("Luis");
nombres.Add("Carlos");
nombres.Add("María"); // Sin problema
```

> **Regla práctica**: si no sabes el tamaño de antemano, usa `List<T>`.

---

## ¿Cómo recorrer un `Dictionary`?

Hay varias formas:

```csharp
var edades = new Dictionary<string, int>
{
    { "Ana", 25 },
    { "Luis", 30 },
    { "Carlos", 22 }
};

// Forma 1: KeyValuePair (más explícita)
foreach (KeyValuePair<string, int> kvp in edades)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value} años");
}

// Forma 2: var (más concisa, mismo resultado)
foreach (var kvp in edades)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value} años");
}

// Forma 3: solo las llaves
foreach (string nombre in edades.Keys)
{
    Console.WriteLine(nombre);
}

// Forma 4: solo los valores
foreach (int edad in edades.Values)
{
    Console.WriteLine(edad);
}
```

---

## ¿Qué pasa si busco una llave que no existe en el Dictionary?

Si usas el indexador directo, lanza `KeyNotFoundException`:

```csharp
var productos = new Dictionary<string, double>
{
    { "Laptop", 999.99 },
    { "Mouse", 25.50 }
};

// ❌ PELIGROSO: lanza excepción si no existe
double precio = productos["Teclado"]; // KeyNotFoundException

// ✅ Opción 1: verificar con ContainsKey
if (productos.ContainsKey("Teclado"))
{
    double precio = productos["Teclado"];
}

// ✅ Opción 2: TryGetValue (más eficiente, una sola búsqueda)
if (productos.TryGetValue("Teclado", out double precio))
{
    Console.WriteLine($"Precio: {precio}");
}
else
{
    Console.WriteLine("Producto no encontrado");
}
```

> **Preferir siempre `TryGetValue`** sobre `ContainsKey` + indexador. Evita buscar dos veces.

---

## ¿Cómo guardar y leer JSON en C#?

Usa `System.Text.Json` (incluido en .NET, no necesita paquete extra):

```csharp
using System.Text.Json;

// === GUARDAR (Serializar) ===
var contactos = new List<Contacto>
{
    new Contacto { Nombre = "Ana", Telefono = "555-1234" },
    new Contacto { Nombre = "Luis", Telefono = "555-5678" }
};

var options = new JsonSerializerOptions { WriteIndented = true };
string json = JsonSerializer.Serialize(contactos, options);
File.WriteAllText("contactos.json", json);

// === LEER (Deserializar) ===
string jsonLeido = File.ReadAllText("contactos.json");
var lista = JsonSerializer.Deserialize<List<Contacto>>(jsonLeido);

foreach (var c in lista)
{
    Console.WriteLine($"{c.Nombre} - {c.Telefono}");
}
```

El archivo generado se ve así:

```json
[
  {
    "Nombre": "Ana",
    "Telefono": "555-1234"
  },
  {
    "Nombre": "Luis",
    "Telefono": "555-5678"
  }
]
```

---

## ¿Por qué mi JSON tiene los nombres de propiedad en mayúscula?

`System.Text.Json` usa por defecto los **nombres exactos** de las propiedades en C# (PascalCase). Para usar camelCase:

```csharp
var options = new JsonSerializerOptions
{
    WriteIndented = true,
    PropertyNamingPolicy = JsonNamingPolicy.CamelCase
};

string json = JsonSerializer.Serialize(contacto, options);
```

| Sin configurar | Con CamelCase |
|---------------|--------------|
| `"Nombre": "Ana"` | `"nombre": "Ana"` |
| `"Telefono": "555"` | `"telefono": "555"` |

Para APIs REST se recomienda camelCase. Para archivos internos de tu app, PascalCase está bien.

---

## ¿Qué diferencia hay entre `File.ReadAllText` y `StreamReader`?

| Método | Cómo funciona | Cuándo usar |
|--------|--------------|-------------|
| `File.ReadAllText` | Lee **todo** el archivo de una vez | Archivos pequeños (< 1 MB) |
| `File.ReadAllLines` | Lee todo y devuelve `string[]` | Archivos pequeños, procesar línea por línea |
| `StreamReader` | Lee **línea por línea** bajo demanda | Archivos grandes (no carga todo en memoria) |

```csharp
// Opción 1: todo de una vez (simple, para archivos pequeños)
string contenido = File.ReadAllText("datos.txt");

// Opción 2: todas las líneas como array
string[] lineas = File.ReadAllLines("datos.txt");
foreach (string linea in lineas)
{
    Console.WriteLine(linea);
}

// Opción 3: StreamReader (para archivos grandes)
using (StreamReader sr = new StreamReader("datos.txt"))
{
    string? linea;
    while ((linea = sr.ReadLine()) != null)
    {
        Console.WriteLine(linea);
    }
}
```

> Para los ejercicios de este curso, `File.ReadAllText` y `File.WriteAllText` son suficientes.

---

## ¿Cómo verificar si un archivo existe antes de leerlo?

Usa `File.Exists()` para evitar `FileNotFoundException`:

```csharp
string ruta = "contactos.json";

if (File.Exists(ruta))
{
    string json = File.ReadAllText(ruta);
    var contactos = JsonSerializer.Deserialize<List<Contacto>>(json);
    Console.WriteLine($"Se cargaron {contactos.Count} contactos");
}
else
{
    Console.WriteLine("No hay archivo, se inicia con lista vacía");
    var contactos = new List<Contacto>();
}
```

Patrón común para apps con persistencia JSON:

```csharp
// Cargar al inicio
List<Contacto> contactos;

if (File.Exists("contactos.json"))
{
    string json = File.ReadAllText("contactos.json");
    contactos = JsonSerializer.Deserialize<List<Contacto>>(json) ?? new List<Contacto>();
}
else
{
    contactos = new List<Contacto>();
}
```

> El `?? new List<Contacto>()` protege contra un archivo vacío o con `null`.

---

## ¿Cómo capturar errores al trabajar con archivos?

Envuelve las operaciones de archivo en `try-catch` con excepciones específicas:

```csharp
try
{
    string json = File.ReadAllText("datos.json");
    var lista = JsonSerializer.Deserialize<List<Contacto>>(json);
}
catch (FileNotFoundException)
{
    Console.WriteLine("El archivo no existe.");
}
catch (JsonException ex)
{
    Console.WriteLine($"El JSON está mal formado: {ex.Message}");
}
catch (IOException ex)
{
    Console.WriteLine($"Error al leer el archivo: {ex.Message}");
}
```

### Orden de los catch

Los `catch` deben ir de **más específico a más general**:

```csharp
// ✅ Correcto: específico primero
catch (FileNotFoundException) { }   // Más específico
catch (IOException) { }              // Más general (FileNotFoundException hereda de IOException)
catch (Exception) { }                // El más general

// ❌ ERROR de compilación: general antes de específico
catch (IOException) { }
catch (FileNotFoundException) { }    // Inalcanzable
```

---

## ¿Cómo ordenar una `List<T>`?

### Lista de tipos simples

```csharp
var numeros = new List<int> { 5, 2, 8, 1, 9 };
numeros.Sort();          // [1, 2, 5, 8, 9]

var nombres = new List<string> { "Carlos", "Ana", "Beto" };
nombres.Sort();          // ["Ana", "Beto", "Carlos"]
```

### Lista de objetos personalizados

```csharp
var contactos = new List<Contacto>
{
    new Contacto { Nombre = "Carlos", Edad = 30 },
    new Contacto { Nombre = "Ana", Edad = 25 },
    new Contacto { Nombre = "Beto", Edad = 28 }
};

// Ordenar por nombre
contactos.Sort((a, b) => a.Nombre.CompareTo(b.Nombre));

// Ordenar por edad descendente
contactos.Sort((a, b) => b.Edad.CompareTo(a.Edad));
```

### Con LINQ (no modifica la lista original)

```csharp
var ordenados = contactos.OrderBy(c => c.Nombre).ToList();
var descendente = contactos.OrderByDescending(c => c.Edad).ToList();
```

> `Sort()` modifica la lista original. LINQ crea una nueva lista.

---

## ¿Qué es LINQ y para qué sirve?

LINQ (Language Integrated Query) permite consultar colecciones con una sintaxis similar a SQL. Los métodos más usados:

```csharp
var personas = new List<Persona>
{
    new Persona { Nombre = "Ana", Edad = 25 },
    new Persona { Nombre = "Luis", Edad = 17 },
    new Persona { Nombre = "Carlos", Edad = 30 },
    new Persona { Nombre = "María", Edad = 15 }
};

// Filtrar
var mayores = personas.Where(p => p.Edad >= 18).ToList();
// [Ana(25), Carlos(30)]

// Proyectar (solo nombres)
var nombres = personas.Select(p => p.Nombre).ToList();
// ["Ana", "Luis", "Carlos", "María"]

// Buscar uno
var primero = personas.FirstOrDefault(p => p.Nombre == "Luis");
// Luis(17), o null si no existe

// Contar
int cantidad = personas.Count(p => p.Edad >= 18);
// 2

// Verificar si alguno cumple
bool hayMenores = personas.Any(p => p.Edad < 18);
// true

// Verificar si todos cumplen
bool todosMayores = personas.All(p => p.Edad >= 18);
// false
```

> LINQ requiere `using System.Linq;` (incluido por defecto en .NET 6+).

---

## ¿Qué es `using` en el contexto de archivos?

`using` asegura que los recursos se liberen automáticamente al terminar, incluso si hay una excepción:

```csharp
// ✅ Con using: se cierra automáticamente
using (StreamWriter sw = new StreamWriter("log.txt"))
{
    sw.WriteLine("Operación exitosa");
} // Se cierra aquí automáticamente

// ✅ Versión simplificada (C# 8+)
using StreamWriter sw = new StreamWriter("log.txt");
sw.WriteLine("Operación exitosa");
// Se cierra al terminar el scope del método
```

Para `File.ReadAllText` y `File.WriteAllText` **no necesitas `using`** porque estas funciones abren y cierran el archivo internamente.

`using` es necesario cuando usas `StreamReader`, `StreamWriter` u otros recursos que implementan `IDisposable`.

---

## ¿`Dictionary` o `List` de objetos?

| Escenario | Usar |
|-----------|------|
| Buscar por identificador único (ID, código, nombre) | `Dictionary<TKey, TValue>` |
| Recorrer todos los elementos en orden | `List<T>` |
| Acceso rápido por llave O(1) | `Dictionary<TKey, TValue>` |
| Mantener orden de inserción | `List<T>` |
| Relaciones clave-valor naturales | `Dictionary<TKey, TValue>` |

```csharp
// ✅ Dictionary: cuando necesitas buscar por clave
var estudiantes = new Dictionary<string, Estudiante>
{
    { "E001", new Estudiante { Nombre = "Ana" } },
    { "E002", new Estudiante { Nombre = "Luis" } }
};
var ana = estudiantes["E001"]; // Acceso directo, O(1)

// ✅ List: cuando recorres y no necesitas buscar por clave
var tareas = new List<Tarea>();
tareas.Add(new Tarea { Titulo = "Estudiar C#" });
foreach (var t in tareas) { Console.WriteLine(t.Titulo); }
```

---

## ¿Puedo deserializar JSON con propiedades que no existen en mi clase?

Sí, por defecto `System.Text.Json` **ignora** las propiedades del JSON que no tienen correspondencia en la clase:

```csharp
// JSON tiene "Direccion" pero la clase no
string json = """
{
    "Nombre": "Ana",
    "Edad": 25,
    "Direccion": "Calle Falsa 123"
}
""";

class Persona
{
    public string Nombre { get; set; }
    public int Edad { get; set; }
    // No tiene Direccion → se ignora sin error
}

var persona = JsonSerializer.Deserialize<Persona>(json);
// persona.Nombre = "Ana", persona.Edad = 25
```

Y si tu clase tiene propiedades que no están en el JSON, se inicializan con su valor por defecto (`null`, `0`, `false`).

---

## Resumen rápido

- `List<T>` para colecciones de tamaño variable; array para tamaño fijo
- `Dictionary<TKey, TValue>` para búsqueda rápida por clave
- `TryGetValue` en lugar de indexador directo para evitar excepciones
- `System.Text.Json` para serializar/deserializar objetos a JSON
- `File.ReadAllText` / `File.WriteAllText` para archivos pequeños
- `File.Exists()` antes de leer para evitar `FileNotFoundException`
- `try-catch` con excepciones específicas (de más específica a más general)
- `Sort()` modifica la lista; LINQ (`OrderBy`) crea una nueva
- `using` para liberar recursos de `StreamReader`/`StreamWriter`
- LINQ: `Where`, `Select`, `FirstOrDefault`, `Any`, `All`, `Count`
