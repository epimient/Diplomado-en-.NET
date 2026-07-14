# Ejercicio 2 — Intermedio: Figuras geométricas

## Enunciado

Crea una jerarquía de figuras geométricas con una clase base abstracta `Figura` y dos derivadas `Circulo` y `Rectangulo`.

## Requisitos

- Clase `Figura` con:
  - Propiedad `public string Color { get; set; }`
  - Constructor que reciba color
  - Método `virtual double CalcularArea()` que retorne 0
  - Método `virtual void MostrarDatos()` que muestre: "Figura de color [Color]"
- Clase `Circulo : Figura` con:
  - Propiedad `public double Radio { get; set; }`
  - Constructor que reciba color y radio
  - `override double CalcularArea()` → π × radio²
  - `override void MostrarDatos()`: "Círculo [Color] - Área: [area]"
- Clase `Rectangulo : Figura` con:
  - Propiedades `Base` y `Altura`
  - Constructor que reciba color, base y altura
  - `override double CalcularArea()` → base × altura
  - `override void MostrarDatos()`: "Rectángulo [Color] - Área: [area]"

## Main de ejemplo

```csharp
Figura[] figuras = {
    new Circulo("Rojo", 5),
    new Rectangulo("Azul", 4, 6)
};
foreach (Figura f in figuras)
{
    f.MostrarDatos();
}
```

## Salida esperada

```
Círculo Rojo - Área: 78.54
Rectángulo Azul - Área: 24.00
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Herencia correcta con `base()`
- `override` en ambos métodos
- Fórmulas correctas
- Arreglo polimórfico
