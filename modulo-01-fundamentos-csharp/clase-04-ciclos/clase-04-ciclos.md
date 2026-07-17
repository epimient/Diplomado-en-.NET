# Clase 04 — Ciclos (bucles) en C#

## Propósito de la clase

Hasta este momento hemos creado programas que ejecutan sus instrucciones una sola vez y utilizan condicionales para tomar decisiones. Sin embargo, muchos problemas requieren repetir una misma acción: mostrar varios números, solicitar datos hasta que sean válidos, recorrer una lista de estudiantes o mantener un menú activo hasta que el usuario decida salir.

Los **ciclos**, también llamados **bucles**, permiten repetir un bloque de código de manera controlada. En lugar de copiar la misma instrucción muchas veces, indicamos qué debe repetirse, bajo qué condición y cuándo debe finalizar.

En esta clase estudiaremos los ciclos `for`, `while`, `do while` y `foreach`, además de las instrucciones `break` y `continue`. También aprenderemos a utilizar contadores y acumuladores, validar entradas y reconocer errores frecuentes como los ciclos infinitos.

---

## Objetivos de aprendizaje

Al finalizar esta clase, el estudiante estará en capacidad de:

- Explicar qué es un ciclo y qué significa una iteración.
- Repetir bloques de código utilizando `for`, `while` y `do while`.
- Recorrer arreglos y otras colecciones utilizando `foreach`.
- Utilizar contadores y acumuladores para procesar información.
- Controlar la ejecución de un ciclo mediante `break` y `continue`.
- Construir validaciones y menús repetitivos.
- Identificar ciclos infinitos y errores en los límites de una repetición.
- Elegir el ciclo adecuado de acuerdo con las características del problema.

---

## 1. ¿Por qué necesitamos ciclos?

Supongamos que necesitamos mostrar un mensaje para cinco estudiantes. Una primera solución podría ser la siguiente:

```csharp
Console.WriteLine("Bienvenido, estudiante 1");
Console.WriteLine("Bienvenido, estudiante 2");
Console.WriteLine("Bienvenido, estudiante 3");
Console.WriteLine("Bienvenido, estudiante 4");
Console.WriteLine("Bienvenido, estudiante 5");
```

El programa funciona, pero presenta varios problemas:

- La misma instrucción está escrita varias veces.
- Si fueran cien estudiantes, necesitaríamos cien instrucciones.
- Si cambia el mensaje, tendríamos que modificar cada línea.
- El código se vuelve extenso y difícil de mantener.

Podemos expresar la misma solución mediante un ciclo:

```csharp
for (int estudiante = 1; estudiante <= 5; estudiante++)
{
    Console.WriteLine($"Bienvenido, estudiante {estudiante}");
}
```

En este caso, la instrucción `Console.WriteLine()` está escrita una sola vez, pero se ejecuta cinco veces. El ciclo cambia automáticamente el valor de la variable `estudiante` en cada repetición.

Un ciclo permite decirle al programa:

> Repite estas instrucciones mientras se cumpla una determinada condición.

---

## 2. Conceptos fundamentales

Antes de estudiar cada tipo de ciclo, necesitamos comprender algunos términos.

### Ciclo o bucle

Es una estructura de control que permite repetir un bloque de instrucciones.

### Iteración

Es cada una de las veces que se ejecuta el bloque del ciclo. Si un ciclo repite un mensaje cinco veces, entonces realiza cinco iteraciones.

### Variable de control

Es una variable que ayuda a controlar el avance del ciclo. Normalmente se utiliza para contar las iteraciones.

### Condición

Es una expresión que produce `true` o `false`. El ciclo continúa mientras la condición establecida permita otra repetición.

### Actualización

Es el cambio aplicado a la variable de control. Puede ser un incremento, un decremento u otra modificación.

Observemos estos componentes en un ciclo `for`:

```csharp
for (int i = 1; i <= 3; i++)
{
    Console.WriteLine(i);
}
```

| Componente | Código | Función |
|---|---|---|
| Inicialización | `int i = 1` | Crea la variable de control y establece su valor inicial. |
| Condición | `i <= 3` | Determina si el ciclo puede ejecutar otra iteración. |
| Actualización | `i++` | Aumenta el valor de `i` al terminar cada iteración. |
| Cuerpo | `Console.WriteLine(i);` | Contiene las instrucciones que se repiten. |

### Seguimiento paso a paso

| Momento | Valor de `i` | Resultado de `i <= 3` | Acción |
|---|---:|---|---|
| Primera comprobación | 1 | `true` | Imprime `1`. |
| Segunda comprobación | 2 | `true` | Imprime `2`. |
| Tercera comprobación | 3 | `true` | Imprime `3`. |
| Comprobación final | 4 | `false` | El ciclo termina. |

La salida es:

```text
1
2
3
```

Cuando la condición se vuelve falsa, el programa continúa con la primera instrucción ubicada después del ciclo.

---

## 3. Ciclo `for`

El ciclo `for` se utiliza principalmente cuando conocemos de antemano cuántas veces debe repetirse una acción.

### Estructura general

```csharp
for (inicializacion; condicion; actualizacion)
{
    // Instrucciones que se repetirán
}
```

Las tres expresiones se escriben dentro de los paréntesis y se separan mediante punto y coma.

