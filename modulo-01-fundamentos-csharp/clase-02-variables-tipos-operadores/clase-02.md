# Clase 02 — Variables, Tipos de Datos y Operadores

## Objetivos

- Declarar y usar variables en C#
- Conocer los tipos de datos fundamentales
- Usar operadores aritméticos, de comparación y lógicos
- Convertir entre tipos de datos
- Aplicar buenas prácticas de nombrado

---

## 1. ¿Qué es una variable?

Una variable es un espacio en memoria que almacena un valor. En C# toda variable tiene un **tipo** que define qué datos puede contener.

```csharp
int edad = 25;
string nombre = "Ana";
double altura = 1.75;
```

---

## 2. Tipos de datos fundamentales

| Tipo | Tamaño | Rango | Ejemplo |
|------|--------|-------|---------|
| `int` | 4 bytes | ±2.1 mil millones | `int edad = 30;` |
| `long` | 8 bytes | ±9.2e18 | `long poblacion = 8_000_000_000;` |
| `float` | 4 bytes | ±3.4e38 | `float peso = 68.5f;` |
| `double` | 8 bytes | ±1.7e308 | `double pi = 3.1416;` |
| `decimal` | 16 bytes | ±7.9e28 | `decimal precio = 19.99m;` |
| `char` | 2 bytes | Unicode | `char letra = 'A';` |
| `string` | Variable | Texto | `string saludo = "Hola";` |
| `bool` | 1 byte | true/false | `bool esMayor = true;` |

### Decimal, float y double

Usar `f` para float y `m` para decimal:

```csharp
float gravitad = 9.81f;
decimal salario = 2500.50m;
```

---

## 3. Tipo implícito con `var`

El compilador infiere el tipo:

```csharp
var nombre = "Carlos";   // string
var edad = 30;           // int
var altura = 1.75;       // double
```

> Usar `var` cuando el tipo sea obvio por la asignación.

---

## 4. Constantes

Un valor que no cambia durante la ejecución:

```csharp
const double PI = 3.1416;
const int DIAS_SEMANA = 7;
```

---

## 5. Convenciones de nombrado

| Convención | Cuándo usar | Ejemplo |
|------------|-------------|---------|
| **camelCase** | Variables locales | `miVariable` |
| **PascalCase** | Clases, métodos, constantes | `MiClase`, `CalcularTotal` |
| **SCREAMING_CASE** | Constantes (opcional) | `const int MAX_LIMITE = 100;` |

---

## 6. Operadores aritméticos

| Operador | Operación | Ejemplo |
|----------|-----------|---------|
| `+` | Suma | `a + b` |
| `-` | Resta | `a - b` |
| `*` | Multiplicación | `a * b` |
| `/` | División | `a / b` |
| `%` | Módulo (residuo) | `a % b` |

```csharp
int suma = 10 + 5;       // 15
int resta = 10 - 5;      // 5
int producto = 10 * 5;   // 50
int division = 10 / 3;   // 3 (enteros)
double div = 10.0 / 3;   // 3.333...
int residuo = 10 % 3;    // 1
```

---

## 7. Operadores de comparación

| Operador | Significado |
|----------|-------------|
| `==` | Igual a |
| `!=` | Diferente de |
| `<` | Menor que |
| `>` | Mayor que |
| `<=` | Menor o igual |
| `>=` | Mayor o igual |

```csharp
bool resultado = (10 > 5);  // true
bool igual = (10 == 5);     // false
```

---

## 8. Operadores lógicos

| Operador | Significado | Ejemplo |
|----------|-------------|---------|
| `&&` | AND (y) | `(a > 0 && b > 0)` |
| `\|\|` | OR (o) | `(a > 0 \|\| b > 0)` |
| `!` | NOT (no) | `!(a > 0)` |

```csharp
bool puedeVotar = edad >= 18 && tieneCedula;
bool esFestivo = dia == "sabado" || dia == "domingo";
bool noEsMayor = !esMayor;
```

---

## 9. Conversión de tipos

### Implícita (segura)

```csharp
int numero = 100;
double numeroDouble = numero;  // int → double automático
```

### Explícita (casting)

```csharp
double pi = 3.1416;
int entero = (int)pi;  // 3 (pierde decimales)
```

### Con métodos de conversión

```csharp
string texto = "123";
int numero = int.Parse(texto);

string edad = "25";
int edadNum = Convert.ToInt32(edad);

int valor = 42;
string textoValor = valor.ToString();
```

---

## Resumen

- Toda variable tiene un **tipo**
- Usar `int`, `double`, `string`, `bool` para la mayoría de casos
- Los operadores permiten hacer cálculos y comparaciones
- La conversión entre tipos puede ser implícita o explícita
- Nombres claros y consistentes hacen el código más legible
