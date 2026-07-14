# Ejercicio 3 — Reto: Clase Cuenta Bancaria

## Enunciado

Crea una clase `CuentaBancaria` que modele una cuenta con operaciones de depósito, retiro y consulta de saldo.

## Requisitos

- Clase `CuentaBancaria` con campos:
  - `public string Titular`
  - `private double saldo` (encapsulado, no accesible directamente)
- Constructor que reciba titular y saldo inicial
- Método `public void Depositar(double monto)` — suma al saldo
- Método `public bool Retirar(double monto)` — resta si hay saldo suficiente, retorna `true`/`false`
- Método `public void MostrarSaldo()` — muestra: "Saldo de [titular]: $[saldo]"
- Método `public string ObtenerResumen()` — retorna string con titular, saldo y estado (Activo si saldo > 0, Inactivo si saldo <= 0)

## Main de ejemplo

```csharp
CuentaBancaria cuenta = new CuentaBancaria("Ana López", 1000);
cuenta.MostrarSaldo();                    // Saldo de Ana López: $1000
cuenta.Depositar(500);                    // Depósito exitoso
cuenta.MostrarSaldo();                    // Saldo de Ana López: $1500
bool retiro = cuenta.Retirar(2000);
Console.WriteLine(retiro ? "Retiro exitoso" : "Saldo insuficiente");  // Saldo insuficiente
Console.WriteLine(cuenta.ObtenerResumen());
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Campo `saldo` es privado
- Depósitos y retiros funcionan correctamente
- Validación de saldo en retiros
- Método `ObtenerResumen()` retorna string formateado