### Ejemplo 1: contar desde cero

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"Iteración {i}");
}
```

La salida es:

```text
Iteración 0
Iteración 1
Iteración 2
Iteración 3
Iteración 4
```

Aunque el último valor mostrado es `4`, el ciclo realiza cinco iteraciones: una para cada valor comprendido entre `0` y `4`.

### Ejemplo 2: contar desde uno

```csharp
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Iteración {i}");
}
```

La salida es:

```text
Iteración 1
Iteración 2
Iteración 3
Iteración 4
Iteración 5
```

Los dos ejemplos realizan cinco iteraciones. La diferencia está en los valores utilizados:

```csharp
// Cinco valores: 0, 1, 2, 3 y 4
for (int i = 0; i < 5; i++)

// Cinco valores: 1, 2, 3, 4 y 5
for (int i = 1; i <= 5; i++)
```

Cuando trabajamos con posiciones de arreglos, normalmente comenzamos en cero. Cuando trabajamos con cantidades que se presentan al usuario, puede resultar más natural comenzar en uno.

### Ejemplo 3: cuenta regresiva

La variable de control no siempre tiene que aumentar. También puede disminuir:

```csharp
for (int i = 5; i >= 1; i--)
{
    Console.WriteLine(i);
}

Console.WriteLine("¡Despegue!");
```

La salida es:

```text
5
4
3
2
1
¡Despegue!
```

En este ejemplo se utiliza `i--`, que disminuye el valor de la variable en una unidad.

### Ejemplo 4: mostrar números pares

```csharp
for (int numero = 2; numero <= 20; numero += 2)
{
    Console.WriteLine(numero);
}
```

La expresión `numero += 2` aumenta el valor de dos en dos. La salida será:

```text
2
4
6
8
10
12
14
16
18
20
```

Otra solución consiste en recorrer todos los números y utilizar una condición:

```csharp
for (int numero = 1; numero <= 20; numero++)
{
    if (numero % 2 == 0)
    {
        Console.WriteLine(numero);
    }
}
```

La expresión `numero % 2 == 0` comprueba que el residuo de dividir el número entre dos sea cero.

### Ejemplo 5: tabla de multiplicar

```csharp
Console.Write("Ingrese un número: ");
int numero = Convert.ToInt32(Console.ReadLine());

for (int multiplicador = 1; multiplicador <= 10; multiplicador++)
{
    int resultado = numero * multiplicador;

    Console.WriteLine(
        $"{numero} x {multiplicador} = {resultado}"
    );
}
```

Si el usuario ingresa `5`, el programa mostrará:

```text
5 x 1 = 5
5 x 2 = 10
5 x 3 = 15
5 x 4 = 20
5 x 5 = 25
5 x 6 = 30
5 x 7 = 35
5 x 8 = 40
5 x 9 = 45
5 x 10 = 50
```

### Recorrer un arreglo con `for`

Un arreglo almacena varios valores del mismo tipo. Cada elemento se encuentra en una posición y la primera posición es `0`.

```csharp
int[] numeros = { 10, 20, 30, 40, 50 };

for (int i = 0; i < numeros.Length; i++)
{
    Console.WriteLine(numeros[i]);
}
```

La propiedad `Length` indica la cantidad de elementos del arreglo. En este caso:

```csharp
numeros.Length // Su valor es 5
```

Sin embargo, las posiciones disponibles son:

```text
0, 1, 2, 3 y 4
```

Por eso se utiliza:

```csharp
i < numeros.Length
```

y no:

```csharp
i <= numeros.Length
```

Si intentamos acceder a `numeros[5]`, el programa producirá un error porque esa posición no existe.

---

## 4. Contadores y acumuladores

Los ciclos suelen utilizarse para contar elementos o acumular resultados. Aunque ambas operaciones emplean variables, no cumplen la misma función.

### Contador

Un contador registra cuántas veces ocurre algo. Generalmente aumenta o disminuye en una cantidad fija.

```csharp
int cantidadPares = 0;

for (int numero = 1; numero <= 10; numero++)
{
    if (numero % 2 == 0)
    {
        cantidadPares++;
    }
}

Console.WriteLine($"Cantidad de números pares: {cantidadPares}");
```

Cada vez que se encuentra un número par, `cantidadPares` aumenta en uno.

### Acumulador

Un acumulador conserva un resultado que se construye progresivamente. La cantidad que se agrega puede cambiar en cada iteración.

```csharp
int suma = 0;

for (int numero = 1; numero <= 5; numero++)
{
    suma += numero;
}

Console.WriteLine($"Suma total: {suma}");
```

La variable `suma` cambia así:

| Iteración | `numero` | Operación | Nuevo valor de `suma` |
|---|---:|---|---:|
| 1 | 1 | `0 + 1` | 1 |
| 2 | 2 | `1 + 2` | 3 |
| 3 | 3 | `3 + 3` | 6 |
| 4 | 4 | `6 + 4` | 10 |
| 5 | 5 | `10 + 5` | 15 |

### Ejemplo: promedio de calificaciones

```csharp
double sumaNotas = 0;
int cantidadNotas = 5;

