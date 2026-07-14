# Ejercicio 2 — Intermedio: Conversor de temperaturas

## Enunciado

Crea un programa con métodos para convertir temperaturas entre Celsius, Fahrenheit y Kelvin.

## Requisitos

- Un método por cada conversión (6 métodos en total)
- Menú con `switch` y ciclo `do while`

## Métodos requeridos

| Método | Fórmula |
|--------|---------|
| `CelsiusAFahrenheit(double c)` | `c * 9/5 + 32` |
| `CelsiusAKelvin(double c)` | `c + 273.15` |
| `FahrenheitACelsius(double f)` | `(f - 32) * 5/9` |
| `FahrenheitAKelvin(double f)` | `(f - 32) * 5/9 + 273.15` |
| `KelvinACelsius(double k)` | `k - 273.15` |
| `KelvinAFahrenheit(double k)` | `(k - 273.15) * 9/5 + 32` |

## Entrada esperada

```
1. °C → °F
2. °F → °C
3. °C → K
4. K → °C
5. °F → K
6. K → °F
7. Salir
Elige: 1
Valor: 25
Resultado: 25 °C = 77 °F
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- 6 métodos de conversión implementados
- Fórmulas correctas
- Menú funcional
