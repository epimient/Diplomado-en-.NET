# Dudas — Clase 08

## ¿Qué hereda exactamente una clase derivada?

La clase derivada hereda **campos, propiedades y métodos** de la clase base, excepto los constructores:

```csharp
class Animal
{
    public string Nombre { get; set; }     // ✅ se hereda
    protected int edad;                     // ✅ se hereda (accesible en derivadas)
    private string id = "A001";             // ❌ existe pero NO es accesible

    public void Dormir() { }               // ✅ se hereda
    public Animal(string nombre) { }       // ❌ NO se hereda
}
```

Regla: los constructores no se heredan, pero siempre se ejecutan en cadena (de la base hacia la derivada).

---

## ¿C# soporta herencia múltiple?

**No.** C# solo permite heredar de **una clase base**:

```csharp
class Animal { }
class Mascota { }

// ❌ ERROR: no se puede heredar de dos clases
// class Perro : Animal, Mascota { }

// ✅ Correcto: una clase + múltiples interfaces
class Perro : Animal, IEncendible, INadador { }
```

Si necesitas combinar comportamiento de varias fuentes, usa **interfaces** (clase 09).

---

## ¿Cuándo debo usar `base`?

`base` se usa para acceder a miembros de la clase base desde la derivada. Los dos usos principales:

### 1. Llamar al constructor de la base

```csharp
class Animal
{
    public string Nombre { get; }
    public Animal(string nombre) { Nombre = nombre; }
}

class Perro : Animal
{
    public string Raza { get; }

    // base(nombre) llama al constructor de Animal
    public Perro(string nombre, string raza) : base(nombre)
    {
        Raza = raza;
    }
}
```

### 2. Llamar al método original al sobrescribir

```csharp
class Animal
{
    public virtual void Presentarse()
    {
        Console.WriteLine($"Soy un animal");
    }
}

class Perro : Animal
{
    public override void Presentarse()
    {
        base.Presentarse(); // Ejecuta el de Animal primero
        Console.WriteLine("...y soy un perro");
    }
}
// Salida:
// Soy un animal
// ...y soy un perro
```

---

## ¿Qué pasa si la base no tiene constructor sin parámetros?

La clase derivada **debe** llamar explícitamente a `base(...)`, de lo contrario no compila:

```csharp
class Animal
{
    public Animal(string nombre) { } // No hay constructor sin parámetros
}

// ❌ ERROR: Animal no tiene constructor sin parámetros
class Perro : Animal
{
    public Perro() { }
}

// ✅ Correcto
class Perro : Animal
{
    public Perro(string nombre) : base(nombre) { }
}
```

> Si la base tiene un constructor sin parámetros (o no define ningún constructor), la llamada a `base()` es implícita.

---

## Diferencia entre `virtual`, `override` y `new`

| Palabra clave | Dónde se usa | Qué hace |
|---------------|-------------|----------|
| `virtual` | Clase base | Marca un método como sobrescribible |
| `override` | Clase derivada | Reemplaza la implementación del método virtual |
| `new` | Clase derivada | **Oculta** el método de la base (no lo reemplaza) |

### El problema con `new` (hiding)

```csharp
class Animal
{
    public virtual void HacerSonido()
    {
        Console.WriteLine("Sonido genérico");
    }
}

class Perro : Animal
{
    public new void HacerSonido() // Oculta, NO sobrescribe
    {
        Console.WriteLine("¡Guau!");
    }
}

Animal a = new Perro();
a.HacerSonido(); // "Sonido genérico" ← ¡Sorpresa!

Perro p = new Perro();
p.HacerSonido(); // "¡Guau!"
```

Con `override`, el resultado sería `"¡Guau!"` en ambos casos. **Usa siempre `override`** en lugar de `new` salvo que tengas una razón específica.

---

## ¿Para qué sirve `sealed`?

`sealed` **bloquea** la herencia o la sobrescritura:

### Clase sellada — nadie puede heredar de ella

```csharp
sealed class ConexionBD
{
    public void Conectar() { }
}

// ❌ ERROR: no se puede heredar de ConexionBD
// class MiConexion : ConexionBD { }
```

### Método sellado — nadie puede volver a sobrescribir