for (int i = 1; i <= cantidadNotas; i++)
{
    Console.Write($"Ingrese la nota {i}: ");
    double nota = Convert.ToDouble(Console.ReadLine());

    sumaNotas += nota;
}

double promedio = sumaNotas / cantidadNotas;

Console.WriteLine($"Suma de las notas: {sumaNotas:F2}");
Console.WriteLine($"Promedio: {promedio:F2}");
```

En este programa:

- `i` controla las iteraciones.
- `cantidadNotas` establece cuántas notas se solicitarán.
- `sumaNotas` acumula los valores ingresados.
- `promedio` se calcula después de finalizar el ciclo.
- `F2` muestra el resultado con dos cifras decimales.

---

## 5. Ciclo `while`

El ciclo `while` repite un bloque de instrucciones **mientras una condición sea verdadera**. Es especialmente útil cuando no conocemos cuántas repeticiones serán necesarias.

### Estructura general

```csharp
while (condicion)
{
    // Instrucciones que se repetirán
}
```

La condición se comprueba antes de cada iteración. Si es falsa desde el principio, el cuerpo del ciclo no se ejecutará ninguna vez.

### Ejemplo 1: contador

```csharp
int contador = 0;

while (contador < 5)
{
    Console.WriteLine($"Contador: {contador}");
    contador++;
}
```

Aunque conocemos el número de repeticiones y un `for` sería más directo, este ejemplo permite observar que en un `while` debemos escribir separadamente:

1. La inicialización de la variable.
2. La condición del ciclo.
3. La actualización de la variable.

```csharp
int contador = 0;      // Inicialización

while (contador < 5)  // Condición
{
    Console.WriteLine(contador);
    contador++;        // Actualización
}
```

### Ejemplo 2: repetir hasta que el usuario escriba `salir`

```csharp
string entrada = "";

while (entrada != "salir")
{
    Console.Write("Escriba algo o 'salir' para terminar: ");
    entrada = Console.ReadLine()?.ToLower() ?? "";

    if (entrada != "salir")
    {
        Console.WriteLine($"Escribió: {entrada}");
    }
}

Console.WriteLine("Programa finalizado.");
```

El método `ToLower()` convierte la entrada a minúsculas. De esa manera, entradas como `SALIR`, `Salir` y `salir` se procesan de la misma forma.

### Ejemplo 3: contraseña con máximo de intentos

```csharp
const string CLAVE_CORRECTA = "csharp123";
string clave = "";
int intentos = 0;
const int MAXIMO_INTENTOS = 3;

while (clave != CLAVE_CORRECTA && intentos < MAXIMO_INTENTOS)
{
    Console.Write("Ingrese la contraseña: ");
    clave = Console.ReadLine() ?? "";

    intentos++;

    if (clave != CLAVE_CORRECTA)
    {
        int restantes = MAXIMO_INTENTOS - intentos;
        Console.WriteLine($"Contraseña incorrecta. Intentos restantes: {restantes}");
    }
}

if (clave == CLAVE_CORRECTA)
{
    Console.WriteLine("Acceso permitido.");
}
else
{
    Console.WriteLine("Acceso bloqueado.");
}
```

Este ciclo puede finalizar por dos razones:

- El usuario escribe la contraseña correcta.
- El usuario consume los tres intentos disponibles.

La condición combina ambas reglas mediante el operador lógico `&&`:

```csharp
clave != CLAVE_CORRECTA && intentos < MAXIMO_INTENTOS
```

El ciclo continúa únicamente cuando la clave es incorrecta **y** todavía quedan intentos.

### ¿Cuándo utilizar `while`?

Es una buena elección cuando:

- No conocemos el número exacto de iteraciones.
- La repetición depende de una entrada del usuario.
- Esperamos que cambie una condición externa.
- Necesitamos repetir una acción hasta alcanzar un resultado.
- El bloque puede ejecutarse cero o más veces.

---

## 6. Ciclos infinitos

Un ciclo infinito ocurre cuando su condición nunca se vuelve falsa.

Observemos el siguiente código:

```csharp
int contador = 1;

while (contador <= 5)
{
    Console.WriteLine(contador);
}
```

La variable `contador` comienza en `1`, pero nunca cambia. Como `1 <= 5` siempre es verdadero, el ciclo continúa indefinidamente.

La corrección consiste en actualizar la variable:

```csharp
int contador = 1;

while (contador <= 5)
{
    Console.WriteLine(contador);
    contador++;
}
```

Un ciclo infinito también puede aparecer cuando la actualización se realiza en la dirección equivocada:

```csharp
int contador = 1;

while (contador <= 5)
{
    Console.WriteLine(contador);
    contador--;
}
```

En cada iteración, `contador` se aleja más del valor necesario para que la condición sea falsa.

Antes de ejecutar un ciclo conviene responder:

1. ¿Cuál es el valor inicial?
2. ¿Qué condición mantiene activo el ciclo?
3. ¿Qué instrucción modifica esa condición?
4. ¿En qué momento la condición será falsa?

En una aplicación de consola podemos interrumpir manualmente un ciclo infinito con `Ctrl + C`, aunque la solución correcta consiste en arreglar la lógica. Apagar el computador también funciona, del mismo modo que una motosierra sirve para abrir una lata: resuelve algo, pero no es precisamente ingeniería.

---

## 7. Ciclo `do while`

El ciclo `do while` es parecido a `while`, pero evalúa la condición después de ejecutar el bloque. Por esta razón, garantiza al menos una iteración.

### Estructura general

```csharp
do
{
    // Instrucciones que se repetirán
}
while (condicion);
```

Es importante escribir el punto y coma después del paréntesis final:

```csharp
while (condicion);
```

### Ejemplo 1: solicitar un número positivo

```csharp
int numero;

