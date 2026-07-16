# Dudas — Clase 03: Condicionales

*Espacio para anotar preguntas, aclaraciones y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿Cuál es la diferencia entre `=` y `==`?

```csharp
int edad = 18;   // Asignación: guarda el valor 18 en la variable
edad == 18       // Comparación: pregunta si edad es igual a 18
```

`=` es el operador de asignación. Se usa para guardar un valor en una variable.

`==` es el operador de comparación. Se usa para preguntar si dos valores son iguales.

Error común:

```csharp
if (edad = 18)  // Error: no puedes asignar dentro de una condición
```

Corrección:

```csharp
if (edad == 18) // Correcto: estás comparando
```

---

### 1.2 ¿Por qué `if` necesita paréntesis?

Los paréntesis son obligatorios en C# para delimitar la condición:

```csharp
if (edad >= 18)
```

C# necesita saber dónde empieza y termina la condición. Los paréntesis se lo indican.

La estructura general es:

```csharp
if (condición)
{
    // código si la condición es verdadera
}
```

Sin paréntesis, el programa no compila.

---

### 1.3 ¿`else` puede tener condición?

No. `else` se ejecuta cuando la condición del `if` fue falsa. No lleva condición.

```csharp
if (edad >= 18)
{
    Console.WriteLine("Mayor de edad");
}
else
{
    // Aquí no se escribe condición
    Console.WriteLine("Menor de edad");
}
```

Si necesitas evaluar otra condición, usa `else if`:

```csharp
if (nota >= 90)
{
    Console.WriteLine("Excelente");
}
else if (nota >= 70)
{
    // Esta condición solo se evalúa si la primera fue falsa
    Console.WriteLine("Aprobado");
}
else
{
    Console.WriteLine("Reprobado");
}
```

Cada `else if` tiene su propia condición. El `else` final no tiene condición.

---

### 1.4 ¿Por qué se usa `&&` y no `y`?

C# usa símbolos para los operadores lógicos, no palabras en español.

| Operador | Significado |
|----------|-------------|
| `&&` | Y (and) |
| `\|\|` | O (or) |
| `!` | Negación (not) |

Ejemplo con `&&`:

```csharp
if (edad >= 18 && nacionalidad == "colombiano")
{
    Console.WriteLine("Puede votar");
}
```

La condición solo es verdadera si ambas partes se cumplen.

Ejemplo con `||`:

```csharp
if (dia == "sabado" || dia == "domingo")
{
    Console.WriteLine("Fin de semana");
}
```

La condición es verdadera si al menos una parte se cumple.

Ejemplo con `!`:

```csharp
if (!activo)
{
    Console.WriteLine("Está inactivo");
}
```

`!activo` significa "si activo es falso".

---

### 1.5 ¿Qué significa "corto circuito" en `&&` y `||`?

Cuando C# evalúa una condición con `&&`, si la primera parte es falsa, no evalúa la segunda. No hace falta: si una parte es falsa, toda la condición será falsa.

```csharp
int edad = 15;

if (edad >= 18 && nacionalidad == "colombiano")
```

Aquí `edad >= 18` es `false`, así que C# ni siquiera revisa la nacionalidad.

Con `||` pasa lo contrario: si la primera parte es verdadera, no evalúa la segunda.

```csharp
if (dia == "sabado" || dia == "domingo")
```

Si `dia` es `"sabado"`, la condición ya es verdadera. C# no revisa si es domingo.

Esto se llama **evaluación de corto circuito**.

---

### 1.6 ¿Cuándo usar `switch` en lugar de `if`?

`switch` es útil cuando comparas una misma variable contra muchos valores fijos.

Ejemplo con `if`:

```csharp
if (opcion == 1)
    Console.WriteLine("Sumar");
else if (opcion == 2)
    Console.WriteLine("Restar");
else if (opcion == 3)
    Console.WriteLine("Multiplicar");
else if (opcion == 4)
    Console.WriteLine("Dividir");
else
    Console.WriteLine("Opción inválida");
```

Mismo ejemplo con `switch`:

```csharp
switch (opcion)
{
    case 1:
        Console.WriteLine("Sumar");
        break;
    case 2:
        Console.WriteLine("Restar");
        break;
    case 3:
        Console.WriteLine("Multiplicar");
        break;
    case 4:
        Console.WriteLine("Dividir");
        break;
    default:
        Console.WriteLine("Opción inválida");
        break;
}
```

`switch` queda más limpio cuando tienes 3 o más casos para una misma variable.

Usa `if` cuando las condiciones sean variadas:

```csharp
if (edad >= 18 && tieneLicencia)
{
    Console.WriteLine("Puede conducir");
}
```

Aquí no puedes usar `switch` porque estás evaluando dos variables diferentes.

