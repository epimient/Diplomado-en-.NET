# Ejercicio 2 — Intermedio: Clase Rectángulo

## Enunciado

Crea una clase `Rectangulo` con base y altura, constructores y métodos para calcular área y perímetro.

## Requisitos

- Clase `Rectangulo` con campos `double Base` y `double Altura`
- Constructor que reciba base y altura
- Constructor sin parámetros (base = 1, altura = 1)
- Método `CalcularArea()` que retorne `double`
- Método `CalcularPerimetro()` que retorne `double`
- Método `MostrarDatos()` que muestre: "Base: X, Altura: Y, Área: Z, Perímetro: W"

## Entrada esperada (Main)

```csharp
Rectangulo r1 = new Rectangulo(5, 3);
Rectangulo r2 = new Rectangulo();
r1.MostrarDatos();
r2.MostrarDatos();
```

## Salida esperada

```
Base: 5, Altura: 3, Área: 15, Perímetro: 16
Base: 1, Altura: 1, Área: 1, Perímetro: 4
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Dos constructores (sobrecarga)
- Fórmulas correctas
- Métodos con retorno
