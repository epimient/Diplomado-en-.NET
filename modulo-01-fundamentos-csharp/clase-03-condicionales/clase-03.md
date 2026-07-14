# Clase 03 — Condicionales

## Objetivos

- Tomar decisiones con `if`, `else if` y `else`
- Usar el operador ternario
- Evaluar múltiples casos con `switch`
- Anidar condicionales correctamente

---

## 1. Sentencia `if`

Evalúa una condición booleana y ejecuta un bloque si es `true`.

```csharp
int edad = 18;

if (edad >= 18)
{
    Console.WriteLine("Eres mayor de edad");
}
```

---

## 2. `if` / `else`

```csharp
int edad = 15;

if (edad >= 18)
{
    Console.WriteLine("Eres mayor de edad");
}
else
{
    Console.WriteLine("Eres menor de edad");
}
```

---

## 3. `if` / `else if` / `else`

```csharp
int nota = 85;

if (nota >= 90)
{
    Console.WriteLine("Excelente");
}
else if (nota >= 70)
{
    Console.WriteLine("Aprobado");
}
else
{
    Console.WriteLine("Reprobado");
}
```

> El orden importa: las condiciones se evalúan de arriba a abajo. La primera que cumple ejecuta su bloque.

---

## 4. Operador ternario `? :`

Forma compacta de un `if/else` que devuelve un valor.

```csharp
int edad = 20;
string mensaje = (edad >= 18) ? "Mayor de edad" : "Menor de edad";
Console.WriteLine(mensaje);
```

Estructura:

```
condición ? valor_si_true : valor_si_false
```

---

## 5. `switch`

Evalúa una variable contra múltiples valores.

```csharp
string dia = "lunes";

switch (dia)
{
    case "lunes":
        Console.WriteLine("Inicio de semana");
        break;
    case "viernes":
        Console.WriteLine("Último día laboral");
        break;
    case "sabado":
    case "domingo":
        Console.WriteLine("Fin de semana");
        break;
    default:
        Console.WriteLine("Día laboral");
        break;
}
```

- Cada `case` termina con `break`
- `default` ejecuta si ningún caso coincide
- Múltiples `case` pueden compartir un mismo bloque

---

## 6. `switch` con expresión (C# 8+)

```csharp
string dia = "lunes";
string tipo = dia switch
{
    "sabado" or "domingo" => "Fin de semana",
    "lunes" => "Inicio de semana",
    _ => "Día laboral"
};
Console.WriteLine(tipo);
```

- `_` representa el caso default
- `or` agrupa múltiples valores

---

## 7. Condicionales anidados

```csharp
int edad = 25;
bool tieneLicencia = true;

if (edad >= 18)
{
    if (tieneLicencia)
    {
        Console.WriteLine("Puede conducir");
    }
    else
    {
        Console.WriteLine("Debe obtener licencia primero");
    }
}
else
{
    Console.WriteLine("No tiene edad para conducir");
}
```

> Evitar anidar más de 2-3 niveles. Si es necesario, extraer a métodos.

---

## 8. Buenas prácticas

- Usar `else if` en lugar de `if` anidados cuando sea posible
- Preferir `switch` para 3+ comparaciones del mismo valor
- El ternario es para expresiones simples, no para lógica compleja
- Ser explícito con las condiciones (ej. `if (activo == true)` en vez de `if (activo)` es cuestión de preferencia, pero ser consistente)

---

## Resumen

| Estructura | Cuándo usarla |
|------------|---------------|
| `if` / `else if` / `else` | Decisiones con condiciones variadas |
| `? :` | Asignación condicional simple |
| `switch` | Múltiples valores fijos para una variable |