---

### 1.7 ¿Qué pasa si olvido el `break` en un `switch`?

En C#, si olvidas `break`, el programa marca error de compilación. No se ejecuta el siguiente `case` como en otros lenguajes.

C# exige que cada `case` termine con `break`, `return` o `throw` para evitar que accidentalmente se ejecuten casos siguientes.

```csharp
switch (opcion)
{
    case 1:
        Console.WriteLine("Uno");
        // Error: falta break
    case 2:
        Console.WriteLine("Dos");
        break;
}
```

Si quieres que varios casos compartan el mismo bloque, se escriben seguidos:

```csharp
case "sabado":
case "domingo":
    Console.WriteLine("Fin de semana");
    break;
```

---

### 1.8 ¿Cómo funciona `switch` con cadenas de texto?

`switch` funciona con `string` sin problemas:

```csharp
Console.Write("Ingresa un color (rojo, verde, azul): ");
string color = Console.ReadLine();

switch (color.ToLower())
{
    case "rojo":
        Console.WriteLine("Elegiste rojo");
        break;
    case "verde":
        Console.WriteLine("Elegiste verde");
        break;
    case "azul":
        Console.WriteLine("Elegiste azul");
        break;
    default:
        Console.WriteLine("Color no reconocido");
        break;
}
```

El método `.ToLower()` convierte la entrada a minúsculas para que "Rojo", "ROJO" y "rojo" coincidan con el mismo `case`.

---

### 1.9 ¿Para qué sirve `default` en `switch`?

`default` se ejecuta cuando ningún `case` coincide. Es como el `else` del `if`.

```csharp
switch (opcion)
{
    case 1:
        Console.WriteLine("Opción 1");
        break;
    case 2:
        Console.WriteLine("Opción 2");
        break;
    default:
        Console.WriteLine("Opción no válida");
        break;
}
```

Si el usuario ingresa `3` y no hay `case 3`, se ejecuta `default`.

`default` no es obligatorio, pero es buena práctica incluirlo para manejar valores inesperados.

---

### 1.10 ¿Qué es el operador ternario y cuándo usarlo?

El operador ternario es una forma compacta de `if/else` que devuelve un valor.

```csharp
string mensaje = (edad >= 18) ? "Mayor de edad" : "Menor de edad";
```

Estructura:

```csharp
condición ? valor_si_verdadero : valor_si_falso
```

Se usa cuando necesitas elegir entre dos valores según una condición. Es ideal para asignaciones simples.

No lo uses cuando necesites ejecutar varias instrucciones en cada caso. Ahí sigue siendo mejor `if/else`.

Bien:

```csharp
string estado = (promedio >= 6) ? "Aprobado" : "Reprobado";
```

Mal:

```csharp
string resultado = (edad >= 18) ? Console.WriteLine("Mayor") : Console.WriteLine("Menor");
```

El ternario devuelve un valor, no ejecuta acciones.

---

### 1.11 ¿Puedo anidar `if` dentro de otro `if`?

Sí. Se llaman condicionales anidados.

```csharp
if (edad >= 18)
{
    if (tieneLicencia)
    {
        Console.WriteLine("Puede conducir");
    }
}
```

El segundo `if` solo se evalúa si el primero fue verdadero.

Pero no anides más de 2 o 3 niveles. El código se vuelve difícil de leer.

En lugar de esto:

```csharp
if (a)
    if (b)
        if (c)
            Console.WriteLine("Tres niveles");
```

Mejor usa operadores lógicos:

```csharp
if (a && b && c)
{
    Console.WriteLine("Tres condiciones");
}
```

---

### 1.12 ¿Puedo usar `if` sin llaves `{}`?

Sí, pero solo cuando el bloque tiene una sola instrucción.

```csharp
if (edad >= 18)
    Console.WriteLine("Mayor de edad");
```

Esto funciona, pero no es recomendable. Si después agregas otra línea sin llaves, solo la primera pertenece al `if`.

```csharp
if (edad >= 18)
    Console.WriteLine("Mayor de edad");
    Console.WriteLine("Segunda línea"); // Esta línea NO depende del if
```

La segunda línea se ejecuta siempre. El sangrado no tiene efecto en C#.

Regla: siempre usa llaves `{}`. Evita confusiones.

```csharp
if (edad >= 18)
{
    Console.WriteLine("Mayor de edad");
}
```

---

### 1.13 ¿El orden de las condiciones en `else if` importa?

Sí, importa mucho. Las condiciones se evalúan de arriba a abajo. La primera que se cumple ejecuta su bloque y las siguientes se ignoran.

