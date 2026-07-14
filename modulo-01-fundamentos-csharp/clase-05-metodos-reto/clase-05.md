# Clase 05 — Métodos y Reto Integrador

## Objetivos

- Definir y llamar métodos en C#
- Usar parámetros y valores de retorno
- Aplicar sobrecarga de métodos
- Integrar todos los conceptos del módulo en un reto final

---

## 1. ¿Qué es un método?

Un método es un bloque de código que realiza una tarea específica. Se define una vez y se puede llamar múltiples veces.

```csharp
// Definición
void Saludar()
{
    Console.WriteLine("¡Hola, Mundo!");
}

// Llamada
Saludar();
```

---

## 2. Estructura de un método

```
[acceso] [tipo_retorno] Nombre([parámetros])
{
    // cuerpo del método
    return valor;  // si no es void
}
```

```csharp
static int Sumar(int a, int b)
{
    return a + b;
}
```

> La palabra `static` la explicaremos en POO. Por ahora, nuestros métodos serán `static`.

---

## 3. Métodos con parámetros

```csharp
static void Saludar(string nombre)
{
    Console.WriteLine($"Hola, {nombre}!");
}

static void Main(string[] args)
{
    Saludar("Ana");   // Hola, Ana!
    Saludar("Carlos"); // Hola, Carlos!
}
```

### Múltiples parámetros

```csharp
static void MostrarPerfil(string nombre, int edad, string ciudad)
{
    Console.WriteLine($"{nombre}, {edad} años, {ciudad}");
}
```

---

## 4. Métodos con retorno

```csharp
static int Cuadrado(int numero)
{
    return numero * numero;
}

static void Main()
{
    int resultado = Cuadrado(5);
    Console.WriteLine(resultado);  // 25
}
```

El valor retornado puede asignarse a una variable o usarse directamente.

---

## 5. `void` — Sin retorno

Cuando un método no devuelve nada, se usa `void`:

```csharp
static void MostrarMenu()
{
    Console.WriteLine("1. Sumar");
    Console.WriteLine("2. Restar");
    Console.WriteLine("3. Salir");
}
```

No necesita `return`.

---

## 6. Sobrecarga de métodos (Overloading)

Múltiples métodos con el **mismo nombre** pero **diferentes parámetros**:

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

El compilador elige la versión correcta según los argumentos:

```csharp
Sumar(2, 3);        // llama a la versión int, int
Sumar(2.5, 3.7);    // llama a la versión double, double
Sumar(1, 2, 3);     // llama a la versión int, int, int
```

---

## 7. Ámbito de variables (Scope)

Una variable declarada dentro de un método solo existe dentro de ese método:

```csharp
static void MetodoA()
{
    int x = 10;
    Console.WriteLine(x);  // OK
}

static void MetodoB()
{
    Console.WriteLine(x);  // ERROR: x no existe aquí
}
```

---

## 8. Reto Integrador del Módulo 1

El reto de hoy integra todos los temas del módulo:

| Clase | Temas |
|-------|-------|
| 1 | .NET, CLI, Console |
| 2 | Variables, tipos, operadores |
| 3 | Condicionales |
| 4 | Ciclos |
| 5 | Métodos |

---

## Resumen

```csharp
// Método sin parámetros, sin retorno
static void Saludar() { }

// Método con parámetros, sin retorno
static void Saludar(string nombre) { }

// Método con parámetros y retorno
static int Sumar(int a, int b) { return a + b; }

// Sobrecarga: mismo nombre, diferentes parámetros
static double Sumar(double a, double b) { return a + b; }
```
