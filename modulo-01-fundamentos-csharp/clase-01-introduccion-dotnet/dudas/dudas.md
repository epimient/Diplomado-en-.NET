# Dudas — Clase 01: Introducción a .NET, C# y el primer programa

*Espacio para anotar preguntas y notas de clase.*

---

## 1. Dudas conceptuales frecuentes

### 1.1 ¿.NET es lo mismo que C#?

**No.** .NET es la **plataforma** (la caja de herramientas completa). C# es el **lenguaje** (el idioma que escribes). Es como confundir una cocina con una receta.

- La forma correcta de decirlo es: *"Estoy programando en C# usando la plataforma .NET"*.
- .NET también soporta otros lenguajes como F# y Visual Basic.

### 1.2 ¿Para qué sirve el CLR si yo solo escribo mi código?

El CLR (Common Language Runtime) es el **motor que ejecuta tu código**. Se encarga de:

- **Gestionar memoria** (asignar y liberar RAM automáticamente).
- **Manejar errores** (evita que el programa colapse si algo sale mal).
- **Traducir código** a instrucciones que tu procesador específico entiende (usando el compilador JIT).

Sin él, tu código sería solo texto inútil en un archivo.

### 1.3 ¿Qué es el código intermedio (IL)?

.NET no compila directamente a binario. Tu código C# se traduce primero a un **lenguaje intermedio (IL)**, que es universal para cualquier computadora con .NET instalado. Luego, el CLR y el JIT lo traducen a código máquina específico de tu procesador (Intel, AMD, Apple Silicon).

Es como un "esperanto" de .NET: un lenguaje que todos los sistemas entienden antes de la traducción final.

### 1.4 ¿Si .NET es multiplataforma, por qué antes solo funcionaba en Windows?

**.NET Framework** (2002-2016) **solo** funcionaba en Windows. **.NET Core** (2016) fue la revolución multiplataforma. Hoy, **.NET moderno** (5, 6, 7, 8, 9, 10) unificó ambos mundos en una sola plataforma.

Si aprendes .NET hoy, estás aprendiendo la versión moderna y multiplataforma.

### 1.5 ¿El Garbage Collector borra mis variables sin que yo quiera?

**No borra lo que estás usando.** Solo libera memoria de objetos que **ya no tienen referencias activas**. Es como un mesero que recoge platos vacíos de tu mesa, no los que estás usando en ese momento.

### 1.6 ¿Cuál es la diferencia entre SDK y Runtime?

| Componente | Qué hace | Para quién es |
| :--- | :--- | :--- |
| **Runtime** | Ejecuta programas de .NET | El usuario final |
| **SDK** | Herramientas para **crear** programas (compilador, plantillas, etc.) | Los desarrolladores (nosotros) |

**En este diplomado necesitas el SDK.** Si ya lo instalaste, tienes todo lo que necesitas.

---

## 2. Dudas de instalación y terminal

### 2.1 Me sale "dotnet: command not found"

**Causa**: El SDK no está instalado, o no reiniciaste la terminal después de instalarlo.

