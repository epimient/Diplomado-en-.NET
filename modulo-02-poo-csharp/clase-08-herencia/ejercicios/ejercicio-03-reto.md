# Ejercicio 3 — Reto: Sistema de Figuras con comparación

## Enunciado

Extiende el ejercicio de figuras agregando más tipos y un método para comparar áreas.

## Requisitos

- Clase base `Figura` (igual que ejercicio 2) con:
  - `public string Color { get; set; }`
  - Constructor con color
  - `virtual double CalcularArea()`
  - `virtual void MostrarDatos()`
- Clase `Circulo : Figura` (radio)
- Clase `Rectangulo : Figura` (base, altura)
- Clase `Triangulo : Figura`:
  - `public double Base { get; set; }`
  - `public double Altura { get; set; }`
  - Área = (base × altura) / 2
- Método estático en `Figura`:
  ```csharp
  public static void CompararAreas(Figura a, Figura b)
  ```
  - Muestra qué figura tiene mayor área o si son iguales

## Main de ejemplo

```csharp
Figura[] figuras = {
    new Circulo("Rojo", 5),
    new Rectangulo("Azul", 4, 6),
    new Triangulo("Verde", 3, 8)
};

foreach (Figura f in figuras)
{
    f.MostrarDatos();
}

Console.WriteLine();
Figura.CompararAreas(figuras[0], figuras[1]);
Figura.CompararAreas(figuras[1], figuras[2]);
```

## Salida esperada

```
Círculo Rojo - Área: 78.54
Rectángulo Azul - Área: 24.00
Triángulo Verde - Área: 12.00

El Círculo Rojo tiene mayor área que el Rectángulo Azul
El Rectángulo Azul tiene mayor área que el Triángulo Verde
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- 3 figuras con herencia correcta
- Método `CompararAreas` implementado
- Fórmulas correctas
- Resultados formateados con 2 decimales