do
{
    Console.Write("Ingrese un número positivo: ");
    numero = Convert.ToInt32(Console.ReadLine());
}
while (numero <= 0);

Console.WriteLine($"Número válido: {numero}");
```

El programa debe solicitar el número al menos una vez. Después de leerlo, comprueba si debe repetir la pregunta.

### Comparación entre `while` y `do while`

```csharp
int numero = 10;

while (numero < 5)
{
    Console.WriteLine("Dentro del while");
}
```

Este bloque no se ejecuta porque la condición es falsa desde el inicio.

```csharp
int numero = 10;

do
{
    Console.WriteLine("Dentro del do while");
}
while (numero < 5);
```

Este bloque se ejecuta una vez. La condición se comprueba después de la primera ejecución.

### Ejemplo 2: menú repetitivo

```csharp
int opcion;

do
{
    Console.WriteLine("\n=== MENÚ PRINCIPAL ===");
    Console.WriteLine("1. Mostrar saludo");
    Console.WriteLine("2. Mostrar fecha actual");
    Console.WriteLine("3. Salir");

    Console.Write("Seleccione una opción: ");
    opcion = Convert.ToInt32(Console.ReadLine());

    switch (opcion)
    {
        case 1:
            Console.WriteLine("Hola, bienvenido al programa.");
            break;

        case 2:
            Console.WriteLine($"Fecha actual: {DateTime.Now:d}");
            break;

        case 3:
            Console.WriteLine("Programa finalizado.");
            break;

        default:
            Console.WriteLine("Opción no válida.");
            break;
    }
}
while (opcion != 3);
```

Este es uno de los patrones más comunes en programas de consola:

```text
Mostrar menú → Leer opción → Procesar opción → Repetir
```

El menú debe mostrarse al menos una vez, por lo cual `do while` resulta especialmente adecuado.

### ¿Cuándo utilizar `do while`?

Conviene utilizarlo cuando:

- El bloque debe ejecutarse al menos una vez.
- Se construye un menú repetitivo.
- Primero necesitamos solicitar un dato y después validarlo.
- La condición depende de un valor obtenido dentro del propio ciclo.

---

## 8. Validación de entradas con `TryParse`

Los ejemplos anteriores utilizan `Convert.ToInt32()` para concentrarse en la lógica de los ciclos. Sin embargo, si el usuario escribe un texto que no puede convertirse en número, el programa termina con una excepción.

Por ejemplo, esta entrada produce un error:

```text
Ingrese un número: Batman
```

El método `int.TryParse()` intenta realizar la conversión sin cerrar el programa. Devuelve:

- `true` si la conversión fue posible.
- `false` si la entrada no representa un número entero.

### Ejemplo básico

```csharp
Console.Write("Ingrese un número entero: ");
string entrada = Console.ReadLine() ?? "";

bool conversionExitosa = int.TryParse(entrada, out int numero);

if (conversionExitosa)
{
    Console.WriteLine($"Número ingresado: {numero}");
}
else
{
    Console.WriteLine("La entrada no es un número entero.");
}
```

La palabra `out` permite que `TryParse()` guarde en `numero` el valor convertido.

### Validar hasta recibir un número positivo

```csharp
int numero;
bool entradaValida;

do
{
    Console.Write("Ingrese un número entero positivo: ");
    string entrada = Console.ReadLine() ?? "";

    entradaValida = int.TryParse(entrada, out numero);

    if (!entradaValida)
    {
        Console.WriteLine("Error: debe ingresar un número entero.");
    }
    else if (numero <= 0)
    {
        Console.WriteLine("Error: el número debe ser mayor que cero.");
    }
}
while (!entradaValida || numero <= 0);

Console.WriteLine($"Número válido: {numero}");
```

La repetición continúa cuando ocurre al menos uno de estos problemas:

```csharp
!entradaValida || numero <= 0
```

- La entrada no se puede convertir.
- El número es menor o igual que cero.

### Validar una opción de menú

```csharp
int opcion;
bool opcionValida;

do
{
    Console.WriteLine("1. Jugar");
    Console.WriteLine("2. Configuración");
    Console.WriteLine("3. Salir");
    Console.Write("Seleccione una opción: ");

    opcionValida = int.TryParse(
        Console.ReadLine(),
        out opcion
    );

    if (!opcionValida || opcion < 1 || opcion > 3)
    {
        Console.WriteLine("Opción no válida. Intente nuevamente.\n");
    }
}
while (!opcionValida || opcion < 1 || opcion > 3);

Console.WriteLine($"Opción seleccionada: {opcion}");
```

Una validación completa comprueba tanto el tipo de dato como el rango permitido.

---

## 9. Ciclo `foreach`

El ciclo `foreach` permite recorrer todos los elementos de una colección sin controlar manualmente una posición.

### Estructura general

```csharp
foreach (tipo elemento in coleccion)
{
    // Instrucciones que utilizan el elemento
}
```

### Ejemplo 1: recorrer nombres

```csharp
string[] nombres = { "Ana", "Carlos", "María" };

