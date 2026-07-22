# Dudas — Clase 06: Clases, Objetos y Constructores

*Espacio para anotar preguntas, aclaraciones y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿Qué es una clase y qué es un objeto?

**Clase:** es el molde o plano que define la estructura y el comportamiento.

**Objeto:** es una instancia concreta creada a partir de ese molde, con sus propios valores.

```csharp
// Clase: el molde
class Persona
{
    public string nombre;
    public int edad;
}

// Objetos: instancias del molde
Persona p1 = new Persona();
Persona p2 = new Persona();
```

`p1` y `p2` son dos objetos distintos. Cada uno puede tener valores diferentes.

---

### 1.2 ¿Qué hace la palabra `new`?

`new` reserva memoria para el objeto, llama al constructor y devuelve la referencia al objeto creado.

```csharp
Persona persona = new Persona();
```

Sin `new` el objeto no se crea. La variable quedaría sin valor (`null`).

---

### 1.3 ¿Qué es un constructor?

Un constructor es un método especial que se ejecuta automáticamente al crear un objeto con `new`.

Tiene el mismo nombre de la clase y no lleva tipo de retorno. Ni siquiera `void`, porque C# ya sabe que su misión es construir el objeto.

```csharp
class Persona
{
    public string nombre;
    public int edad;

    public Persona(string nombre, int edad)
    {
        this.nombre = nombre;
        this.edad = edad;
    }
}
```

---

### 1.4 ¿Qué significa sobrecarga de constructores?

La sobrecarga de constructores significa que una misma clase puede tener varios constructores, siempre que cada uno reciba una combinación diferente de parámetros.

```csharp
class Persona
{
    public string nombre;
    public int edad;

    public Persona() { }

    public Persona(string nombre)
    {
        this.nombre = nombre;
    }

    public Persona(string nombre, int edad)
    {
        this.nombre = nombre;
        this.edad = edad;
    }
}
```

Se pueden crear objetos de tres maneras distintas:

```csharp
Persona p1 = new Persona();              // Constructor sin parámetros
Persona p2 = new Persona("Carlos");      // Constructor con un string
Persona p3 = new Persona("Laura", 30);   // Constructor con string e int
```

No son tres clases diferentes. Es una sola clase con tres formas de inicializarse.

---

### 1.5 ¿Qué pasa si uso el constructor sin parámetros?

Si no se asignan valores, C# utiliza los valores predeterminados:

```csharp
Persona p1 = new Persona();

// p1.nombre → null
// p1.edad   → 0
```

Valores por defecto según el tipo:

| Tipo | Valor por defecto |
|------|-------------------|
| `string` | `null` |
| `int` | `0` |
| `bool` | `false` |
| `double` | `0.0` |
| `char` | `'\0'` |

Después se pueden asignar manualmente:

```csharp
p1.nombre = "Ana";
p1.edad = 25;
```

---

### 1.6 ¿Cómo sabe C# qué constructor utilizar?

C# observa cuántos argumentos se envían y sus tipos.

```csharp
Persona p1 = new Persona();                  // Usa Persona()
Persona p2 = new Persona("Pedro");           // Usa Persona(string)
Persona p3 = new Persona("Pedro", 28);       // Usa Persona(string, int)
```

Esto produciría un error:

```csharp
Persona p4 = new Persona(28);   // Error: no existe constructor que reciba solo int
```

Para permitirlo, habría que agregar:

```csharp
public Persona(int edad)
{
    this.edad = edad;
}
```

---

### 1.7 ¿Qué significa `this.nombre = nombre`?

Aquí aparecen dos variables con el mismo nombre pero diferentes significados:

```csharp
this.nombre = nombre;
```

`this.nombre` es el **campo** que pertenece al objeto.
`nombre` es el **parámetro** recibido por el constructor.

Se lee así:

> Guarda en el campo `nombre` del objeto el valor recibido en el parámetro `nombre`.

Sin `this`, esta instrucción sería problemática:

```csharp
nombre = nombre;
```

C# entendería que se está asignando el parámetro sobre sí mismo, sin modificar el campo del objeto. Sería como entregarte una caja, pasarla de la mano izquierda a la derecha y declarar que ya organizaste la bodega.

---

### 1.8 ¿Qué significa `static`?

`static` significa que el miembro pertenece directamente a la **clase**, no a cada objeto creado a partir de ella.

Piense en la clase como un plano y en los objetos como casas construidas con ese plano. Sin `static`, cada casa tiene su propia copia del dato. Con `static`, el dato pertenece al plano y es compartido por todas las casas.

```csharp
class Matematica
{
    public static double PI = 3.1416;

    public static int Sumar(int a, int b)
    {
        return a + b;
    }
}

// Uso sin crear objeto
Console.WriteLine(Matematica.PI);
int r = Matematica.Sumar(5, 3);
```

Se accede con `Clase.Miembro`, no con `objeto.Miembro`.

---

### 1.9 ¿Cuál es la diferencia entre un miembro de instancia y uno estático?

**Miembro de instancia:** pertenece a cada objeto. Cada objeto tiene su propia copia.