```csharp
class Animal
{
    public virtual void HacerSonido() { }
}

class Perro : Animal
{
    public sealed override void HacerSonido()
    {
        Console.WriteLine("¡Guau!");
    }
}

class Cachorro : Perro
{
    // ❌ ERROR: HacerSonido está sealed en Perro
    // public override void HacerSonido() { }
}
```

### ¿Cuándo usar `sealed`?

- Clases de utilidad que no deben extenderse
- Métodos cuya implementación no debe cambiar más en la cadena
- Optimización: el compilador puede optimizar llamadas a métodos sellados

---

## ¿Cuándo usar `protected` vs `private` vs `public`?

| Modificador | Accesible desde la propia clase | Desde derivadas | Desde código externo |
|-------------|-------------------------------|-----------------|---------------------|
| `private` | ✅ | ❌ | ❌ |
| `protected` | ✅ | ✅ | ❌ |
| `public` | ✅ | ✅ | ✅ |

### Regla práctica

```csharp
class CuentaBancaria
{
    private string pin;              // Solo esta clase
    protected double saldo;          // Esta clase + derivadas
    public string Titular { get; }   // Todos
}

class CuentaAhorro : CuentaBancaria
{
    public void MostrarSaldo()
    {
        // Console.WriteLine(pin);   // ❌ private
        Console.WriteLine(saldo);    // ✅ protected
        Console.WriteLine(Titular);  // ✅ public
    }
}
```

Usa `protected` cuando necesites que las derivadas accedan al dato pero el exterior no.

---

## ¿El orden de ejecución de constructores importa?

Sí. Los constructores se ejecutan **de la clase base hacia la derivada**:

```csharp
class Animal
{
    public Animal()
    {
        Console.WriteLine("Constructor de Animal");
    }
}

class Perro : Animal
{
    public Perro()
    {
        Console.WriteLine("Constructor de Perro");
    }
}

class Cachorro : Perro
{
    public Cachorro()
    {
        Console.WriteLine("Constructor de Cachorro");
    }
}

new Cachorro();
// Constructor de Animal
// Constructor de Perro
// Constructor de Cachorro
```

Siempre se inicializa primero la base para garantizar que el estado heredado esté listo.

---

## ¿Puedo acceder a miembros privados de la base?

**No directamente.** Pero puedes acceder a ellos a través de propiedades o métodos `public`/`protected`:

```csharp
class Animal
{
    private int energia = 100;

    protected int Energia => energia;  // La derivada lee con esto

    public void Descansar()
    {
        energia += 20;
    }
}

class Perro : Animal
{
    public void MostrarEstado()
    {
        // Console.WriteLine(energia);  // ❌ private
        Console.WriteLine(Energia);     // ✅ protected property
    }
}
```

---

## ¿Cuándo usar herencia vs composición?

| Criterio | Herencia ("es un") | Composición ("tiene un") |
|----------|-------------------|------------------------|
| Relación | Perro **es un** Animal | Auto **tiene un** Motor |
| Acoplamiento | Alto (cambios en la base afectan derivadas) | Bajo (objetos independientes) |
| Flexibilidad | Rígida (jerarquía fija) | Flexible (intercambiable) |
| Cuándo usar | Taxonomía natural clara | Combinar capacidades |

```csharp
// ✅ Herencia: relación natural
class Gato : Animal { }

// ✅ Composición: un auto TIENE un motor, no ES un motor
class Auto
{
    private Motor motor = new Motor();

    public void Arrancar()
    {
        motor.Encender();
    }
}
```

> **Principio**: preferir composición sobre herencia cuando la relación "es un" no sea evidente.

---

## Resumen rápido

- Herencia: crear una clase a partir de otra con `class Derivada : Base`
- `base`: acceder al constructor o métodos de la clase base
- `virtual` + `override`: sobrescribir comportamiento
- `new`: oculta (evitar, preferir `override`)
- `sealed`: bloquear herencia o sobrescritura
- `protected`: accesible en la clase y derivadas, no desde fuera
- Constructores se ejecutan de base a derivada
- C# no permite herencia múltiple de clases (sí de interfaces)
- Preferir composición cuando la relación "es un" no sea clara
