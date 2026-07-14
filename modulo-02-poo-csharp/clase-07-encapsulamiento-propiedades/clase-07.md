# Clase 07 — Encapsulamiento y Propiedades

## Objetivos

- Comprender el principio de encapsulamiento
- Usar modificadores de acceso: `public`, `private`
- Implementar propiedades con getters y setters
- Usar propiedades autoimplementadas y computadas
- Validar datos en propiedades

---

## 1. ¿Qué es encapsulamiento?

El **encapsulamiento** es el principio de ocultar los datos internos de un objeto y controlar el acceso a través de métodos o propiedades.

### Beneficios

- **Protección**: evita que los datos queden en estado inválido
- **Control**: podemos validar antes de asignar
- **Flexibilidad**: podemos cambiar la implementación interna sin afectar el código externo
- **Mantenibilidad**: el código es más seguro y predecible

---

## 2. Modificadores de acceso

| Modificador | Acceso desde |
|-------------|--------------|
| `public` | Desde cualquier parte |
| `private` | Solo desde la misma clase |
| `protected` | Desde la misma clase y subclases |
| `internal` | Desde el mismo proyecto/ensamblado |

```csharp
class Ejemplo
{
    public string Publico;    // Accesible desde fuera
    private string Privado;   // Solo accesible aquí dentro
}
```

---

## 3. Getters y Setters tradicionales

Antes de las propiedades, se usaban métodos:

```csharp
class Persona
{
    private string nombre;

    public string GetNombre()
    {
        return nombre;
    }

    public void SetNombre(string valor)
    {
        if (!string.IsNullOrWhiteSpace(valor))
            nombre = valor;
    }
}
```

Uso:

```csharp
Persona p = new Persona();
p.SetNombre("Ana");
Console.WriteLine(p.GetNombre());
```

---

## 4. Propiedades (`get` / `set`)

Las propiedades son la forma moderna de encapsular en C#:

```csharp
class Persona
{
    private string nombre;

    public string Nombre
    {
        get { return nombre; }
        set { nombre = value; }
    }
}
```

- `get` → devuelve el valor
- `set` → asigna el valor (con `value` como parámetro implícito)
- La propiedad tiene un nombre en PascalCase

---

## 5. Propiedades con validación

```csharp
class Empleado
{
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
}
```

---

## 6. Propiedades autoimplementadas

Cuando no necesitamos lógica extra:

```csharp
class Producto
{
    public string Nombre { get; set; }
    public double Precio { get; set; }
    public int Stock { get; set; }
}
```

El compilador genera automáticamente el campo privado de respaldo.

---

## 7. Propiedades de solo lectura / solo escritura

### Solo lectura (sin `set`)

```csharp
public double PI { get; } = 3.1416;
```

### Solo lectura desde el constructor

```csharp
class Persona
{
    public string Nombre { get; }  // sin set

    public Persona(string nombre)
    {
        Nombre = nombre;  // Solo se asigna en el constructor
    }
}
```

### Set privado

```csharp
public double Saldo { get; private set; }
```

Asignable dentro de la clase, solo lectura desde fuera.

---

## 8. Propiedades computadas

Devuelven un valor calculado, no almacenado:

```csharp
class Rectangulo
{
    public double Base { get; set; }
    public double Altura { get; set; }

    public double Area
    {
        get { return Base * Altura; }
    }

    // Sintaxis compacta (expression-bodied)
    public double Perimetro => 2 * (Base + Altura);
}
```

---

## 9. Cuándo usar campo vs propiedad

| Situación | Usar |
|-----------|------|
| Sin lógica de acceso | Propiedad autoimplementada |
| Con validación o cálculo | Propiedad con lógica |
| Solo interno a la clase | Campo privado `private` |
| Constante | `const` o `static readonly` |

---

## Resumen

```csharp
// Autoimplementada
public string Nombre { get; set; }

// Con validación
private double precio;
public double Precio
{
    get { return precio; }
    set
    {
        if (value < 0) throw new Exception("...");
        precio = value;
    }
}

// Solo lectura
public int Id { get; }

// Computada
public double Area => Base * Altura;
```