foreach (string nombre in nombres)
{
    Console.WriteLine($"Hola, {nombre}.");
}
```

En cada iteración, la variable `nombre` recibe uno de los valores del arreglo:

| Iteración | Valor de `nombre` |
|---|---|
| 1 | `"Ana"` |
| 2 | `"Carlos"` |
| 3 | `"María"` |

No necesitamos crear un índice, establecer una condición ni actualizar una variable. `foreach` recorre automáticamente todos los elementos.

### Ejemplo 2: sumar valores

```csharp
double[] notas = { 4.5, 3.8, 2.9, 4.1 };
double suma = 0;

foreach (double nota in notas)
{
    suma += nota;
}

double promedio = suma / notas.Length;

Console.WriteLine($"Promedio: {promedio:F2}");
```

### Ejemplo 3: contar aprobados y reprobados

```csharp
double[] notas = { 4.5, 2.7, 3.2, 1.8, 4.0 };
int aprobados = 0;
int reprobados = 0;

foreach (double nota in notas)
{
    if (nota >= 3.0)
    {
        aprobados++;
    }
    else
    {
        reprobados++;
    }
}

Console.WriteLine($"Aprobados: {aprobados}");
Console.WriteLine($"Reprobados: {reprobados}");
```

### Diferencia entre `for` y `foreach`

| `for` | `foreach` |
|---|---|
| Permite controlar un índice. | Recorre directamente los elementos. |
| Puede avanzar, retroceder o saltar posiciones. | Avanza automáticamente de un elemento al siguiente. |
| Es útil cuando importa la posición. | Es útil cuando solamente importa el valor. |
| Permite modificar elementos mediante su índice. | Se utiliza principalmente para leer o procesar cada elemento. |

Cuando necesitamos mostrar la posición, `for` suele ser más conveniente:

```csharp
string[] nombres = { "Ana", "Carlos", "María" };

for (int i = 0; i < nombres.Length; i++)
{
    Console.WriteLine($"{i + 1}. {nombres[i]}");
}
```

Cuando solo necesitamos procesar todos los valores, `foreach` suele expresar mejor la intención:

```csharp
foreach (string nombre in nombres)
{
    Console.WriteLine(nombre);
}
```

---

## 10. Control del ciclo con `break` y `continue`

Además de la condición principal, C# proporciona instrucciones para modificar el comportamiento de un ciclo.

### `break`: terminar el ciclo

La instrucción `break` finaliza inmediatamente el ciclo que la contiene. El programa continúa después del bloque del ciclo.

```csharp
for (int i = 0; i < 10; i++)
{
    if (i == 5)
    {
        break;
    }

    Console.WriteLine(i);
}
```

La salida es:

```text
0
1
2
3
4
```

Cuando `i` vale `5`, se ejecuta `break`. El número `5` no se imprime y no se realizan más iteraciones.

### Ejemplo: buscar un elemento

```csharp
int[] numeros = { 8, 15, 22, 31, 45 };
int numeroBuscado = 22;
bool encontrado = false;

foreach (int numero in numeros)
{
    if (numero == numeroBuscado)
    {
        encontrado = true;
        break;
    }
}

if (encontrado)
{
    Console.WriteLine("Número encontrado.");
}
else
{
    Console.WriteLine("Número no encontrado.");
}
```

Una vez encontrado el número, no es necesario continuar recorriendo el arreglo.

### `continue`: saltar la iteración actual

La instrucción `continue` interrumpe solamente la iteración actual y pasa a la siguiente.

```csharp
for (int i = 0; i < 10; i++)
{
    if (i % 2 == 0)
    {
        continue;
    }

    Console.WriteLine(i);
}
```

La salida es:

```text
1
3
5
7
9
```

Cuando el número es par, `continue` evita que se ejecute `Console.WriteLine(i)` y comienza la siguiente iteración.

### Ejemplo: ignorar valores negativos

```csharp
int[] numeros = { 5, -2, 8, -7, 10 };
int suma = 0;

foreach (int numero in numeros)
{
    if (numero < 0)
    {
        continue;
    }

    suma += numero;
}