**Solución**:
1. Descarga e instala desde [dotnet.microsoft.com](https://dotnet.microsoft.com/).
2. **Cierra y vuelve a abrir** la terminal (esto es clave).
3. Verifica con `dotnet --version`.

### 2.2 ¿Qué terminal debo usar?

- **Windows**: PowerShell o Símbolo del sistema.
- **macOS**: Terminal (aplicación predeterminada).
- **Linux**: Terminal (predeterminado).
- **Alternativa cómoda**: La terminal integrada de VS Code (abre con `Ctrl + ~`).

### 2.3 No puedo correr `dotnet run` desde mi escritorio

Debes estar **dentro de la carpeta del proyecto** (donde está el archivo `.csproj`). Usa `pwd` para verificar tu ubicación y `cd NombreCarpeta` para entrar a la carpeta correcta.

### 2.4 No veo la carpeta `bin/` después de crear el proyecto

La carpeta `bin/` solo aparece **después** de compilar o ejecutar (`dotnet build` o `dotnet run`). Antes de eso, simplemente no existe. Es normal.

---

## 3. Dudas de sintaxis C#

### 3.1 ¿Por qué necesito punto y coma al final?

En C#, casi todas las instrucciones terminan con `;` para indicarle al compilador que la orden terminó. Sin él, el compilador se confunde y no sabe dónde empieza y termina cada instrucción.

### 3.2 ¿Por qué `Console` va con C mayúscula?

C# es **sensible a mayúsculas** (case sensitive). `Console`, `console` y `CONSOLE` son cosas completamente diferentes para el compilador. La clase del sistema se llama `Console` con **C mayúscula**.

### 3.3 ¿Qué pasa si olvido las comillas en un texto?

```csharp
// INCORRECTO - Error de compilación
Console.WriteLine(Hola);

// CORRECTO
Console.WriteLine("Hola");
```

Sin comillas, el compilador cree que `Hola` es una variable o instrucción que no existe.

### 3.4 ¿Para qué sirve el `$` antes de las comillas?

Activa la **interpolación de cadenas**. Sin el `$`, las llaves `{}` son solo texto plano. Con el `$`, puedes insertar variables directamente:

```csharp
string nombre = "Ana";
Console.WriteLine($"Hola, {nombre}!");  // Salida: Hola, Ana!
Console.WriteLine("Hola, {nombre}!");   // Salida: Hola, {nombre}!
```

### 3.5 ¿Qué es `??` en `Console.ReadLine() ?? ""`?

Es el **operador de fusión de nulos**. Si `ReadLine()` devuelve `null` (nada, porque el usuario presionó Enter sin escribir), usa el valor de la derecha (`""`). Protege contra errores.

### 3.6 ¿Por qué mi variable `edad` es `string` si es un número?

En la clase 1 guardamos todo como `string` para enfocarnos en la lógica básica sin complicaciones. En la **clase 2** veremos tipos numéricos (`int`, `double`, `decimal`) y cómo convertir entre tipos.

### 3.7 ¿Puedo sumar dos strings como `"10" + "20"`?

**Sí, pero no suma matemáticamente.** Concatena (une) los textos:

```csharp
string resultado = "10" + "20";
// resultado = "1020" (no 30)
```

Para sumar números reales, necesitas tipos numéricos (`int`, `double`), que veremos en la clase 2.

---

## 4. Mini-guía: Condicionales `if` y `switch`

*Esta sección te ayuda a resolver el ejercicio 3 (reto). Si ya programaste antes, te será familiar. Si no, no te preocupes: la clase 3 las explica en detalle.*

### 4.1 Sintaxis de `if` / `else if` / `else`

```csharp
if (condicion)
{
    // Se ejecuta si la condición es VERDADERA
}
else if (otra_condicion)
{
    // Se ejecuta si la primera es falsa y esta es verdadera
}
else
{
    // Se ejecuta si NINGUNA de las anteriores es verdadera
}
```

**Ejemplo práctico para el reto:**

```csharp
Console.Write("Elige una opción: ");
string opcion = Console.ReadLine() ?? "";

if (opcion == "1")
{
    Console.Write("¿Cómo te llamas? ");
    string nombre = Console.ReadLine() ?? "";
    Console.WriteLine($"¡Hola, {nombre}!");
}
else if (opcion == "2")
{
    Console.WriteLine($"Fecha y hora: {DateTime.Now}");
}
else if (opcion == "3")
{
    Console.WriteLine("¡Hasta luego!");
}
else
{
    Console.WriteLine("Opción no válida");
}
```

**Puntos clave:**
- `==` compara dos valores (no confundir con `=` que asigna).
- Las comparaciones son **case sensitive**: `"1"` es diferente de `"1 "`.
- `Console.ReadLine()` siempre devuelve `string`, así que comparamos el resultado con texto.

### 4.2 Sintaxis de `switch`

```csharp
switch (variable)
{
    case "valor1":
        // Código si la variable vale "valor1"
        break;
    case "valor2":
        // Código si la variable vale "valor2"
        break;
    default:
        // Código si no coincide con ningún case
        break;
}
```

**Ejemplo práctico para el reto:**

```csharp
Console.Write("Elige una opción: ");
string opcion = Console.ReadLine() ?? "";

switch (opcion)
{
    case "1":
        Console.Write("¿Cómo te llamas? ");
        string nombre = Console.ReadLine() ?? "";
        Console.WriteLine($"¡Hola, {nombre}!");
        break;
    case "2":
        Console.WriteLine($"Fecha y hora: {DateTime.Now}");
        break;
    case "3":
        Console.WriteLine("¡Hasta luego!");
        break;
    default:
        Console.WriteLine("Opción no válida");
        break;
}
```

**Puntos clave:**
- Cada `case` debe terminar con `break` (salir del switch).
- `default` es como el `else`: se ejecuta si nada coincide.
- `switch` es ideal cuando comparas una misma variable contra muchos valores.

### 4.3 ¿Qué es `DateTime.Now`?

Es una propiedad de C# que devuelve la **fecha y hora actuales** del sistema:

```csharp
Console.WriteLine(DateTime.Now);
// Salida: 14/07/2026 10:35:22 AM
```

No necesitas importar nada especial. Solo úsalo directamente.

---

## 5. Tips para resolver el ejercicio 3 (reto)

1. **Primero muestra el menú** con `Console.WriteLine`.
2. **Lee la opción** del usuario con `Console.ReadLine() ?? ""`.
3. **Usa `if` o `switch`** para ejecutar la acción según la opción.
4. **Maneja opciones inválidas** (si el usuario escribe algo que no es 1, 2 o 3).
5. **Usa `DateTime.Now`** para la opción 2.
6. **Usa interpolación** (`$"..."`) para mostrar mensajes con el nombre del usuario.

---

## 6. Dudas filosóficas

### 6.1 ¿Por qué no usamos Visual Studio en lugar de VS Code?

Visual Studio (IDE completo) es pesado y solo funciona bien en Windows. **VS Code + terminal** es ligero, multiplataforma y más cercano al entorno profesional real (Linux, servidores, DevOps).

### 6.2 ¿Para qué sirve la terminal si tengo botones?

En el desarrollo profesional, la terminal es fundamental porque:
- Es **idéntica** en todos los sistemas operativos.
- Permite **automatización** (DevOps, despliegues automáticos).
- Te hace **entender** el proceso real de compilación.

### 6.3 ¿Cuándo veremos bases de datos y APIs?

En la **semana 3** (Módulo 3: ASP.NET Core). La semana 1 sienta las bases necesarias para llegar preparado.

---

## 7. Nota para el instructor

**Desfase detectado**: El ejercicio 3 (reto) en `ejercicios/ejercicio-03-reto.md` pide usar `if` o `switch`, temas que se dan formalmente en la **clase 03**. Sin embargo, como los estudiantes ya vienen con experiencia previa en programación y conocen condicionales, se agregó la mini-guía de sintaxis en la sección 4 para que puedan resolver el reto sin problema.
