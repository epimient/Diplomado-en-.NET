# Dudas — Clase 04: Ciclos (Bucles)

*Espacio para anotar preguntas, aclaraciones y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿Cuál es la diferencia entre `for`, `while` y `do while`?

Los tres repiten código, pero se usan en situaciones distintas.

| Ciclo | Cuándo usar | Evalúa condición | Se ejecuta al menos una vez |
|-------|-------------|------------------|----------------------------|
| `for` | Sé exactamente cuántas veces | Al inicio | No |
| `while` | No sé cuántas veces, depende de una condición | Al inicio | No |
| `do while` | Necesito que se ejecute al menos una vez | Al final | Sí |

Ejemplo con `for` (sabemos que son 5):

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
```

Ejemplo con `while` (no sabemos cuándo dejará de llover):

```csharp
string respuesta = "si";

while (respuesta == "si")
{
    Console.Write("¿Quieres continuar? (si/no): ");
    respuesta = Console.ReadLine();
}
```

Ejemplo con `do while` (el menú debe mostrarse al menos una vez):

```csharp
string opcion;
do
{
    Console.WriteLine("1. Jugar");
    Console.WriteLine("2. Salir");
    opcion = Console.ReadLine();
} while (opcion != "2");
```

---

### 1.2 ¿Qué pasa si la condición del `while` nunca se cumple?

Si la condición es `false` desde el inicio, el bloque no se ejecuta nunca.

```csharp
int x = 10;

while (x < 5)
{
    Console.WriteLine("Esto nunca se imprime");
}
```

No hay error. Simplemente el ciclo no hace nada.

En `do while` eso no puede pasar, porque la condición se evalúa al final:

```csharp
int x = 10;

do
{
    Console.WriteLine("Esto se imprime una vez");
} while (x < 5);
```

---

### 1.3 ¿Qué es un ciclo infinito y cómo evitarlo?

Un ciclo infinito ocurre cuando la condición nunca se vuelve `false`.

```csharp
int i = 0;

while (i < 10)
{
    Console.WriteLine("i nunca aumenta");
}
```

Aquí `i` siempre es 0, la condición siempre es `true` y el ciclo no termina.

Para evitarlo, asegúrate de que algo cambie dentro del ciclo:

```csharp
int i = 0;

while (i < 10)
{
    Console.WriteLine(i);
    i++; // Esto es crucial
}
```

También se puede crear un ciclo infinito intencional:

```csharp
while (true)
{
    Console.Write("Escribe 'salir' para terminar: ");
    string entrada = Console.ReadLine();
    if (entrada == "salir")
        break;
}
```

El `break` es la única salida.

---

### 1.4 ¿`for` siempre usa `i++`?

No. La tercera parte del `for` puede ser cualquier expresión.

```csharp
for (int i = 0; i < 10; i += 2)     // Pares: 0, 2, 4, 6, 8
for (int i = 10; i > 0; i--)        // Decreciente: 10, 9, 8...
for (int i = 1; i <= 100; i *= 2)   // Potencias de 2: 1, 2, 4, 8...
```

Incluso puede estar vacía:

```csharp
int i = 0;
for (; i < 5;)
{
    i++;
}
```

Pero esto es raro y se lee mejor como `while`.

---

### 1.5 ¿Cuál es la diferencia entre `break` y `continue`?

`break` termina el ciclo por completo.

`continue` salta el resto de la iteración actual y pasa a la siguiente.

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 3)
        break;   // Termina: se imprime 0, 1, 2
    Console.WriteLine(i);
}
```

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 3)
        continue; // Salta: se imprime 0, 1, 2, 4, 5, 6, 7, 8, 9
    Console.WriteLine(i);
}
```

`break` y `continue` también funcionan en `while` y `do while`.

---

### 1.6 ¿Dentro de un `foreach` puedo modificar la colección?

No. Si intentas agregar o quitar elementos mientras recorres la colección con `foreach`, C# lanza un error.

```csharp
int[] numeros = { 1, 2, 3, 4, 5 };

foreach (int num in numeros)
{
    // numeros[0] = 10;  // Esto no se puede hacer
}
```

Si necesitas modificar la colección mientras la recorres, usa `for` con índice.

---

### 1.7 ¿`foreach` puede usarse con cualquier tipo de dato?

`foreach` funciona con cualquier colección que implemente `IEnumerable`.

Esto incluye:

```csharp
int[] enteros = { 1, 2, 3 };
string[] textos = { "a", "b", "c" };
double[] decimales = { 1.5, 2.5, 3.5 };
char[] letras = { 'a', 'b', 'c' };
```

```csharp
foreach (int num in enteros) { }
foreach (string texto in textos) { }
foreach (double dec in decimales) { }
foreach (char letra in letras) { }
```

También funciona con `List<T>`, `Dictionary<TKey, TValue>` y otras colecciones que veremos en módulos posteriores.

---

### 1.8 ¿Cómo funcionan los ciclos anidados?

Un ciclo dentro de otro. El ciclo interno se ejecuta completo por cada iteración del ciclo externo.

```csharp
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.Write($"({i},{j}) ");
    }
    Console.WriteLine();
}
```

Salida:

```text
(1,1) (1,2) (1,3)
(2,1) (2,2) (2,3)
(3,1) (3,2) (3,3)
```

Por cada valor de `i`, el ciclo de `j` se ejecuta completo (3 veces).

Es como si el ciclo externo fuera las filas y el interno las columnas.

---

### 1.9 ¿Un error común con `for` es empezar en 1 en lugar de 0?

Sí, sobre todo al recorrer arreglos.

```csharp
int[] numeros = { 10, 20, 30 };

