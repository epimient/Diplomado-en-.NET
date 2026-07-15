# Dudas — Clase 02: Operador ternario y formato numérico en C#

*Espacio para anotar preguntas, aclaraciones y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿Qué es el operador ternario?

El operador ternario es una forma corta de escribir una condición sencilla en C#.

Su estructura general es:

```csharp
condicion ? valorSiEsVerdadero : valorSiEsFalso;
```

Se llama **ternario** porque está formado por tres partes:

1. Una condición.
2. Un valor que se utiliza si la condición es verdadera.
3. Un valor que se utiliza si la condición es falsa.

Ejemplo:

```csharp
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";
```

Esta línea se puede leer así:

> Si el promedio es mayor o igual a 6, el estado será “Aprobado”; de lo contrario, será “Reprobado”.

---

### 1.2 ¿Qué significa cada símbolo del operador ternario?

En el siguiente ejemplo:

```csharp
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";
```

La condición es:

```csharp
promedio >= 6
```

El signo de interrogación `?` separa la condición del valor que se utilizará cuando sea verdadera:

```csharp
? "Aprobado"
```

Los dos puntos `:` separan el resultado verdadero del resultado falso:

```csharp
: "Reprobado"
```

Por tanto, la estructura se puede interpretar así:

```csharp
condicion
    ? valor verdadero
    : valor falso;
```

---

### 1.3 ¿El operador ternario reemplaza al `if`?

No completamente.

El operador ternario puede reemplazar un `if` sencillo cuando solo se desea elegir entre dos valores.

Por ejemplo:

```csharp
string estado;

if (promedio >= 6)
{
    estado = "Aprobado";
}
else
{
    estado = "Reprobado";
}
```

La versión con operador ternario sería:

```csharp
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";
```

Ambas versiones producen el mismo resultado.

El operador ternario no es necesariamente mejor que `if`. Es más compacto, pero solo conviene cuando la condición es sencilla y fácil de leer.

---

### 1.4 ¿Cuándo conviene usar un operador ternario?

Conviene utilizarlo cuando:

* Existe una sola condición.
* Solo hay dos posibles valores.
* La expresión puede entenderse rápidamente.
* Se desea asignar un valor a una variable.

Ejemplo:

```csharp
int edad = 20;

string categoria = edad >= 18 ? "Adulto" : "Menor de edad";
```

También puede utilizarse para decidir un valor numérico:

```csharp
int precio = edad < 18 ? 5000 : 10000;
```

En este caso, si la persona es menor de edad, el precio será `5000`. De lo contrario, será `10000`.

---

### 1.5 ¿Cuándo es mejor utilizar `if` y `else`?

Es mejor utilizar `if` y `else` cuando cada condición debe ejecutar varias instrucciones.

Ejemplo:

```csharp
if (promedio >= 6)
{
    Console.WriteLine("El estudiante aprobó.");
    Console.WriteLine("Puede continuar con el siguiente nivel.");
}
else
{
    Console.WriteLine("El estudiante reprobó.");
    Console.WriteLine("Debe repetir la evaluación.");
}
```

En este caso, el operador ternario no sería recomendable porque cada bloque ejecuta más de una acción.

Regla práctica:

> El operador ternario sirve principalmente para elegir un valor.
> `if` y `else` sirven para controlar bloques de instrucciones.

---

### 1.6 ¿Qué significa `:F2` en una impresión?

En la siguiente línea:

```csharp
Console.WriteLine($"Promedio: {promedio:F2}");
```

La parte:

```csharp
:F2
```

es un formato numérico.

La letra `F` significa **fixed-point**, que puede entenderse como formato decimal fijo.

El número `2` indica que se mostrarán exactamente dos cifras decimales.

Ejemplo:

```csharp
double promedio = 8.166666;

Console.WriteLine($"{promedio:F2}");
```

La salida será:

```text
8.17
```

C# redondea el número al mostrarlo.

---

### 1.7 ¿`F2` modifica el valor de la variable?

No.

