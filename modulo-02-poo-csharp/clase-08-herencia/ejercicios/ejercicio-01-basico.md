# Ejercicio 1 — Básico: Vehículos

## Enunciado

Crea una jerarquía de vehículos con una clase base `Vehiculo` y dos derivadas `Auto` y `Moto`.

## Requisitos

- Clase `Vehiculo` con:
  - `public string Marca { get; set; }`
  - `public string Modelo { get; set; }`
  - `public void MostrarInfo()` que muestre: "[Marca] [Modelo]"
- Clase `Auto : Vehiculo` con:
  - `public int Puertas { get; set; }`
  - `override void MostrarInfo()` que agregue: "[Marca] [Modelo] - [Puertas] puertas"
- Clase `Moto : Vehiculo` con:
  - `public int Cilindrada { get; set; }`
  - `override void MostrarInfo()` que agregue: "[Marca] [Modelo] - [Cilindrada]cc"

## Main de ejemplo

```csharp
Auto auto = new Auto { Marca = "Toyota", Modelo = "Corolla", Puertas = 4 };
Moto moto = new Moto { Marca = "Yamaha", Modelo = "MT-07", Cilindrada = 689 };
auto.MostrarInfo();
moto.MostrarInfo();
```

## Salida esperada

```
Toyota Corolla - 4 puertas
Yamaha MT-07 - 689cc
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Herencia correcta `Auto : Vehiculo`
- `override` en `MostrarInfo()`
- Propiedades autoimplementadas