Console.WriteLine($"Suma de positivos: {suma}");
```

### Diferencia entre `break` y `continue`

| Instrucción | Efecto |
|---|---|
| `break` | Termina completamente el ciclo. |
| `continue` | Omite el resto de la iteración actual y continúa con la siguiente. |

---

## 11. Ciclos anidados

Un ciclo anidado es un ciclo ubicado dentro de otro. Por cada iteración del ciclo externo, el ciclo interno realiza todas sus iteraciones.

```csharp
for (int fila = 1; fila <= 3; fila++)
{
    for (int columna = 1; columna <= 3; columna++)
    {
        Console.Write($"{fila},{columna} ");
    }

    Console.WriteLine();
}
```

La salida es:

```text
1,1 1,2 1,3
2,1 2,2 2,3
3,1 3,2 3,3
```

El ciclo externo controla las filas y el ciclo interno controla las columnas.

### Seguimiento de las iteraciones

| `fila` | Valores que toma `columna` |
|---:|---|
| 1 | 1, 2, 3 |
| 2 | 1, 2, 3 |
| 3 | 1, 2, 3 |

El ciclo externo realiza tres iteraciones y, en cada una, el ciclo interno realiza otras tres. Por tanto, la instrucción interior se ejecuta nueve veces.

### Ejemplo: cuadrado de asteriscos

```csharp
for (int fila = 1; fila <= 4; fila++)
{
    for (int columna = 1; columna <= 4; columna++)
    {
        Console.Write("* ");
    }

    Console.WriteLine();
}
```

Salida:

```text
* * * *
* * * *
* * * *
* * * *
```

### Ejemplo: tablas de multiplicar del 1 al 3

```csharp
for (int tabla = 1; tabla <= 3; tabla++)
{
    Console.WriteLine($"\nTabla del {tabla}");

    for (int multiplicador = 1; multiplicador <= 10; multiplicador++)
    {
        Console.WriteLine(
            $"{tabla} x {multiplicador} = {tabla * multiplicador}"
        );
    }
}
```

Los ciclos anidados son útiles para trabajar con:

- Filas y columnas.
- Tablas y matrices.
- Coordenadas.
- Combinaciones de valores.
- Patrones de caracteres.

Debemos utilizarlos con cuidado porque la cantidad de operaciones aumenta rápidamente. Dos ciclos de mil iteraciones pueden ejecutar el bloque interno un millón de veces. Thanos estaría orgulloso; el procesador, no tanto.

---

## 12. ¿Cuál ciclo debemos utilizar?

La elección depende de lo que conocemos antes de iniciar la repetición.

| Ciclo | Cuándo utilizarlo | Ejemplo típico |
|---|---|---|
| `for` | Conocemos la cantidad de iteraciones o necesitamos controlar una posición. | Solicitar cinco notas. |
| `while` | Repetimos mientras se cumpla una condición y el bloque puede no ejecutarse. | Intentar iniciar sesión mientras queden intentos. |
| `do while` | Necesitamos ejecutar el bloque al menos una vez. | Mostrar un menú hasta seleccionar salir. |
| `foreach` | Necesitamos recorrer todos los elementos de una colección. | Mostrar los nombres de un arreglo. |

### Preguntas para elegir correctamente

Antes de escribir el ciclo podemos preguntarnos:

1. ¿Conozco exactamente cuántas veces se repetirá la acción?
   - Sí: probablemente `for`.
2. ¿La repetición depende de que una condición continúe siendo verdadera?
   - Sí: probablemente `while`.
3. ¿El bloque debe ejecutarse por lo menos una vez?
   - Sí: probablemente `do while`.
4. ¿Necesito procesar todos los elementos de una colección sin utilizar sus posiciones?
   - Sí: probablemente `foreach`.

Estas recomendaciones no son prohibiciones absolutas. En muchos casos es posible resolver el mismo problema con diferentes ciclos, pero algunas opciones expresan mejor la intención del programa.

---

## 13. Errores frecuentes

### Error 1: olvidar actualizar la variable

```csharp
int contador = 1;

while (contador <= 5)
{
    Console.WriteLine(contador);
}
```

El ciclo es infinito porque `contador` nunca cambia.

### Error 2: actualizar en la dirección equivocada

```csharp
for (int i = 1; i <= 10; i--)
{
    Console.WriteLine(i);
}
```

La condición espera que `i` supere `10`, pero la variable está disminuyendo.

### Error 3: utilizar una condición que es falsa desde el inicio

```csharp
for (int i = 1; i >= 10; i++)
{
    Console.WriteLine(i);
}
```

El ciclo no se ejecuta porque `1 >= 10` es falso.

### Error 4: exceder los límites de un arreglo

```csharp
string[] nombres = { "Ana", "Carlos", "María" };

for (int i = 0; i <= nombres.Length; i++)
{
    Console.WriteLine(nombres[i]);
}
```

La condición correcta es:

```csharp
i < nombres.Length
```

La última posición válida de un arreglo es `Length - 1`.

### Error 5: colocar un punto y coma después de `for` o `while`

```csharp
for (int i = 1; i <= 5; i++);
{
    Console.WriteLine("Hola");
}
```

El punto y coma termina la instrucción `for`. El bloque posterior ya no pertenece al ciclo y se ejecuta una sola vez.

En `do while`, en cambio, el punto y coma final sí es obligatorio:

```csharp
do
{
    // Código
}
while (condicion);
```

### Error 6: modificar accidentalmente la variable de control

```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
    i++;
}
```

La variable aumenta dos veces: una dentro del cuerpo y otra en la actualización del `for`. El resultado puede omitir valores.

### Error 7: no validar la entrada del usuario

```csharp
int numero = Convert.ToInt32(Console.ReadLine());
```

Si el usuario escribe texto, el programa termina con una excepción. Cuando la entrada no es confiable, resulta preferible utilizar `TryParse`.

### Error 8: confundir `break` de `switch` con `break` de un ciclo

En un `switch`, `break` termina el caso actual:

```csharp
switch (opcion)
{
    case 1:
        Console.WriteLine("Opción 1");
        break;
}
```

En un ciclo, `break` termina la repetición:

```csharp
while (true)
{
    break;
}
```

El significado general es parecido —salir de la estructura actual—, pero la estructura afectada depende del lugar donde se utiliza.

---

## 14. Ejemplo guiado: sistema de registro de notas

Construiremos un programa que mantenga un menú activo y permita registrar notas, consultar el promedio y mostrar la cantidad de notas ingresadas.

### Requisitos

El programa debe:

1. Mostrar un menú con cuatro opciones.
2. Repetir el menú hasta seleccionar `Salir`.
3. Permitir registrar notas entre `0` y `5`.
4. Rechazar entradas no numéricas.
5. Acumular las notas registradas.
6. Contar cuántas notas se han ingresado.
7. Calcular el promedio sin dividir entre cero.

### Solución completa

```csharp
int opcion = 0;
double sumaNotas = 0;
int cantidadNotas = 0;