`F2` solo cambia la forma en la que el número se muestra en pantalla.

Ejemplo:

```csharp
double numero = 8.166666;

Console.WriteLine(numero);
Console.WriteLine($"{numero:F2}");
```

La salida podría ser:

```text
8.166666
8.17
```

La variable sigue almacenando el valor completo:

```text
8.166666
```

Solamente se presenta como:

```text
8.17
```

---

### 1.8 ¿Puedo utilizar `F4`, `F5` o `F10`?

Sí.

El número después de la letra `F` indica cuántos decimales se desean mostrar.

Ejemplo:

```csharp
double numero = 8.166666666666;

Console.WriteLine($"{numero:F1}");
Console.WriteLine($"{numero:F2}");
Console.WriteLine($"{numero:F4}");
Console.WriteLine($"{numero:F10}");
```

Salida aproximada:

```text
8.2
8.17
8.1667
8.1666666667
```

Por tanto:

```csharp
F1   // Muestra un decimal
F2   // Muestra dos decimales
F4   // Muestra cuatro decimales
F10  // Muestra diez decimales
```

Aunque `F10` es válido, para notas y promedios normalmente se utilizan uno o dos decimales. Más de eso ya parece una misión de precisión orbital, no una evaluación académica.

---

### 1.9 ¿Qué ocurre si el número tiene pocos decimales?

C# completa los espacios faltantes con ceros.

Ejemplo:

```csharp
double nota = 8.5;

Console.WriteLine($"{nota:F2}");
Console.WriteLine($"{nota:F4}");
```

Salida:

```text
8.50
8.5000
```

Esto permite mantener una presentación uniforme.

Por ejemplo, todas las notas pueden mostrarse con dos decimales:

```text
7.00
8.50
9.25
```

---

### 1.10 ¿Cuál es la diferencia entre redondear y cortar decimales?

Cuando se utiliza `F2`, C# redondea el número.

Ejemplo:

```csharp
double numero = 7.856;

Console.WriteLine($"{numero:F2}");
```

Salida:

```text
7.86
```

El tercer decimal es `6`, por lo que el segundo decimal aumenta.

Otro ejemplo:

```csharp
double numero = 7.852;

Console.WriteLine($"{numero:F2}");
```

Salida:

```text
7.85
```

Como el tercer decimal es `2`, el segundo decimal se mantiene.

---

## 2. Aplicación en la calculadora de promedio

En el programa de la calculadora aparecen ambos conceptos:

```csharp
double promedio = (nota1 + nota2 + nota3) / 3;

string estado = promedio >= 6 ? "Aprobado" : "Reprobado";

Console.WriteLine($"Promedio: {promedio:F2}");
Console.WriteLine($"Estado: {estado}");
```

El operador ternario decide el estado del estudiante:

```csharp
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";
```

El formato `F2` muestra el promedio con dos decimales:

```csharp
Console.WriteLine($"Promedio: {promedio:F2}");
```

Si el promedio real es:

```text
7.666666
```

el programa mostrará:

```text
Promedio: 7.67
Estado: Aprobado
```

---

## 3. Ejemplo completo comentado

```csharp
Console.WriteLine("=== CALCULADORA DE PROMEDIO ===");

Console.Write("Ingresa el nombre del estudiante: ");
string nombre = Console.ReadLine();

Console.Write("Ingresa la nota 1: ");
double nota1 = Convert.ToDouble(Console.ReadLine());

Console.Write("Ingresa la nota 2: ");
double nota2 = Convert.ToDouble(Console.ReadLine());

Console.Write("Ingresa la nota 3: ");
double nota3 = Convert.ToDouble(Console.ReadLine());

// Se calcula el promedio de las tres notas.
double promedio = (nota1 + nota2 + nota3) / 3;

// Operador ternario:
// Si el promedio es mayor o igual a 6, se guarda "Aprobado".
// Si no se cumple la condición, se guarda "Reprobado".
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";

Console.WriteLine($"\nEstudiante: {nombre}");

// F2 indica que el promedio se mostrará con dos decimales.
Console.WriteLine($"Promedio: {promedio:F2}");

Console.WriteLine($"Estado: {estado}");
```

