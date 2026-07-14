# Clase 08 — Herencia

## Objetivos

- Comprender el concepto de herencia en POO
- Crear clases base y derivadas
- Usar la palabra clave `base`
- Sobrescribir métodos con `virtual` y `override`
- Evitar sobrescritura con `sealed`

---

## 1. ¿Qué es herencia?

La **herencia** permite crear una nueva clase a partir de una existente, heredando sus campos, propiedades y métodos.

### Relación "es un"

```csharp
class Animal { }
class Perro : Animal { }  // Perro ES UN Animal
class Gato : Animal { }   // Gato ES UN Animal
```

### Beneficios

- **Reutilización**: código compartido en la clase base
- **Jerarquía**: organización natural de conceptos
- **Extensibilidad**: agregar comportamiento sin modificar lo existente

---

## 2. Sintaxis

```csharp
class ClaseBase
{
    // miembros
}

class ClaseDerivada : ClaseBase
{
    // miembros propios + heredados
}
```

---

## 3. Ejemplo básico

```csharp
class Animal
{
    public string Nombre { get; set; }
    public int Edad { get; set; }

    public void Dormir()
    {
        Console.WriteLine($"{Nombre} está durmiendo.");
    }
}

class Perro : Animal
{
    public void Ladrar()
    {
        Console.WriteLine($"{Nombre} dice: ¡Guau!");
    }
}

class Gato : Animal
{
    public void Maullar()
    {
        Console.WriteLine($"{Nombre} dice: ¡Miau!");
    }
}
```

Uso:

```csharp
Perro perro = new Perro();
perro.Nombre = "Max";
perro.Edad = 3;
perro.Dormir();   // Heredado de Animal
perro.Ladrar();   // Propio de Perro
```

---

## 4. La palabra `base`

`base` permite acceder a miembros de la clase base desde la clase derivada.

### Llamar al constructor base

```csharp
class Animal
{
    public string Nombre { get; }

    public Animal(string nombre)
    {
        Nombre = nombre;
    }
}

class Perro : Animal
{
    public string Raza { get; }

    public Perro(string nombre, string raza) : base(nombre)
    {
        Raza = raza;
    }
}
```

```csharp
Perro p = new Perro("Max", "Labrador");
```

> Si la clase base no tiene constructor sin parámetros, la derivada DEBE llamar a `base(...)`.

---

## 5. Sobrescritura de métodos (`virtual` / `override`)

### Método `virtual` en la base

```csharp
class Animal
{
    public virtual void HacerSonido()
    {
        Console.WriteLine("El animal hace un sonido.");
    }
}
```

### `override` en la derivada

```csharp
class Perro : Animal
{
    public override void HacerSonido()
    {
        Console.WriteLine("¡Guau!");
    }
}

class Gato : Animal
{
    public override void HacerSonido()
    {
        Console.WriteLine("¡Miau!");
    }
}
```

Uso:

```csharp
Animal[] animales = { new Perro(), new Gato(), new Animal() };
foreach (Animal a in animales)
{
    a.HacerSonido();
}
// ¡Guau!
// ¡Miau!
// El animal hace un sonido.
```

---

## 6. `sealed` — Evitar herencia o sobrescritura

### Clase sellada (no se puede heredar)

```csharp
sealed class Perro : Animal { }
// class PastorAleman : Perro { }  // ERROR: Perro es sealed
```

### Método sellado (no se puede sobrescribir de nuevo)

```csharp
class Perro : Animal
{
    public sealed override void HacerSonido()
    {
        Console.WriteLine("¡Guau!");
    }
}
```

---

## 7. Constructores y herencia

Reglas importantes:

1. La clase derivada siempre llama al constructor de la base
2. Si la base tiene un constructor sin parámetros, se llama implícitamente
3. Si la base NO tiene constructor sin parámetros, la derivada debe usar `base(...)`

```csharp
class Empleado
{
    public string Nombre { get; }
    public double SalarioBase { get; }

    public Empleado(string nombre, double salarioBase)
    {
        Nombre = nombre;
        SalarioBase = salarioBase;
    }
}

class Gerente : Empleado
{
    public double Bono { get; }

    public Gerente(string nombre, double salarioBase, double bono)
        : base(nombre, salarioBase)
    {
        Bono = bono;
    }
}
```

---

## 8. Protected

El modificador `protected` permite acceso desde la clase base y sus derivadas, pero no desde código externo.

```csharp
class Animal
{
    protected string especie = "Desconocida";
}

class Perro : Animal
{
    public void MostrarEspecie()
    {
        Console.WriteLine(especie);  // OK: heredado
    }
}
```

---

## Resumen

```csharp
// Clase base
class Animal
{
    public virtual void HacerSonido() { }
}

// Herencia + override
class Perro : Animal
{
    public override void HacerSonido() { }
}

// Constructor base
public Perro(string n) : base(n) { }

// Sealed
sealed class ClaseFinal { }
```
