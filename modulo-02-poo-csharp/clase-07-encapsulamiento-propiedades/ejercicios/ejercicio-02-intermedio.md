# Ejercicio 2 — Intermedio: Clase Cuenta de Ahorros

## Enunciado

Crea una clase `CuentaAhorros` que encapsule el saldo usando propiedades y métodos con validación.

## Requisitos

- Campo privado `double saldo`
- Propiedad de solo lectura `public double Saldo { get; private set; }` (o con get que devuelva el campo)
- Método `public void Depositar(double monto)`:
  - Validar que monto > 0
  - Sumar al saldo
  - Mostrar mensaje "Depósito exitoso: +$[monto]"
- Método `public bool Retirar(double monto)`:
  - Validar que monto > 0 y que haya saldo suficiente
  - Restar del saldo si es posible
  - Retornar `true` si se realizó, `false` si no
- Método `public void MostrarSaldo()` que muestre el saldo actual
- Constructor que reciba saldo inicial

## Main de ejemplo

```csharp
CuentaAhorros cuenta = new CuentaAhorros(1000);
cuenta.MostrarSaldo();            // Saldo actual: $1000.00
cuenta.Depositar(500);             // Depósito exitoso: +$500.00
cuenta.MostrarSaldo();            // Saldo actual: $1500.00
bool r1 = cuenta.Retirar(200);
Console.WriteLine(r1 ? "Retiro exitoso" : "Saldo insuficiente");  // Retiro exitoso
bool r2 = cuenta.Retirar(2000);
Console.WriteLine(r2 ? "Retiro exitoso" : "Saldo insuficiente");  // Saldo insuficiente
cuenta.MostrarSaldo();            // Saldo actual: $1300.00
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Campo `saldo` privado
- Propiedad `Saldo` de solo lectura o encapsulada
- Validaciones en depósito y retiro
- Métodos con la lógica correcta