---

## 4. Ejercicios de práctica

### Ejercicio 1

Crear una variable llamada `edad` y utilizar un operador ternario para mostrar:

* `"Mayor de edad"` si la edad es mayor o igual a 18.
* `"Menor de edad"` si la edad es menor que 18.

```csharp
int edad = 20;

string resultado = edad >= 18 ? "Mayor de edad" : "Menor de edad";

Console.WriteLine(resultado);
```

---

### Ejercicio 2

Solicitar un número al usuario y determinar si es positivo o negativo.

```csharp
Console.Write("Ingresa un número: ");
double numero = Convert.ToDouble(Console.ReadLine());

string resultado = numero >= 0 ? "Positivo" : "Negativo";

Console.WriteLine($"El número es: {resultado}");
```

---

### Ejercicio 3

Mostrar un número con cuatro decimales.

```csharp
double valor = 12.345678;

Console.WriteLine($"Valor con cuatro decimales: {valor:F4}");
```

Salida:

```text
Valor con cuatro decimales: 12.3457
```

---

### Ejercicio 4

Solicitar una temperatura y mostrar si hace calor o frío.

```csharp
Console.Write("Ingresa la temperatura: ");
double temperatura = Convert.ToDouble(Console.ReadLine());

string clima = temperatura >= 30 ? "Hace calor" : "No hace calor";

Console.WriteLine(clima);
```

---

## 5. Resumen de la clase

El operador ternario permite elegir entre dos valores mediante una condición:

```csharp
condicion ? valorVerdadero : valorFalso;
```

Ejemplo:

```csharp
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";
```

El formato `F2` permite mostrar un número con dos decimales:

```csharp
Console.WriteLine($"{promedio:F2}");
```

El número que acompaña a la letra `F` define la cantidad de decimales:

```csharp
F1
F2
F4
F10
```

Estos formatos no modifican el valor almacenado en la variable. Solamente controlan cómo se presenta en pantalla.

## 2. Conversión de datos: `Parse`, `Convert` y `TryParse`

### 2.1 ¿Por qué es necesario convertir los datos ingresados por consola?

Cuando se utiliza:

```csharp
Console.ReadLine();
```

C# siempre recibe la información como texto, es decir, como un dato de tipo `string`.

Por ejemplo, si el usuario escribe:

```text
25
```

el programa inicialmente lo recibe como:

```csharp
"25"
```

Aunque visualmente parece un número, para C# sigue siendo texto.

Por esta razón, no se puede utilizar directamente en operaciones matemáticas:

```csharp
string edad = Console.ReadLine();
int edadFutura = edad + 1; // Error
```

Antes de realizar cálculos, el texto debe convertirse a un tipo numérico como `int` o `double`.

---

### 2.2 ¿Qué es `Parse()`?

`Parse()` es un método que interpreta un texto y lo convierte a un tipo de dato específico.

Ejemplo con un número entero:

```csharp
string textoEdad = "25";

int edad = int.Parse(textoEdad);
```

El proceso es:

```text
"25" → 25
```

El valor inicial es texto:

```csharp
"25"
```

Después de utilizar `int.Parse()`, se obtiene un entero:

```csharp
25
```

También puede utilizarse directamente con `Console.ReadLine()`:

```csharp
Console.Write("Ingresa tu edad: ");
int edad = int.Parse(Console.ReadLine());
```

En este caso, `int.Parse()` convierte el texto escrito por el usuario en un número entero.

---

### 2.3 ¿Para qué sirven `int.Parse()` y `double.Parse()`?

`int.Parse()` convierte texto a un número entero:

```csharp
int cantidad = int.Parse("20");
```

Resultado:

```text
20
```

`double.Parse()` convierte texto a un número decimal:

```csharp
double nota = double.Parse("8.5");
```

Resultado:

```text
8.5
```

Por tanto:

```csharp
int.Parse()     // Convierte texto a un número entero
double.Parse()  // Convierte texto a un número decimal
```

---

### 2.4 ¿Qué ocurre si se utiliza `int.Parse()` con una palabra?

Si el texto no representa un número entero válido, el programa produce un error.

Ejemplo:

```csharp
int edad = int.Parse("veinte");
```

La palabra `"veinte"` no puede interpretarse como un número entero.

C# genera una excepción llamada:

```text
FormatException
```

El programa normalmente se detiene y muestra un mensaje indicando que el texto no tiene un formato correcto.

Lo mismo sucede si el usuario escribe una palabra:

```csharp
Console.Write("Ingresa tu edad: ");
int edad = int.Parse(Console.ReadLine());
```

Entrada del usuario:

```text
hola
```

El programa intenta realizar:

```csharp
int.Parse("hola");
```

Como `"hola"` no representa un entero, se produce un error.

---

### 2.5 ¿`int.Parse()` acepta números decimales?

No.

`int` representa números enteros, por ejemplo:

```text
10
25
0
-8
```

Por eso, esta conversión funciona:

```csharp
int numero = int.Parse("25");
```

Pero esta conversión falla:

```csharp
int numero = int.Parse("8.5");
```

El texto `"8.5"` representa un número decimal, no un entero.

Para convertir un número decimal se debe utilizar:

```csharp
double numero = double.Parse("8.5");
```

---

### 2.6 ¿Qué es `Convert`?

`Convert` es una clase de C# que contiene métodos para convertir un valor de un tipo a otro.

Ejemplo para convertir texto a entero:

```csharp
int edad = Convert.ToInt32("25");
```

Ejemplo para convertir texto a decimal:

```csharp
double nota = Convert.ToDouble("8.5");
```

También puede utilizarse con datos ingresados por consola:

```csharp
Console.Write("Ingresa tu edad: ");
int edad = Convert.ToInt32(Console.ReadLine());
```

```csharp
Console.Write("Ingresa una nota: ");
double nota = Convert.ToDouble(Console.ReadLine());
```

---

### 2.7 ¿Qué significan `ToInt32()` y `ToDouble()`?

`ToInt32()` convierte un valor a un número entero de 32 bits:

```csharp
int edad = Convert.ToInt32("25");
```

`ToDouble()` convierte un valor a un número decimal de tipo `double`:

```csharp
double promedio = Convert.ToDouble("8.5");
```

Se pueden interpretar de esta manera:

```csharp
Convert.ToInt32(valor);  // Convertir el valor a int
Convert.ToDouble(valor); // Convertir el valor a double
```

---

### 2.8 ¿Cuál es la diferencia entre `Parse()` y `Convert`?

La diferencia principal es el tipo de información que pueden recibir.

`Parse()` está diseñado para interpretar texto:

```csharp
int edad = int.Parse("25");
double nota = double.Parse("8.5");
```

`Convert` puede convertir texto y otros tipos de datos compatibles:

```csharp
int cantidad = 10;

double cantidadDecimal = Convert.ToDouble(cantidad);
```

En este ejemplo, `Convert.ToDouble()` convierte el entero `10` en un valor de tipo `double`.

La idea general es:

```text
Parse   = interpretar texto
Convert = convertir un valor compatible
```

---

### 2.9 ¿En `Console.ReadLine()` da igual utilizar `Parse` o `Convert`?

En la mayoría de ejercicios básicos, sí.

Estas dos líneas producen el mismo resultado cuando el usuario escribe un número válido:

```csharp
double nota = double.Parse(Console.ReadLine());
```

```csharp
double nota = Convert.ToDouble(Console.ReadLine());
```

Esto sucede porque `Console.ReadLine()` siempre devuelve texto.

También ocurre con los números enteros:

```csharp
int edad = int.Parse(Console.ReadLine());
```

```csharp
int edad = Convert.ToInt32(Console.ReadLine());
```

