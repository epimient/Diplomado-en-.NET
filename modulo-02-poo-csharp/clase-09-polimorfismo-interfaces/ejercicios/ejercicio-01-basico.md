# Ejercicio 1 — Básico: Interface IEncendible

## Enunciado

Crea una interfaz `IEncendible` con métodos `Encender()` y `Apagar()`. Implementa la interfaz en dos clases no relacionadas: `Auto` y `Televisor`.

## Requisitos

- `interface IEncendible` con:
  - `void Encender()`
  - `void Apagar()`
- Clase `Auto : IEncendible`:
  - `Encender()` → "Auto encendido. Motor en marcha."
  - `Apagar()` → "Auto apagado."
- Clase `Televisor : IEncendible`:
  - `Encender()` → "TV encendida. Bienvenido."
  - `Apagar()` → "TV apagada."
- En `Main`, crear un arreglo `IEncendible[]` y llamar a ambos métodos

## Salida esperada

```
Auto encendido. Motor en marcha.
Auto apagado.
TV encendida. Bienvenido.
TV apagada.
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Interfaz correctamente definida
- Ambas clases implementan la interfaz
- Arreglo polimórfico funcional