do
{
    Console.WriteLine("\n=========================");
    Console.WriteLine("   REGISTRO DE NOTAS");
    Console.WriteLine("=========================");
    Console.WriteLine("1. Registrar nota");
    Console.WriteLine("2. Mostrar promedio");
    Console.WriteLine("3. Mostrar cantidad de notas");
    Console.WriteLine("4. Salir");
    Console.Write("Seleccione una opción: ");

    bool opcionValida = int.TryParse(
        Console.ReadLine(),
        out opcion
    );

    if (!opcionValida)
    {
        Console.WriteLine("Debe ingresar una opción numérica.");
        continue;
    }

    switch (opcion)
    {
        case 1:
            Console.Write("Ingrese una nota entre 0 y 5: ");

            bool notaValida = double.TryParse(
                Console.ReadLine(),
                out double nota
            );

            if (!notaValida || nota < 0 || nota > 5)
            {
                Console.WriteLine(
                    "La nota debe ser un número entre 0 y 5."
                );

                continue;
            }

            sumaNotas += nota;
            cantidadNotas++;

            Console.WriteLine("Nota registrada correctamente.");
            break;

        case 2:
            if (cantidadNotas == 0)
            {
                Console.WriteLine(
                    "Todavía no hay notas registradas."
                );
            }
            else
            {
                double promedio = sumaNotas / cantidadNotas;

                Console.WriteLine(
                    $"Promedio actual: {promedio:F2}"
                );
            }

            break;

        case 3:
            Console.WriteLine(
                $"Notas registradas: {cantidadNotas}"
            );
            break;

        case 4:
            Console.WriteLine("Programa finalizado.");
            break;

        default:
            Console.WriteLine("Opción fuera del rango permitido.");
            break;
    }
}
while (opcion != 4);
```

### Análisis del programa

#### Control del menú

```csharp
do
{
    // Menú y operaciones
}
while (opcion != 4);
```

El menú se muestra al menos una vez y se repite mientras la opción sea diferente de `4`.

#### Acumulador

```csharp
sumaNotas += nota;
```

Cada nueva nota se agrega al total anterior.

#### Contador

```csharp
cantidadNotas++;
```

Cada vez que se registra una nota válida, la cantidad aumenta en uno.

#### Validación del menú

```csharp
if (!opcionValida)
{
    Console.WriteLine("Debe ingresar una opción numérica.");
    continue;
}
```

Si la entrada no es numérica, `continue` evita ejecutar el `switch` y comienza una nueva iteración del menú.

#### Validación de la nota

```csharp
if (!notaValida || nota < 0 || nota > 5)
```

La nota se rechaza si no es numérica, si es menor que cero o si es mayor que cinco.

#### Protección contra división entre cero

```csharp
if (cantidadNotas == 0)
{
    Console.WriteLine("Todavía no hay notas registradas.");
}
```

El promedio solamente se calcula cuando existe al menos una nota.

---

## 15. Ejercicios de práctica

### Ejercicio 1 — Tabla de multiplicar

Solicite un número entero y muestre su tabla de multiplicar desde `1` hasta `10`.

#### Entrada esperada

```text
Ingrese un número: 7
```

#### Salida esperada

```text
7 x 1 = 7
7 x 2 = 14
7 x 3 = 21
...
7 x 10 = 70
```

#### Requisitos

- Utilizar un ciclo `for`.
- Validar que la entrada sea un número entero.
- No escribir manualmente las diez multiplicaciones.

### Ejercicio 2 — Suma desde 1 hasta N

Solicite un número positivo `N` y calcule la suma de todos los números desde `1` hasta `N`.

Si el usuario ingresa `5`, el programa debe calcular:

```text
1 + 2 + 3 + 4 + 5 = 15
```

#### Requisitos

- Utilizar un acumulador.
- Utilizar un ciclo `for`.
- Validar que `N` sea positivo.

### Ejercicio 3 — Contraseña con tres intentos

Solicite una contraseña y permita un máximo de tres intentos.

#### Requisitos

- Utilizar `while`.
- Mostrar cuántos intentos quedan.
- Finalizar inmediatamente si la contraseña es correcta.
- Mostrar `Acceso bloqueado` si se consumen todos los intentos.

### Ejercicio 4 — Menú de conversión

Construya el siguiente menú:

```text
1. Metros a kilómetros
2. Kilómetros a metros
3. Celsius a Fahrenheit
4. Fahrenheit a Celsius
5. Salir
```

#### Requisitos

- Utilizar `do while` para repetir el menú.
- Utilizar `switch` para procesar la opción.
- Validar la opción ingresada.
- Finalizar solamente cuando el usuario seleccione `5`.

### Ejercicio 5 — Análisis de calificaciones

Dado el siguiente arreglo:

```csharp
double[] notas = { 4.5, 2.8, 3.7, 1.9, 4.2, 3.0 };
```

Calcule y muestre:

- La suma de las notas.
- El promedio.
- La cantidad de aprobados.
- La cantidad de reprobados.
- La nota mayor.
- La nota menor.

#### Requisitos

- Utilizar `foreach`.
- Considerar aprobada una nota mayor o igual que `3.0`.
- Utilizar contadores y acumuladores.

### Ejercicio 6 — Patrón de asteriscos

Solicite el tamaño de un cuadrado y muestre el patrón mediante ciclos anidados.

Para un tamaño de `4`:

```text
* * * *
* * * *
* * * *
* * * *
```

#### Requisitos

- Utilizar dos ciclos `for`.
- El ciclo externo debe controlar las filas.
- El ciclo interno debe controlar las columnas.

---

## 16. Reto de la clase — Cajero automático básico

Construya un programa de consola con el siguiente menú:

```text
1. Consultar saldo
2. Depositar dinero
3. Retirar dinero
4. Mostrar cantidad de operaciones
5. Salir
```

El saldo inicial será de `$500000`.

### Reglas

- El menú debe repetirse hasta seleccionar `Salir`.
- No se pueden depositar valores menores o iguales que cero.
- No se puede retirar un valor menor o igual que cero.
- No se puede retirar más dinero del disponible.
- El saldo debe actualizarse después de cada operación válida.
- Debe contarse cada depósito y retiro realizado correctamente.
- Las entradas no numéricas no deben cerrar el programa.

### Conceptos que debe integrar

- `do while`.
- `switch`.
- Condicionales.
- Contador.
- Acumulación y actualización de valores.
- Validación con `TryParse`.
- `continue` cuando la entrada sea inválida.

---

## 17. Preguntas de comprobación

1. ¿Qué es una iteración?
2. ¿Cuáles son las tres partes principales de un ciclo `for`?
3. ¿Cuál es la diferencia entre `i < 5` e `i <= 5`?
4. ¿Cuándo resulta más apropiado utilizar `while`?
5. ¿Cuál es la diferencia entre `while` y `do while`?
6. ¿Por qué `do while` es apropiado para construir menús?
7. ¿Qué puede provocar un ciclo infinito?
8. ¿Cuál es la diferencia entre un contador y un acumulador?
9. ¿Para qué se utiliza `foreach`?
10. ¿Cuál es la diferencia entre `break` y `continue`?
11. ¿Por qué las posiciones de un arreglo llegan hasta `Length - 1`?
12. ¿Qué ventaja ofrece `TryParse` frente a `Convert.ToInt32()`?

### Analice el siguiente código

¿Qué imprime este programa?

```csharp
for (int i = 1; i <= 5; i++)
{
    if (i == 3)
    {
        continue;
    }

    Console.WriteLine(i);
}
```

Respuesta:

```text
1
2
4
5
```

El valor `3` no se imprime porque `continue` salta el resto de esa iteración.

### Encuentre el error

```csharp
int numero = 1;