```csharp
class Persona
{
    public string nombre;
}

Persona p1 = new Persona();
p1.nombre = "Ana";

Persona p2 = new Persona();
p2.nombre = "Carlos";
```

**Miembro estático:** pertenece a la clase. Hay una sola copia compartida.

```csharp
class Persona
{
    public static int cantidadPersonas = 0;

    public Persona()
    {
        cantidadPersonas++;
    }
}

Persona p1 = new Persona();
Persona p2 = new Persona();
Persona p3 = new Persona();

Console.WriteLine(Persona.cantidadPersonas); // 3
```

---

### 1.10 ¿Por qué un método `static` no puede acceder a miembros de instancia?

Supongamos esta clase:

```csharp
class Persona
{
    public string nombre;

    public static void Saludar()
    {
        Console.WriteLine(nombre); // Error
    }
}
```

El problema: `nombre` pertenece a un objeto específico, pero `Saludar` pertenece a la clase. C# no sabe de qué objeto debe tomar el `nombre`.

```csharp
Persona p1 = new Persona(); p1.nombre = "Ana";
Persona p2 = new Persona(); p2.nombre = "Carlos";

Persona.Saludar(); // ¿"Ana" o "Carlos"? No se puede saber.
```

**Solución:** el método no debe ser `static` si necesita datos de instancia:

```csharp
public void Saludar()
{
    Console.WriteLine($"Hola, soy {nombre}");
}
```

O bien, recibir el objeto como parámetro:

```csharp
public static void MostrarNombre(Persona persona)
{
    Console.WriteLine(persona.nombre);
}
```

---

### 1.11 ¿Cuándo usar `static`?

Se usa cuando el comportamiento no depende del estado particular de un objeto.

Ejemplos de la vida real:

```csharp
Math.Sqrt(25);           // No necesito una "matemática" para calcular raíz
Math.Pow(2, 3);          // Ídem
Math.Round(3.14159, 2);  // Ídem
```

Buenos candidatos para `static`:

```csharp
class Conversor
{
    public static double CelsiusAFahrenheit(double celsius)
    {
        return (celsius * 9.0 / 5.0) + 32;
    }
}

double r = Conversor.CelsiusAFahrenheit(25); // No necesito crear un objeto
```

Regla sencilla:

| Sin `static` | Con `static` |
|-------------|--------------|
| `persona.nombre` | `Matematica.PI` |
| `producto.precio` | `Conversor.CelsiusAFahrenheit(25)` |
| `cuenta.saldo` | `Persona.cantidadPersonas` |
| Pertenece a un objeto | Pertenece a la clase |

---

### 1.12 ¿Qué significa `public`?

`public` es un modificador de acceso. Significa que el miembro (campo, método, propiedad) puede ser accedido desde cualquier parte del código.

```csharp
class Persona
{
    public string nombre;  // Accesible desde fuera de la clase
    private int edad;      // Solo accesible dentro de la clase
}
```

Si no se escribe `public`, el miembro es `private` por defecto.

---

### 1.13 ¿Puedo tener campos sin `public`?

Sí. Si un campo no lleva `public`, es `private` por defecto y solo se puede acceder desde dentro de la misma clase.

```csharp
class Persona
{
    string nombre;  // private por defecto
}

// Desde fuera:
Persona p = new Persona();
p.nombre = "Ana"; // Error: nombre es private
```

En el módulo 2.2 veremos encapsulamiento con propiedades (`get`/`set`) para controlar el acceso.

---

### 1.14 ¿Qué pasa si no defino ningún constructor?

C# genera automáticamente un constructor por defecto sin parámetros y sin código.

```csharp
class Persona
{
    public string nombre;
    public int edad;
}

// Equivale a tener:
// public Persona() { }
```

Pero si se define cualquier constructor con parámetros, C# **no genera** el constructor por defecto automáticamente.

```csharp
class Persona
{
    public string nombre;

    public Persona(string nombre)
    {
        this.nombre = nombre;
    }
}

// Esto ya no funciona:
Persona p = new Persona(); // Error: no existe constructor sin parámetros
```

---

### 1.15 ¿Un constructor puede llamar a otro constructor?

Sí, con `this(...)`:

```csharp
class Persona
{
    public string nombre;
    public int edad;

    public Persona() : this("Sin nombre", 0) { }

    public Persona(string nombre, int edad)
    {
        this.nombre = nombre;
        this.edad = edad;
    }
}
```

El constructor sin parámetros delega en el de dos parámetros para evitar repetir código.

---

### 1.16 ¿Cuál es la diferencia entre declarar una clase como `class Libro` y `public class Libro`?

En C#, la diferencia principal radica en el **nivel de accesibilidad (modificador de acceso)** de la clase fuera del proyecto (ensamblado):

- **`class Libro` (Sin modificador explícito):** C# le asigna por defecto el modificador **`internal`**. Significa que la clase solo es accesible dentro del **mismo proyecto** (`.csproj`).
- **`public class Libro`:** La clase es accesible desde **cualquier lugar**, tanto dentro del mismo proyecto como desde otros proyectos o librerías externas que agreguen una referencia a este proyecto.

