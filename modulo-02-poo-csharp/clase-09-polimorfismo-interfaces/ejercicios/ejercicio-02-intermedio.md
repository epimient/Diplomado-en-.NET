# Ejercicio 2 — Intermedio: Clase abstracta Animal

## Enunciado

Crea una clase abstracta `Animal` con método abstracto `HacerSonido()` y tres clases derivadas.

## Requisitos

- Clase abstracta `Animal`:
  - `public string Nombre { get; set; }`
  - Constructor que reciba nombre
  - Método concreto `void Dormir()` → "[Nombre] está durmiendo."
  - Método abstracto `public abstract void HacerSonido();`
- Clase `Perro : Animal`:
  - `override void HacerSonido()` → "¡Guau, guau!"
- Clase `Gato : Animal`:
  - `override void HacerSonido()` → "¡Miau!"
- Clase `Vaca : Animal`:
  - `override void HacerSonido()` → "¡Muuu!"
- En `Main`, crear un arreglo `Animal[]` y llamar a `HacerSonido()` y `Dormir()`

## Salida esperada

```
Max dice: ¡Guau, guau!
Max está durmiendo.
Luna dice: ¡Miau!
Luna está durmiendo.
Clara dice: ¡Muuu!
Clara está durmiendo.
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Clase abstracta con método abstracto y concreto
- 3 clases derivadas con `override`
- Arreglo polimórfico
- Se usa `base(nombre)` en constructores
