# Clase 09 — Polimorfismo e Interfaces

## Objetivos

- Comprender el polimorfismo en acción
- Diferenciar clases abstractas de interfaces
- Definir e implementar interfaces
- Usar múltiples interfaces en una clase
- Aplicar polimorfismo con interfaces

---

## 1. Polimorfismo

El **polimorfismo** permite que un objeto se comporte de diferentes formas según su tipo real.

```csharp
Animal[] animales = { new Perro(), new Gato() };

foreach (Animal a in animales)
{
    a.HacerSonido(); // Cada uno hace su propio sonido
}
```

> "Poli" = muchas, "morfismo" = formas. Muchas formas desde una misma referencia.

---

## 2. Clases abstractas

Una **clase abstracta** no puede instanciarse directamente. Sirve como base para otras clases.

```csharp
abstract class Animal
{
    public string Nombre { get; set; }

    // Método concreto (con implementación)
    public void Dormir()
    {
        Console.WriteLine($"{Nombre} está durmiendo");
    }

    // Método abstracto (sin implementación, obligatorio en derivadas)
    public abstract void HacerSonido();
}
```

```csharp
class Perro : Animal
{
    public override void HacerSonido()
    {
        Console.WriteLine("¡Guau!");
    }
}

// Animal a = new Animal(); // ERROR: abstracta
Perro p = new Perro();
```

### Reglas

- No se puede instanciar (`new Animal()` da error)
- Puede tener métodos concretos y abstractos
- Los métodos abstractos DEBEN implementarse en las derivadas (`override`)

---

## 3. Interfaces

Una **interfaz** define un contrato. Las clases que la implementan deben cumplir ese contrato.

```csharp
interface IEncendible
{
    void Encender();
    void Apagar();
}
```

```csharp
class Auto : IEncendible
{
    public void Encender()
    {
        Console.WriteLine("Auto encendido");
    }

    public void Apagar()
    {
        Console.WriteLine("Auto apagado");
    }
}
```

### Convención

- Los nombres de interfaces empiezan con `I` mayúscula
- Los métodos de interfaz no tienen implementación
- Todos los métodos son implícitamente `public`
- Una clase puede implementar múltiples interfaces

---

## 4. Clase abstracta vs Interfaz

| Aspecto | Clase abstracta | Interfaz |
|---------|----------------|----------|
| Instanciar | No | No |
| Implementación | Puede tener métodos concretos | Solo declaración (hasta C# 10) |
| Constructores | Sí | No |
| Campos | Sí | No (solo propiedades) |
| Herencia múltiple | No (solo una clase base) | Sí (múltiples interfaces) |
| Cuándo usar | Clases relacionadas con lógica compartida | Capacidades transversales |

### ¿Cuándo usar cada una?

- **Abstracta**: cuando hay una relación jerárquica clara ("es un") con código compartido
- **Interfaz**: cuando queremos definir una capacidad que puede aplicar a clases no relacionadas

---

## 5. Múltiples interfaces

```csharp
interface IVolador
{
    void Volar();
}

interface INadador
{
    void Nadar();
}

class Pato : IVolador, INadador
{
    public void Volar()
    {
        Console.WriteLine("El pato vuela");
    }

    public void Nadar()
    {
        Console.WriteLine("El pato nada");
    }
}
```

---

## 6. Interfaces como tipo

Podemos usar una interfaz como tipo de referencia para aprovechar el polimorfismo:

```csharp
IEncendible[] dispositivos = { new Auto(), new Televisor() };

foreach (IEncendible d in dispositivos)
{
    d.Encender();
    d.Apagar();
}
```

---

## Resumen

```csharp
// Interfaz
interface IAccion
{
    void Ejecutar();
}

// Clase abstracta
abstract class Base
{
    public abstract void MetodoAbstracto();
    public void MetodoConcreto() { }
}

// Implementación
class Clase : Base, IAccion
{
    public override void MetodoAbstracto() { }
    public void Ejecutar() { }
}

// Polimorfismo
IAccion[] acciones = { new Clase(), new OtraClase() };
```