| Declaración | Equivalente real | ¿Accesible dentro del mismo proyecto? | ¿Accesible desde otros proyectos / librerías? |
| :--- | :--- | :---: | :---: |
| `class Libro` | `internal class Libro` | **Sí** | ❌ No |
| `public class Libro` | `public class Libro` | **Sí** | **Sí** |

*Nota:* Si todos los archivos están en el mismo proyecto (como en las aplicaciones de consola del curso), ambas declaraciones funcionarán de la misma manera.

---

### 1.17 ¿Cuáles son las clases principales que ya vienen por defecto en .NET?

El SDK de .NET incluye la **Base Class Library (BCL)**, una biblioteca con miles de clases ya preparadas y optimizadas para evitar reinventar la rueda:

1. **Entrada / Salida (`System` / `System.IO`):**
   - `Console`: Para interactuar con la terminal (`Console.WriteLine()`, `Console.ReadLine()`).
   - `File` / `Directory`: Para gestionar archivos y carpetas en disco (`File.ReadAllText()`, `File.WriteAllText()`).
2. **Fechas y Matemáticas (`System`):**
   - `DateTime`: Para manipular fechas y horas (`DateTime.Now`).
   - `Math`: Para cálculos y funciones matemáticas (`Math.Sqrt()`, `Math.Pow()`, `Math.Max()`).
   - `Random`: Para generar números aleatorios (`new Random().Next(1, 100)`).
3. **Manejo de Cadenas (`System` / `System.Text`):**
   - `String` (`string`): Para manipular cadenas con métodos como `.ToUpper()`, `.Contains()`, `.Trim()`.
   - `StringBuilder`: Para construir grandes volúmenes de texto eficientemente.
4. **Colecciones Genéricas (`System.Collections.Generic`):**
   - `List<T>`: Listas dinámicas.
   - `Dictionary<TKey, TValue>`: Diccionarios de tipo clave-valor.
5. **Redes y Comunicaciones (`System.Net.Http`):**
   - `HttpClient`: Para realizar peticiones HTTP a APIs y servicios web.
6. **La clase raíz (`System.Object` / `object`):**
   - Absolutamente todas las clases en C# heredan de `Object`, lo que les otorga métodos base como `.ToString()`, `.Equals()` y `.GetType()`.

---

## 2. Aplicación en el ejemplo guiado

El ejemplo de la clase es un sistema de biblioteca:

```csharp
class Libro
{
    public string titulo;
    public string autor;
    public int anio;

    public Libro(string titulo, string autor, int anio)
    {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
    }

    public void MostrarInfo()
    {
        Console.WriteLine($"\"{titulo}\" — {autor} ({anio})");
    }
}

class Biblioteca
{
    static void Main()
    {
        Libro libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967);
        Libro libro2 = new Libro("1984", "George Orwell", 1949);
        Libro libro3 = new Libro("El Principito", "Antoine de Saint-Exupéry", 1943);

        libro1.MostrarInfo();
        libro2.MostrarInfo();
        libro3.MostrarInfo();
    }
}
```

`Libro` es la clase. `libro1`, `libro2` y `libro3` son objetos. Cada libro tiene su propio `titulo`, `autor` y `anio`.

---

## 3. Tabla comparativa: Clase vs Objeto

| Aspecto | Clase | Objeto |
|---------|-------|--------|
| ¿Qué es? | Molde / Plano | Instancia concreta |
| ¿Se usa con `new`? | No | Sí |
| ¿Tiene valores? | Define campos | Tiene valores específicos |
| Ejemplo | `class Persona { }` | `Persona p = new Persona();` |
| Memoria | No ocupa hasta usarse | Ocupa memoria al crearse |

---

## 4. Errores comunes

| Error | Ejemplo incorrecto | Corrección |
|-------|--------------------|------------|
| Olvidar `new` | `Persona p; p.nombre = "Ana"` | `Persona p = new Persona();` |
| Olvidar `this` | `nombre = nombre;` en constructor | `this.nombre = nombre;` |
| Constructor sin parámetros no existe | `new Persona()` cuando hay constructores con params | Agregar constructor sin parámetros o usar uno existente |
| Llamar a método static desde objeto | `matematica.Sumar(2, 3)` | `Matematica.Sumar(2, 3)` |
| Acceder a miembro de instancia desde método static | `Console.WriteLine(nombre)` en método static | Pasar el objeto como parámetro o hacer el método de instancia |
| Olvidar `public` | `string nombre;` (es private por defecto) | `public string nombre;` |
| Punto y coma después de la clase | `class Persona { };` | Solo lleva `;` si la clase está vacía y se define inline |

---

## 5. Resumen de la clase

La **clase** define la estructura (campos) y el comportamiento (métodos).

El **objeto** es una instancia concreta de la clase, creada con `new`.

El **constructor** inicializa el objeto al crearlo. Puede tener parámetros y estar sobrecargado.

`this` hace referencia al objeto actual y sirve para diferenciar campos de parámetros.

`static` hace que un miembro pertenezca a la clase, no a las instancias. Se accede con `Clase.Miembro`. Un método `static` no puede acceder directamente a miembros de instancia.
