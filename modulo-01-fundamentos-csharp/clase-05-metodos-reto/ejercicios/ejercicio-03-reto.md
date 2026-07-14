# Ejercicio 3 — Reto: Sistema Bancario (Reto Integrador)

## Enunciado

Crea un sistema bancario en consola que integre **todos los temas del Módulo 1**.

## Requisitos del sistema

- Menú principal con ciclo `do while`
- Cada funcionalidad debe ser un método separado
- Usar un arreglo para almacenar los movimientos
- Validar entrada del usuario

## Funcionalidades

### 1. Registrar cliente
- Pedir nombre, edad, saldo inicial
- Validar que la edad sea ≥ 18
- Mostrar resumen del cliente

### 2. Depositar
- Pedir monto a depositar
- Validar que sea positivo
- Actualizar saldo y registrar el movimiento
- Mostrar nuevo saldo

### 3. Retirar
- Pedir monto a retirar
- Validar que sea positivo y no supere el saldo
- Actualizar saldo y registrar el movimiento
- Mostrar nuevo saldo

### 4. Mostrar historial
- Mostrar todos los movimientos registrados
- Mostrar saldo actual

### 5. Salir

## Estructura sugerida

```csharp
static void Main() { }
static void RegistrarCliente() { }
static void Depositar() { }
static void Retirar() { }
static void MostrarHistorial() { }
static void MostrarMenu() { }
```

## Variables globales sugeridas (static)

```csharp
static string nombreCliente = "";
static double saldo = 0;
static string[] movimientos = new string[100];
static int contadorMovimientos = 0;
```

## Ejemplo de ejecución

```
=== SISTEMA BANCARIO ===
1. Registrar cliente
2. Depositar
3. Retirar
4. Mostrar historial
5. Salir
Elige: 1

Nombre: Ana López
Edad: 25
Saldo inicial: 1000
Cliente registrado: Ana López, Saldo: $1000.00

--- Menú principal ---
2. Depositar
¿Monto a depositar?: 500
Depósito exitoso. Nuevo saldo: $1500.00

4. Mostrar historial
=== HISTORIAL ===
1. Depósito: +$500.00
Saldo actual: $1500.00
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Todos los temas del módulo integrados
- Métodos bien definidos con responsabilidades claras
- Validaciones funcionales
- Menú navegable
- Código limpio y organizado