```csharp
if (nota >= 90)
    Console.WriteLine("Excelente");
else if (nota >= 70)
    Console.WriteLine("Aprobado");
else if (nota >= 50)
    Console.WriteLine("Insuficiente");
else
    Console.WriteLine("Reprobado");
```

Si cambias el orden:

```csharp
if (nota >= 50)       // Esta condición se cumple primero
    Console.WriteLine("Insuficiente");
else if (nota >= 70)  // Esta nunca se evalúa si nota >= 50
    Console.WriteLine("Aprobado");
```

Con nota = 85, el primer programa muestra "Excelente". El segundo programa muestra "Insuficiente" porque `85 >= 50` es verdadero y se ejecuta primero.

Siempre ordena las condiciones de la más restrictiva a la menos restrictiva.

---

## 2. Aplicación en los ejercicios de la clase

### 2.1 ¿Cómo se resuelve el ejercicio "¿Puede votar?"

```csharp
Console.Write("Ingresa tu edad: ");
int edad = Convert.ToInt32(Console.ReadLine());

Console.Write("Ingresa tu nacionalidad (colombiano/extranjero): ");
string nacionalidad = Console.ReadLine();

if (edad >= 18 && nacionalidad == "colombiano")
{
    Console.WriteLine("Puedes votar en las elecciones.");
}
else if (edad < 18)
{
    Console.WriteLine("No puedes votar. Debes tener al menos 18 años.");
}
else
{
    Console.WriteLine("No puedes votar. Solo colombianos pueden votar.");
}
```

El orden de los `else if` puede variar. Lo importante es que la condición principal (edad >= 18 Y colombiano) se evalúe primero.

---

### 2.2 ¿Cómo se maneja la división entre cero en la calculadora?

En el ejemplo guiado de la clase, la división entre cero se controla con un `if` dentro del `case 4`:

```csharp
case 4:
    if (num2 != 0)
    {
        resultado = num1 / num2;
        operacion = "división";
    }
    else
    {
        Console.WriteLine("Error: No se puede dividir entre cero.");
        return;  // Sale del programa
    }
    break;
```

`return` dentro de `Main` termina el programa. Si no usaras `return`, la variable `resultado` quedaría sin valor y la línea final del programa daría error.

---

## 3. Tabla comparativa de estructuras condicionales

| Estructura | ¿Qué hace? | Cuándo usarla |
|------------|------------|---------------|
| `if` | Ejecuta código si una condición es verdadera | Una sola condición |
| `if/else` | Elige entre dos bloques | Decisión binaria |
| `if/else if/else` | Evalúa múltiples condiciones en orden | Varias condiciones relacionadas |
| `? :` | Devuelve un valor entre dos opciones | Asignación condicional simple |
| `switch` | Compara una variable contra varios valores fijos | 3+ valores fijos para la misma variable |

---

## 4. Errores comunes

| Error | Ejemplo incorrecto | Corrección |
|-------|--------------------|------------|
| Usar `=` en lugar de `==` | `if (edad = 18)` | `if (edad == 18)` |
| Poner `;` después del `if` | `if (edad >= 18);` | `if (edad >= 18)` |
| Olvidar `break` en `switch` | `case 1: ...` sin `break;` | `case 1: ... break;` |
| Condiciones en mal orden en `else if` | `if (nota >= 50)` antes que `if (nota >= 70)` | Ordenar de mayor a menor |
| Else con condición | `else (edad > 18)` | Usar `else if (edad > 18)` |
| Olvidar paréntesis en condición | `if edad >= 18` | `if (edad >= 18)` |

---

## 5. Resumen de la clase

Las condicionales permiten que el programa tome decisiones.

`if` evalúa una condición y ejecuta un bloque si es verdadera:

```csharp
if (edad >= 18)
{
    Console.WriteLine("Mayor de edad");
}
```

`if/else` elige entre dos caminos:

```csharp
if (edad >= 18)
{
    Console.WriteLine("Mayor de edad");
}
else
{
    Console.WriteLine("Menor de edad");
}
```

`if/else if/else` evalúa múltiples condiciones en orden:

```csharp
if (nota >= 90)
    Console.WriteLine("Excelente");
else if (nota >= 70)
    Console.WriteLine("Aprobado");
else
    Console.WriteLine("Reprobado");
```

`switch` compara una variable contra múltiples valores:

```csharp
switch (opcion)
{
    case 1: Console.WriteLine("Uno"); break;
    case 2: Console.WriteLine("Dos"); break;
    default: Console.WriteLine("Otro"); break;
}
```

Operador ternario para asignaciones simples:

```csharp
string estado = (edad >= 18) ? "Mayor" : "Menor";
```

El orden de las condiciones importa. Las llaves `{}` son obligatorias para bloques con más de una instrucción. Usa `&&` para "y", `||` para "o", `!` para negación.
