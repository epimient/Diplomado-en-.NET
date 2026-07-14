# Ejercicio 2 — Intermedio: Adivina el número

## Enunciado

Crea un programa que genere un número aleatorio entre 1 y 100, y le dé al usuario intentos para adivinarlo.

## Requisitos

- Usar `Random` para generar el número: `Random rand = new Random(); int secreto = rand.Next(1, 101);`
- Usar `do while` para el bucle de intentos
- Dar pistas: "mayor" o "menor"
- Contar y mostrar el número de intentos

## Entrada esperada

```
Adivina el número (1-100): 50
El número es mayor
Adivina el número (1-100): 75
El número es menor
Adivina el número (1-100): 63
¡Correcto! Adivinaste en 3 intentos.
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Genera el número aleatorio
- Da pistas correctas (mayor/menor)
- Muestra el número de intentos al final