while (numero <= 10)
{
    Console.WriteLine(numero);
    numero--;
}
```

El ciclo es infinito porque la variable disminuye y nunca llegará a ser mayor que `10`. La actualización correcta para contar hacia arriba sería:

```csharp
numero++;
```

---

## 18. Resumen de sintaxis

```csharp
// for: cantidad conocida de iteraciones
for (int i = 0; i < 10; i++)
{
    // Código que se repite
}

// while: condición evaluada antes de cada iteración
while (condicion)
{
    // Código que se repite
}

// do while: condición evaluada después de cada iteración
// El bloque se ejecuta como mínimo una vez
do
{
    // Código que se repite
}
while (condicion);

// foreach: recorrer todos los elementos de una colección
foreach (var elemento in coleccion)
{
    // Procesar el elemento
}

// break: terminar completamente el ciclo
// continue: saltar a la siguiente iteración
```

---

## Conclusión

Los ciclos permiten resolver problemas que requieren repetición sin duplicar innecesariamente el código. La elección del ciclo depende de la información disponible y de la forma en que debe finalizar la repetición:

- `for` permite controlar una cantidad conocida de iteraciones.
- `while` repite mientras una condición sea verdadera.
- `do while` garantiza al menos una ejecución.
- `foreach` recorre los elementos de una colección.
- `break` termina un ciclo.
- `continue` omite una iteración.

Más importante que memorizar la sintaxis es aprender a reconocer cuatro elementos: el estado inicial, la condición, la actualización y el momento de finalización. Cuando esos elementos están claros, el ciclo deja de ser una caja negra y se convierte en una herramienta predecible para construir programas más completos.

En la siguiente etapa utilizaremos **métodos** para dividir estos programas en pequeñas operaciones reutilizables, evitando que toda la lógica quede concentrada dentro de `Main`.
