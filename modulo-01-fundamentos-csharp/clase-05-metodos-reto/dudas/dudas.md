# Dudas — Clase 05: Métodos y Reto Integrador

*Espacio para anotar preguntas, aclaraciones y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿Qué es un método y para qué sirve?

Un método es un bloque de código con nombre que realiza una tarea específica.

En lugar de escribir el mismo código varias veces, se escribe una vez dentro de un método y se llama cuando se necesita.

```csharp
// Sin método: repetimos código
Console.WriteLine("Suma: " + (2 + 3));
Console.WriteLine("Suma: " + (10 + 20));
Console.WriteLine("Suma: " + (100 + 200));

// Con método: escribimos una vez, llamamos muchas
static int Sumar(int a, int b)
{
    return a + b;
}

Console.WriteLine("Suma: " + Sumar(2, 3));
Console.WriteLine("Suma: " + Sumar(10, 20));
Console.WriteLine("Suma: " + Sumar(100, 200));
```

Beneficios:
- **Reutilización:** el método se escribe una vez y se llama muchas veces
- **Organización:** el código queda separado en bloques con nombre
- **Mantenibilidad:** si hay que corregir algo, se cambia en un solo lugar
- **Legibilidad:** el nombre del método explica lo que hace

---

### 1.2 ¿Qué significa `static` y por qué lo usamos?

`static` significa que el método pertenece a la clase, no a un objeto.

Por ahora, todos nuestros métodos son `static` porque `Main` es `static` y un método `static` solo puede llamar a otros métodos `static`.

```csharp
static void Main()
{
    Saludar(); // OK: Main llama a otro static
}

static void Saludar()
{
    Console.WriteLine("Hola");
}
```

Si quitáramos `static` de `Saludar`, el código no compilaría:

```csharp
static void Main()
{
    Saludar(); // Error: no se puede llamar a un método no estático
}

void Saludar() // Sin static
{
    Console.WriteLine("Hola");
}
```

En el módulo 2 (POO) entenderemos mejor `static`. Por ahora, la regla es simple: si `Main` es `static`, los métodos que creemos también serán `static`.

---

### 1.3 ¿Cuál es la diferencia entre parámetro y argumento?

**Parámetro:** la variable que se define en el método.

**Argumento:** el valor que se pasa al llamar al método.

```csharp
// 'nombre' es un parámetro
static void Saludar(string nombre)
{
    Console.WriteLine($"Hola, {nombre}");
}

// "Ana" es un argumento
Saludar("Ana");
```

Los parámetros son como los "huecos" que el método espera. Los argumentos son los valores que llenan esos huecos.

---

### 1.4 ¿Qué diferencia hay entre `void` y un tipo de retorno?

`void` significa que el método no devuelve nada. Solo ejecuta código.

Un tipo de retorno (`int`, `double`, `string`, etc.) significa que el método calcula algo y lo devuelve.

```csharp
// void: hace algo, no devuelve nada
static void MostrarMenu()
{
    Console.WriteLine("1. Sumar");
    Console.WriteLine("2. Restar");
}

// int: hace algo Y devuelve un entero
static int Sumar(int a, int b)
{
    return a + b;
}
```

El `void` no necesita `return`. Un método con retorno necesita `return` y el valor devuelto debe coincidir con el tipo declarado.

---

### 1.5 ¿Puedo tener varios `return` en un método?

Sí. Puedes tener múltiples `return`, pero solo uno se ejecuta.

```csharp
static string ObtenerEstado(double nota)
{
    if (nota >= 6)
        return "Aprobado";
    else if (nota >= 4)
        return "Recuperación";
    else
        return "Reprobado";
}
```

Cuando se ejecuta un `return`, el método termina inmediatamente.

También se puede usar `return` en un método `void` para salir antes:

```csharp
static void SoloPares(int numero)
{
    if (numero % 2 != 0)
        return; // Sale del método aquí

    Console.WriteLine($"{numero} es par");
}
```

---

### 1.6 ¿Qué es la sobrecarga de métodos (overloading)?

Es tener varios métodos con el mismo nombre pero diferentes parámetros.

```csharp
static int Sumar(int a, int b)
{
    return a + b;
}

static double Sumar(double a, double b)
{
    return a + b;
}

static int Sumar(int a, int b, int c)
{
    return a + b + c;
}
```

C# elige la versión correcta según los argumentos que se pasan:

```csharp
Sumar(2, 3);        // Llama a la versión int, int
Sumar(2.5, 3.7);    // Llama a la versión double, double
Sumar(1, 2, 3);     // Llama a la versión int, int, int
```

Para que la sobrecarga funcione, los parámetros deben diferir en:
- Cantidad de parámetros
- Tipo de los parámetros
- O ambas

El nombre del método y el tipo de retorno no cuentan para diferenciar.

---

### 1.7 ¿Qué es el ámbito (scope) de una variable?

El ámbito determina dónde existe una variable.

Una variable declarada dentro de un método solo existe dentro de ese método.

```csharp
static void MetodoA()
{
    int x = 10;
    Console.WriteLine(x); // Funciona
}

static void MetodoB()
{
    Console.WriteLine(x); // Error: x no existe aquí
}
```

Lo mismo aplica dentro de bloques:

```csharp
if (true)
{
    int y = 5;
}
Console.WriteLine(y); // Error: y no existe fuera del if
```