Cuando la entrada es válida, ambas opciones convierten el texto al tipo numérico correspondiente.

Por ejemplo, si el usuario escribe:

```text
25
```

las dos alternativas producen el entero:

```text
25
```

---

### 2.10 Ejemplo comparativo entre `Parse` y `Convert`

Versión utilizando `Parse`:

```csharp
Console.Write("Ingresa tu edad: ");
int edad = int.Parse(Console.ReadLine());

Console.Write("Ingresa tu promedio: ");
double promedio = double.Parse(Console.ReadLine());
```

Versión utilizando `Convert`:

```csharp
Console.Write("Ingresa tu edad: ");
int edad = Convert.ToInt32(Console.ReadLine());

Console.Write("Ingresa tu promedio: ");
double promedio = Convert.ToDouble(Console.ReadLine());
```

En ambos casos, el programa recibe texto desde la consola y lo convierte a números.

Para mantener el código consistente, es recomendable escoger una alternativa y utilizarla de manera uniforme en el ejercicio.

---

### 2.11 ¿Qué ocurre si se escribe una palabra utilizando `Convert`?

`Convert` tampoco puede transformar una palabra cualquiera en un número.

Ejemplo:

```csharp
double nota = Convert.ToDouble("ocho");
```

Este código produce un error porque `"ocho"` no representa un valor numérico válido.

Por tanto, estas dos instrucciones fallan:

```csharp
double nota1 = double.Parse("ocho");
double nota2 = Convert.ToDouble("ocho");
```

Ni `Parse` ni `Convert` traducen palabras escritas a su equivalente numérico. C# convierte tipos de datos, pero todavía no lee la mente del usuario como una inteligencia artificial de una película noventera.

---

### 2.12 ¿Qué es `TryParse()`?

`TryParse()` es una forma más segura de convertir texto a un número.

En lugar de detener el programa cuando la entrada es incorrecta, intenta realizar la conversión y devuelve un resultado booleano:

```csharp
true
```

si la conversión fue correcta, o:

```csharp
false
```

si la conversión no fue posible.

Ejemplo:

```csharp
Console.Write("Ingresa tu edad: ");
string entrada = Console.ReadLine();

bool conversionCorrecta = int.TryParse(entrada, out int edad);
```

`TryParse()` intenta convertir el contenido de `entrada` y guardar el resultado en la variable `edad`.

---

### 2.13 ¿Qué significa `out int edad`?

En esta instrucción:

```csharp
int.TryParse(entrada, out int edad);
```

`out int edad` indica que, si la conversión funciona, el número convertido se almacenará en la variable `edad`.

Ejemplo:

```csharp
string entrada = "25";

bool resultado = int.TryParse(entrada, out int edad);
```

Después de ejecutar el código:

```csharp
resultado = true;
edad = 25;
```

Pero si la entrada es:

```csharp
string entrada = "veinte";
```

entonces:

```csharp
resultado = false;
edad = 0;
```

---

### 2.14 ¿Cómo se utiliza `TryParse()` con un `if`?

Ejemplo con un número entero:

```csharp
Console.Write("Ingresa tu edad: ");
string entrada = Console.ReadLine();

if (int.TryParse(entrada, out int edad))
{
    Console.WriteLine($"Edad registrada: {edad}");
}
else
{
    Console.WriteLine("Debes ingresar un número entero válido.");
}
```

Si el usuario escribe:

```text
25
```

la salida será:

```text
Edad registrada: 25
```

Si escribe:

```text
veinticinco
```

la salida será:

```text
Debes ingresar un número entero válido.
```

El programa no se cierra inesperadamente.

---

### 2.15 ¿Cómo se utiliza `double.TryParse()`?

Para números decimales se utiliza:

```csharp
double.TryParse()
```

Ejemplo:

```csharp
Console.Write("Ingresa una nota: ");
string entrada = Console.ReadLine();

if (double.TryParse(entrada, out double nota))
{
    Console.WriteLine($"Nota registrada: {nota:F2}");
}
else
{
    Console.WriteLine("Debes ingresar una nota numérica válida.");
}
```

