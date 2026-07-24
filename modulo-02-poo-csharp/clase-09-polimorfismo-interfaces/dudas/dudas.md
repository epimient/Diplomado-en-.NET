# Dudas — Clase 09

## ¿Qué es el polimorfismo en palabras simples?

Es la capacidad de tratar objetos diferentes **a través de una referencia común** y que cada uno responda a su manera:

```csharp
Animal[] animales = { new Perro(), new Gato(), new Pato() };

foreach (Animal a in animales)
{
    a.HacerSonido(); // Cada animal ejecuta SU versión
}
// ¡Guau!
// ¡Miau!
// ¡Cuac!
```

La variable `a` es de tipo `Animal`, pero en tiempo de ejecución se resuelve el método según el **tipo real** del objeto.

---

## ¿Cuál es la diferencia entre clase abstracta e interfaz?

| Aspecto | Clase abstracta | Interfaz |
|---------|----------------|----------|
| Se puede instanciar | ❌ No | ❌ No |
| Puede tener código | ✅ Métodos concretos + abstractos | ❌ Solo declaraciones |
| Constructores | ✅ Sí | ❌ No |
| Campos | ✅ Sí | ❌ Solo propiedades |
| Herencia múltiple | ❌ Una sola clase base | ✅ Múltiples interfaces |
| Relación | "es un" (taxonomía) | "puede hacer" (capacidad) |

### Ejemplo intuitivo

```csharp
// Clase abstracta → relación jerárquica
abstract class Animal { }
class Perro : Animal { }  // Perro ES UN Animal

// Interfaz → capacidad transversal
interface IVolador { void Volar(); }
class Avion : IVolador { }  // Avion PUEDE volar
class Pato : Animal, IVolador { }  // Pato ES UN Animal Y PUEDE volar
```

---

## ¿Por qué no puedo instanciar una clase abstracta?

Porque una clase abstracta puede tener **métodos sin implementación**. Si pudiera instanciarse, ¿qué ejecutaría al llamar ese método?

```csharp
abstract class Figura
{
    public abstract double CalcularArea(); // ← No hay cuerpo
}

// ❌ ERROR: no se puede instanciar
// Figura f = new Figura();
// f.CalcularArea(); // ¿Qué haría?

// ✅ Correcto: instanciar una derivada que SÍ implementa
class Circulo : Figura
{
    public double Radio { get; set; }

    public override double CalcularArea()
    {
        return Math.PI * Radio * Radio;
    }
}

Figura f = new Circulo { Radio = 5 };
Console.WriteLine(f.CalcularArea()); // 78.54
```

> Puedes usar `Figura` como tipo de referencia, pero el objeto real siempre será una clase concreta.

---

## ¿Cuándo usar clase abstracta y cuándo interfaz?

### Usa clase abstracta cuando:

- Hay una **jerarquía clara** ("es un")
- Quieres compartir **código común** entre derivadas
- Las derivadas comparten **estado** (campos, propiedades)

```csharp
abstract class Empleado
{
    public string Nombre { get; set; }
    public double SalarioBase { get; set; }

    // Código compartido
    public void MostrarInfo()
    {
        Console.WriteLine($"{Nombre} - Salario: {SalarioBase:C}");
    }

    // Cada tipo calcula su salario diferente
    public abstract double CalcularSalario();
}
```

### Usa interfaz cuando:

- Clases **no relacionadas** comparten un comportamiento
- Necesitas que una clase cumpla **múltiples contratos**
- Quieres definir un **contrato puro** sin implementación

```csharp
interface IExportable
{
    string ExportarCSV();
}

// Clases no relacionadas, misma capacidad
class Producto : IExportable { ... }
class Cliente : IExportable { ... }
class Factura : IExportable { ... }
```

---

## ¿Cómo funciona una interfaz como tipo?

Cuando usas una interfaz como tipo de variable, solo puedes acceder a los métodos de **esa interfaz**, sin importar qué más tenga la clase:

```csharp
interface IEncendible
{
    void Encender();
    void Apagar();
}

class Auto : IEncendible
{
    public void Encender() { Console.WriteLine("Auto encendido"); }
    public void Apagar() { Console.WriteLine("Auto apagado"); }
    public void Acelerar() { Console.WriteLine("Acelerando"); }
}

IEncendible dispositivo = new Auto();
dispositivo.Encender();    // ✅ definido en IEncendible
dispositivo.Apagar();      // ✅ definido en IEncendible
// dispositivo.Acelerar(); // ❌ ERROR: IEncendible no conoce Acelerar

// Si necesitas acceder a Acelerar, haz casting:
Auto auto = (Auto)dispositivo;
auto.Acelerar(); // ✅
```

---

## ¿Qué pasa si no implemento todos los métodos de una interfaz?

**Error de compilación.** Si una clase implementa una interfaz, **debe** implementar **todos** sus miembros:

```csharp
interface IEncendible
{
    void Encender();
    void Apagar();
}

// ❌ ERROR: Auto no implementa 'Apagar'
class Auto : IEncendible
{
    public void Encender() { }
    // Falta Apagar()
}

// ✅ Correcto: implementar todo
class Auto : IEncendible
{
    public void Encender() { Console.WriteLine("Encendido"); }
    public void Apagar() { Console.WriteLine("Apagado"); }
}
```

> Excepción: si la clase es `abstract`, puede dejar métodos de la interfaz como `abstract` para que los implementen sus derivadas.

---

## ¿Puedo implementar múltiples interfaces?

**Sí.** Esa es una de las ventajas principales de las interfaces:

```csharp
interface IVolador
{
    void Volar();
}

interface INadador
{
    void Nadar();
}

interface ICorredor
{
    void Correr();
}

class SuperHeroe : IVolador, INadador, ICorredor
{
    public void Volar() { Console.WriteLine("Volando"); }
    public void Nadar() { Console.WriteLine("Nadando"); }
    public void Correr() { Console.WriteLine("Corriendo"); }
}
```

También puedes combinar herencia de clase con interfaces:

```csharp
class Pato : Animal, IVolador, INadador
{
    public override void HacerSonido() { Console.WriteLine("¡Cuac!"); }
    public void Volar() { Console.WriteLine("El pato vuela"); }
    public void Nadar() { Console.WriteLine("El pato nada"); }
}
```

> La clase base va **primero**, luego las interfaces separadas por coma.

---

## ¿Qué pasa si dos interfaces tienen un método con el mismo nombre?

Usa **implementación explícita** para resolver el conflicto:

```csharp
interface IArma
{
    void Atacar();
}

interface IHerramienta
{
    void Atacar(); // Mismo nombre
}

class Hacha : IArma, IHerramienta
{
    // Implementación explícita — sin public
    void IArma.Atacar()
    {
        Console.WriteLine("Ataca como arma");
    }

    void IHerramienta.Atacar()
    {
        Console.WriteLine("Corta como herramienta");
    }
}

Hacha h = new Hacha();
// h.Atacar();           // ❌ ERROR: ambiguo

IArma arma = h;
arma.Atacar();           // "Ataca como arma"

IHerramienta tool = h;
tool.Atacar();           // "Corta como herramienta"
```

La implementación explícita solo es accesible **a través del tipo de la interfaz**, no directamente desde la clase.

---

## ¿`abstract` y `virtual` son lo mismo?

No. Ambos permiten sobrescritura, pero hay una diferencia clave:

| Aspecto | `virtual` | `abstract` |
|---------|-----------|------------|
| Tiene cuerpo | ✅ Sí (implementación por defecto) | ❌ No (solo declaración) |
| Es obligatorio sobrescribir | ❌ Opcional | ✅ Obligatorio |
| Dónde se usa | Clase normal o abstracta | Solo en clase abstracta |

```csharp
abstract class Empleado
{
    // virtual: tiene implementación, override es OPCIONAL
    public virtual void Saludar()
    {
        Console.WriteLine("Hola, soy un empleado");
    }

    // abstract: sin implementación, override es OBLIGATORIO
    public abstract double CalcularSalario();
}

class Gerente : Empleado
{
    // Obligatorio
    public override double CalcularSalario()
    {
        return 5000;
    }

    // Opcional: si no lo pongo, usa el de Empleado
    public override void Saludar()
    {
        Console.WriteLine("Hola, soy gerente");
    }
}
```

---

## ¿Por qué las interfaces usan `I` al inicio?

Es una **convención de nombres** en C#/.NET, no un requisito del lenguaje:

```csharp
// ✅ Convención estándar
interface IEncendible { }
interface ISerializable { }
interface IComparable { }

// ❌ Funciona, pero rompe la convención
interface Encendible { }
```

La `I` indica de inmediato que es una interfaz y la diferencia de las clases. Es el estándar de todo el ecosistema .NET.

---

## ¿Cómo sé si un objeto implementa una interfaz?

Usa el operador `is` para verificar:

```csharp
Animal a = new Pato();

if (a is IVolador volador)
{
    volador.Volar(); // "El pato vuela"
}

if (a is INadador nadador)
{
    nadador.Nadar(); // "El pato nada"
}

if (a is ICorredor corredor)
{
    corredor.Correr();
}
else
{
    Console.WriteLine("Este animal no corre"); // Se ejecuta este
}
```

`is` combina verificación y casting en una sola línea (pattern matching, C# 7+).

---

## Resumen rápido

- Polimorfismo: misma referencia, comportamiento diferente según el tipo real
- Clase abstracta: base no instanciable con métodos concretos y abstractos
- Interfaz: contrato puro que define qué debe hacer una clase
- `abstract` obliga a implementar; `virtual` da opción de sobrescribir
- Una clase puede implementar múltiples interfaces pero solo heredar de una clase
- Las interfaces se nombran con `I` al inicio (`IVolador`, `IEncendible`)
- Usar `is` para verificar si un objeto implementa una interfaz
- Clase abstracta → relación "es un"; interfaz → capacidad "puede hacer"
