# Dudas — Clase 07

## ¿Campo público o propiedad?

Usar **propiedad** siempre que el miembro sea accesible desde fuera:

```csharp
// ❌ Evitar
public string Nombre;

// ✅ Correcto
public string Nombre { get; set; }
```

Las propiedades permiten cambiar la implementación interna (validación, logging, cálculo) sin romper el código externo.

---

## ¿Qué es `value` en un setter?

`value` es una palabra clave contextual que representa el valor que se asigna:

```csharp
public string Nombre
{
    set
    {
        // value contiene "Ana" si haces: p.Nombre = "Ana";
        if (!string.IsNullOrWhiteSpace(value))
            nombre = value;
    }
}
```

Solo existe dentro del bloque `set` (y de `add`/`remove` en eventos).

---

## Propiedad autoimplementada vs completa

| Situación | Usar |
|-----------|------|
| Sin lógica extra | `public string Nombre { get; set; }` |
| Con validación | Propiedad completa con backing field |
| Solo lectura desde constructor | `public string Nombre { get; }` |
| Solo lectura con init | `public string Nombre { get; init; }` |

La autoimplementada genera el campo de respaldo automáticamente. La completa lo declara explícito.

---

## Diferencia entre `{ get; }`, `{ get; private set; }` e `init`

```csharp
public string A { get; }             // Solo asignable en constructor
public string B { get; private set; } // Asignable en cualquier método de la clase
public string C { get; init; }        // Asignable en constructor + object initializer
```

- `{ get; }` → inmutable después del constructor
- `{ get; private set; }` → la clase puede modificarlo internamente
- `{ get; init; }` → se asigna al crear el objeto (C# 9+)

---

## Validación en setters

Patrón recomendado:

```csharp
private double salario;
public double Salario
{
    get { return salario; }
    set
    {
        if (value < 0)
            throw new ArgumentException("El salario no puede ser negativo");
        salario = value;
    }
}
```

Lanzar `ArgumentException` (no solo `Exception`) para que quien llama sepa qué pasó.

---

## Propiedades computadas (expression-bodied)

No tienen backing field. Se evalúan en tiempo real:

```csharp
public double Area => Base * Altura;
// Equivale a:
public double Area { get { return Base * Altura; } }
```

Ventaja: siempre reflectan el valor actual. Desventaja: se recalcula en cada acceso.

---

## ¿`init` o constructor?

```csharp
// Opción 1: constructor con parámetros
public class Producto
{
    public string Codigo { get; }
    public Producto(string codigo) { Codigo = codigo; }
}

// Opción 2: init + object initializer
public class Producto
{
    public string Codigo { get; init; }
}
// new Producto { Codigo = "P001" };
```

`init` es más flexible para object initializers y útil en DTOs. El constructor es mejor cuando hay lógica de validación en la creación.

---

## Resumen rápido

- Campo privado + propiedad pública = encapsulamiento
- `get` para leer, `set` para escribir, `value` para el nuevo valor
- Autoimplementada si no hay lógica extra
- Computada si el valor se deriva de otros datos
- Validar en setter con `if` y `ArgumentException`
- Usar `init` para datos inmutables desde la creación