Las variables de ciclo también tienen su propio ámbito:

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
Console.WriteLine(i); // Error: i no existe fuera del for
```

---

### 1.8 ¿Puede un método llamar a otro método?

Sí. De hecho, es algo normal y deseable.

```csharp
static void Main()
{
    double promedio = CalcularPromedio(8.5, 7.0, 9.0);
    string estado = ObtenerEstado(promedio);
    MostrarResultado(estado);
}

static double CalcularPromedio(double n1, double n2, double n3)
{
    return (n1 + n2 + n3) / 3;
}

static string ObtenerEstado(double promedio)
{
    return promedio >= 6 ? "Aprobado" : "Reprobado";
}

static void MostrarResultado(string estado)
{
    Console.WriteLine($"Estado: {estado}");
}
```

Cada método hace una cosa y la pasa al siguiente. Esto se llama **composición** y es una buena práctica.

---

### 1.9 ¿Puede un método llamarse a sí mismo?

Sí. Eso se llama **recursión**.

```csharp
static int Factorial(int n)
{
    if (n <= 1)
        return 1;
    return n * Factorial(n - 1);
}
```

Pero la recursión es un tema avanzado. En este módulo no la usaremos. La mencionamos para que sepas que existe, pero no es necesaria para los ejercicios.

Si un método se llama a sí mismo sin una condición de salida, se produce un desbordamiento de pila (stack overflow) y el programa se cierra.

---

### 1.10 ¿Los métodos tienen un límite de parámetros?

Técnicamente no hay un límite pequeño, pero tener más de 4 o 5 parámetros vuelve el código difícil de leer.

```csharp
// Esto funciona pero es difícil de leer
static void Registrar(string nombre, int edad, string ciudad, string telefono, string email, string ocupacion)
{
}
```

Si un método necesita muchos datos, considera agruparlos. En el módulo 2 veremos cómo hacerlo con clases.

---

### 1.11 ¿Puedo usar el mismo nombre para una variable dentro de un método y otra fuera?

Sí, porque están en ámbitos diferentes.

```csharp
static string mensaje = "Global"; // Variable global (static)

static void Main()
{
    string mensaje = "Local"; // Variable local
    Console.WriteLine(mensaje); // Imprime "Local"
    Console.WriteLine(Program.mensaje); // Imprime "Global"
}
```

La variable local "oculta" a la global dentro del método. Para acceder a la global se usa `NombreClase.NombreVariable`.

Pero por ahora evitaremos variables globales. Todo se pasa por parámetros.

---

## 2. Aplicación en el ejemplo guiado

El ejemplo de la clase es un sistema de notas con métodos:

```csharp
static void Main()
{
    string nombre = PedirTexto("Nombre del estudiante");
    int cantidad = PedirEntero("Cantidad de notas");
    double[] notas = new double[cantidad];

    for (int i = 0; i < cantidad; i++)
        notas[i] = PedirDecimal($"Nota {i + 1}");

    double promedio = CalcularPromedio(notas);
    string estado = ObtenerEstado(promedio);
    MostrarResultado(nombre, promedio, estado);
}
```

El programa está dividido en métodos pequeños:

| Método | Qué hace |
|--------|----------|
| `PedirTexto` | Muestra un mensaje y lee texto |
| `PedirEntero` | Muestra un mensaje y lee un entero |
| `PedirDecimal` | Muestra un mensaje y lee un decimal |
| `CalcularPromedio` | Suma las notas y divide entre la cantidad |
| `ObtenerEstado` | Decide si está aprobado, en recuperación o reprobado |
| `MostrarResultado` | Imprime los resultados |

Cada método tiene una responsabilidad clara. `Main` solo coordina la secuencia.

---

## 3. Tabla de tipos de métodos

| Tipo | Tiene `return` | Devuelve | Ejemplo |
|------|---------------|----------|---------|
| `void` sin parámetros | No | Nada | `static void Saludar() { }` |
| `void` con parámetros | No | Nada | `static void Saludar(string nombre) { }` |
| Con retorno sin parámetros | Sí | Un valor | `static int GenerarNumero() { return 42; }` |
| Con retorno con parámetros | Sí | Un valor | `static int Sumar(int a, int b) { return a + b; }` |

---

## 4. Errores comunes

| Error | Ejemplo incorrecto | Corrección |
|-------|--------------------|------------|
| Olvidar `static` | `void Saludar() { }` dentro de `static Main` | `static void Saludar() { }` |
| Olvidar `return` | `int Sumar(int a, int b) { int r = a + b; }` | `return r;` |
| Tipo de retorno incorrecto | `return "Hola";` en un método `int` | Cambiar tipo o valor |
| Llamar con argumentos incorrectos | `Sumar("hola", 5)` | Pasar argumentos del tipo correcto |
| Confundir parámetro y argumento | Escribir tipo al llamar: `Sumar(int a, int b)` | `Sumar(2, 3)` sin tipos |
| Punto y coma después de la firma | `static void Saludar(); { }` | Quitar el punto y coma |

---

## 5. Resumen de la clase

Los métodos organizan el código en bloques reutilizables.

Estructura:

```csharp
static TipoRetorno NombreMetodo(parametros)
{
    // Cuerpo
    return valor;
}
```

`void` significa que no devuelve nada.

Los parámetros son los datos que recibe el método.

La sobrecarga permite tener múltiples versiones del mismo método con diferentes parámetros.

Las variables solo existen dentro del bloque donde se declaran (ámbito o scope).

El método `Main` es el punto de entrada. Desde ahí se llaman otros métodos.

Dividir el programa en métodos pequeños con nombres claros hace que el código sea más fácil de leer, probar y mantener.