Si el usuario escribe un número válido, se almacena en la variable `nota`.

Si escribe una palabra, el programa muestra un mensaje de error controlado.

---

### 2.16 ¿Cuál se debe utilizar: `Parse`, `Convert` o `TryParse`?

Depende del contexto.

Se puede utilizar `Parse()` cuando se sabe con seguridad que el texto tiene un formato numérico válido:

```csharp
int cantidad = int.Parse("20");
```

Se puede utilizar `Convert` cuando se desea convertir un valor compatible a otro tipo:

```csharp
int cantidad = 20;
double cantidadDecimal = Convert.ToDouble(cantidad);
```

Se recomienda utilizar `TryParse()` cuando la información viene directamente del usuario:

```csharp
if (int.TryParse(Console.ReadLine(), out int edad))
{
    Console.WriteLine($"Edad válida: {edad}");
}
else
{
    Console.WriteLine("Entrada incorrecta.");
}
```

La regla práctica es:

```text
Parse     = convierte texto, pero produce un error si el texto no es válido.
Convert   = convierte valores compatibles, pero también puede producir errores.
TryParse  = intenta convertir y permite controlar una entrada incorrecta.
```

---

## 3. Tabla comparativa

| Método               | Uso principal                            | Ejemplo                              | ¿Qué ocurre con `"hola"`? |
| -------------------- | ---------------------------------------- | ------------------------------------ | ------------------------- |
| `int.Parse()`        | Convertir texto a entero                 | `int.Parse("25")`                    | Produce un error          |
| `double.Parse()`     | Convertir texto a decimal                | `double.Parse("8.5")`                | Produce un error          |
| `Convert.ToInt32()`  | Convertir un valor compatible a entero   | `Convert.ToInt32("25")`              | Produce un error          |
| `Convert.ToDouble()` | Convertir un valor compatible a `double` | `Convert.ToDouble("8.5")`            | Produce un error          |
| `int.TryParse()`     | Intentar convertir texto a entero        | `int.TryParse(texto, out numero)`    | Devuelve `false`          |
| `double.TryParse()`  | Intentar convertir texto a decimal       | `double.TryParse(texto, out numero)` | Devuelve `false`          |

---

## 4. Aplicación en la calculadora de promedio

La calculadora original utiliza:

```csharp
double nota1 = Convert.ToDouble(Console.ReadLine());
double nota2 = Convert.ToDouble(Console.ReadLine());
double nota3 = Convert.ToDouble(Console.ReadLine());
```

Estas instrucciones pueden escribirse también con `double.Parse()`:

```csharp
double nota1 = double.Parse(Console.ReadLine());
double nota2 = double.Parse(Console.ReadLine());
double nota3 = double.Parse(Console.ReadLine());
```

Las dos versiones funcionan cuando el usuario ingresa números válidos.

Una versión más segura utilizaría `double.TryParse()`:

```csharp
Console.Write("Ingresa la nota 1: ");

if (double.TryParse(Console.ReadLine(), out double nota1))
{
    Console.WriteLine($"Nota registrada: {nota1:F2}");
}
else
{
    Console.WriteLine("La nota ingresada no es válida.");
}
```

---

## 5. Resumen

`Console.ReadLine()` siempre devuelve texto:

```csharp
string entrada = Console.ReadLine();
```

Para utilizar ese texto como número, se debe convertir.

Con `Parse`:

```csharp
int edad = int.Parse(entrada);
double nota = double.Parse(entrada);
```

Con `Convert`:

```csharp
int edad = Convert.ToInt32(entrada);
double nota = Convert.ToDouble(entrada);
```

Con `TryParse`:

```csharp
bool esValido = int.TryParse(entrada, out int edad);
```

La idea fundamental es:

```text
Parse interpreta texto.
Convert transforma valores compatibles.
TryParse intenta convertir sin cerrar el programa si la entrada es incorrecta.
```
