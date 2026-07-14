# Clase 04 — Ciclos (Bucles)

## Objetivos

- Repetir bloques de código con `for`, `while`, `do while`
- Recorrer colecciones con `foreach`
- Controlar la ejecución con `break` y `continue`
- Elegir el ciclo adecuado para cada situación

---

## 1. Ciclo `for`

Se usa cuando **sabemos cuántas veces** queremos repetir.

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Iteración {i}");
}
```

Estructura:

```
for (inicialización; condición; incremento)
{
    // código a repetir
}
```

| Parte | Descripción |
|-------|-------------|
| `int i = 0;` | Variable de control (se ejecuta una vez al inicio) |
| `i < 5;` | Condición que se evalúa antes de cada iteración |
| `i++` | Incremento que se ejecuta al final de cada iteración |

### Recorrer un arreglo

```csharp
int[] numeros = { 10, 20, 30, 40, 50 };

for (int i = 0; i < numeros.Length; i++)
{
    Console.WriteLine(numeros[i]);
}
```

---

## 2. Ciclo `while`

Se repite **mientras** una condición sea `true`. Se usa cuando **no sabemos** cuántas veces se repetirá.

```csharp
int contador = 0;

while (contador < 5)
{
    Console.WriteLine($"Contador: {contador}");
    contador++;
}
```

> La condición se evalúa **antes** de ejecutar el bloque. Si es `false` desde el inicio, el bloque no se ejecuta nunca.

### Ejemplo: leer hasta que el usuario ingrese "salir"

```csharp
string entrada = "";

while (entrada != "salir")
{
    Console.Write("Escribe algo (o 'salir' para terminar): ");
    entrada = Console.ReadLine();
    Console.WriteLine($"Escribiste: {entrada}");
}
```

---

## 3. Ciclo `do while`

Similar a `while`, pero la condición se evalúa **después** de ejecutar el bloque, garantizando **al menos una ejecución**.

```csharp
int numero;

do
{
    Console.Write("Ingresa un número positivo: ");
    numero = Convert.ToInt32(Console.ReadLine());
} while (numero <= 0);

Console.WriteLine($"Número válido: {numero}");
```

> Útil para menús y validaciones donde necesitamos que el bloque se ejecute al menos una vez.

---

## 4. `break` y `continue`

### `break` — Salir del ciclo

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5)
        break;  // termina el ciclo cuando i es 5

    Console.WriteLine(i);
}
// Output: 0 1 2 3 4
```

### `continue` — Saltar a la siguiente iteración

```csharp
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
        continue;  // salta los pares

    Console.WriteLine(i);
}
// Output: 1 3 5 7 9
```

---

## 5. Ciclo `foreach`

Ideal para recorrer colecciones sin necesidad de índice.

```csharp
string[] nombres = { "Ana", "Carlos", "María" };

foreach (string nombre in nombres)
{
    Console.WriteLine($"Hola, {nombre}!");
}
```

> No necesita condición de fin ni variable de índice. Recorre todos los elementos automáticamente.

---

## 6. Ciclos anidados

Un ciclo dentro de otro ciclo.

```csharp
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.Write($"{i},{j} ");
    }
    Console.WriteLine();
}
// Output:
// 1,1 1,2 1,3
// 2,1 2,2 2,3
// 3,1 3,2 3,3
```

---

## 7. ¿Cuál usar?

| Ciclo | Cuándo usarlo |
|-------|---------------|
| `for` | Cuando sé exactamente cuántas iteraciones |
| `while` | Cuando repito mientras se cumpla una condición |
| `do while` | Cuando necesito que se ejecute al menos una vez |
| `foreach` | Cuando recorro los elementos de una colección |

---

## Resumen

```csharp
// for — número fijo de iteraciones
for (int i = 0; i < 10; i++) { }

// while — condición al inicio
while (condicion) { }

// do while — condición al final (mínimo 1 ejecución)
do { } while (condicion);

// foreach — recorrer colecciones
foreach (var item in coleccion) { }

// break — salir del ciclo
// continue — saltar a la siguiente iteración
```