for (int i = 1; i <= numeros.Length; i++)  // Error: empieza en 1
{
    Console.WriteLine(numeros[i]); // numeros[3] no existe
}
```

La corrección es empezar en 0 y usar `<` en lugar de `<=`:

```csharp
for (int i = 0; i < numeros.Length; i++)
{
    Console.WriteLine(numeros[i]); // numeros[0], numeros[1], numeros[2]
}
```

---

### 1.10 ¿Se puede tener un ciclo sin llaves `{}`?

Sí, si el bloque tiene una sola instrucción.

```csharp
for (int i = 0; i < 5; i++)
    Console.WriteLine(i);
```

Pero igual que con `if`, es recomendable usar llaves siempre. Si después agregas otra línea, solo la primera se repetirá.

---

## 2. Aplicación en el ejemplo guiado

El ejemplo de la clase es un menú interactivo con `while` y `switch`:

```csharp
string opcion = "";

while (opcion != "4")
{
    Console.WriteLine("\n1. Saludar");
    Console.WriteLine("2. Contar del 1 al 10");
    Console.WriteLine("3. Tabla de multiplicar");
    Console.WriteLine("4. Salir");
    opcion = Console.ReadLine();

    switch (opcion)
    {
        case "1":
            Console.Write("¿Cómo te llamas? ");
            string nombre = Console.ReadLine();
            Console.WriteLine($"¡Hola, {nombre}!");
            break;
        case "2":
            for (int i = 1; i <= 10; i++)
                Console.Write($"{i} ");
            Console.WriteLine();
            break;
        case "3":
            Console.Write("¿Qué tabla quieres ver? ");
            int num = Convert.ToInt32(Console.ReadLine());
            for (int i = 1; i <= 10; i++)
                Console.WriteLine($"{num} x {i} = {num * i}");
            break;
        case "4":
            Console.WriteLine("¡Hasta luego!");
            break;
        default:
            Console.WriteLine("Opción no válida.");
            break;
    }
}
```

El `while` mantiene el menú activo hasta que el usuario elige "4".

Dentro de los casos se usan `for` para contar y generar tablas.

El caso "2" usa `for` para imprimir números del 1 al 10.

El caso "3" usa `for` para generar la tabla de multiplicar del número ingresado.

---

## 3. Tabla comparativa de ciclos

| Característica | `for` | `while` | `do while` | `foreach` |
|----------------|-------|---------|------------|-----------|
| Condición evaluada | Al inicio | Al inicio | Al final | Interna |
| Se ejecuta 0 veces si condición falsa | Sí | Sí | No | N/A |
| Variable de control automática | Sí | No | No | Sí |
| Útil para arreglos | Sí | Sí | Sí | Muy útil |
| Riesgo de infinito | Bajo | Medio | Medio | Ninguno |
| Sintaxis | Compacta | Flexible | Flexible | Simple |

---

## 4. Errores comunes

| Error | Ejemplo incorrecto | Corrección |
|-------|--------------------|------------|
| Ciclo infinito | `while (true)` sin `break` | Agregar condición de salida o `break` |
| Empezar for en 1 | `for (int i = 1; i <= n; i++)` al recorrer arreglo | `for (int i = 0; i < n; i++)` |
| Olvidar incremento | `while (x < 10) { Console.WriteLine(x); }` | `while (x < 10) { Console.WriteLine(x); x++; }` |
| Punto y coma después del `for` | `for (int i = 0; i < 5; i++);` | Quitar el punto y coma |
| Modificar colección en `foreach` | Agregar/eliminar dentro del `foreach` | Usar `for` si necesitas modificar |

---

## 5. Resumen de la clase

Los ciclos permiten repetir bloques de código.

`for` se usa cuando se conoce el número exacto de repeticiones:

```csharp
for (int i = 0; i < 10; i++) { }
```

`while` se usa mientras una condición sea verdadera:

```csharp
while (condicion) { }
```

`do while` garantiza al menos una ejecución:

```csharp
do { } while (condicion);
```

`foreach` recorre colecciones sin índice:

```csharp
foreach (var item in coleccion) { }
```

`break` sale del ciclo. `continue` salta a la siguiente iteración.

Los ciclos anidados tienen un ciclo dentro de otro. El interno se ejecuta completo por cada iteración del externo.
