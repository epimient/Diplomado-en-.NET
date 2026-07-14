# Clase 06 — Clases, Objetos y Constructores

## Objetivos

- Comprender el paradigma de Programación Orientada a Objetos
- Definir clases con campos y métodos
- Crear objetos usando `new`
- Usar constructores para inicializar objetos
- Diferenciar entre miembros de instancia y estáticos

---

## 1. ¿Qué es POO?

La **Programación Orientada a Objetos (POO)** es un paradigma que organiza el código en torno a **objetos** que contienen datos (campos) y comportamiento (métodos).

### Beneficios

- **Reutilización**: una clase se puede usar muchas veces
- **Organización**: el código se agrupa de forma lógica
- **Mantenibilidad**: cambios localizados en una clase
- **Modelado natural**: representa entidades del mundo real

---

## 2. Clase vs Objeto

| Concepto | Analogía | Descripción |
|----------|----------|-------------|
| **Clase** | Molde / Plano | Define la estructura y comportamiento |
| **Objeto** | Instancia del molde | Un ejemplar concreto con sus propios valores |

```csharp
// Clase: el molde
class Persona
{
    public string Nombre;
    public int Edad;
}

// Objetos: instancias del molde
Persona p1 = new Persona();
Persona p2 = new Persona();
```

`p1` y `p2` son dos objetos distintos, cada uno con sus propios valores.

---

## 3. Sintaxis de una clase

```csharp
class NombreDeLaClase
{
    // Campos (datos)
    public string nombre;
    public int edad;

    // Métodos (comportamiento)
    public void Saludar()
    {
        Console.WriteLine($"Hola, soy {nombre}");
    }
}
```

> La palabra `public` significa que el miembro es accesible desde fuera de la clase.

---

## 4. Crear objetos con `new`

```csharp
Persona persona = new Persona();
persona.nombre = "Ana";
persona.edad = 25;
persona.Saludar();  // Hola, soy Ana
```

`new` reserva memoria para el objeto y llama al constructor.

---

## 5. Constructores

Un **constructor** es un método especial que se ejecuta al crear un objeto. Tiene el mismo nombre de la clase y no retorna nada.

### Constructor por defecto

```csharp
class Persona
{
    public string nombre;
    public int edad;

    // Constructor por defecto (C# lo genera automáticamente si no definimos ninguno)
    public Persona()
    {
        nombre = "Sin nombre";
        edad = 0;
    }
}
```

### Constructor con parámetros

```csharp
class Persona
{
    public string nombre;
    public int edad;

    public Persona(string nombre, int edad)
    {
        this.nombre = nombre;
        this.edad = edad;
    }
}
```

Uso:

```csharp
Persona p = new Persona("Carlos", 30);
```

### Sobrecarga de constructores

```csharp
class Persona
{
    public string nombre;
    public int edad;

    public Persona() { }
    public Persona(string nombre) { this.nombre = nombre; }
    public Persona(string nombre, int edad) { this.nombre = nombre; this.edad = edad; }
}
```

---

## 6. La palabra `this`

`this` hace referencia al objeto actual. Se usa para:

- Diferenciar el campo del parámetro cuando tienen el mismo nombre
- Pasar el objeto actual como argumento

```csharp
public Persona(string nombre, int edad)
{
    this.nombre = nombre;  // this.nombre es el campo, nombre es el parámetro
    this.edad = edad;
}
```

---

## 7. Miembros estáticos (`static`)

Los miembros `static` pertenecen a la **clase**, no a las instancias.

```csharp
class Matematica
{
    public static double PI = 3.1416;

    public static int Sumar(int a, int b)
    {
        return a + b;
    }
}

// Uso sin crear objeto
Console.WriteLine(Matematica.PI);
int r = Matematica.Sumar(5, 3);
```

- Se accede con `Clase.Miembro`, no con `objeto.Miembro`
- Un método `static` no puede acceder a miembros de instancia

---

## Resumen

```csharp
// Definición de clase
class Nombre
{
    public string campo;
    public Nombre(string valor) { this.campo = valor; }
    public void Metodo() { }
}

// Creación de objeto
Nombre obj = new Nombre("valor");
obj.Metodo();

// Miembro estático
Console.WriteLine(ClaseEstatica.Metodo());
```
