# Ejercicio 1 — Básico: ¿Puede votar?

## Enunciado

Crea un programa que solicite la edad y la nacionalidad de una persona, y determine si puede votar en Colombia.

## Requisitos

- Usar `if/else`
- Usar operadores relacionales (`>=`) y lógicos (`&&`)
- La nacionalidad debe ingresarse como "colombiano" o "extranjero"
- Una persona puede votar si es mayor o igual a 18 años **Y** es colombiana

## Entrada esperada

```
Ingresa tu edad: 20
Ingresa tu nacionalidad (colombiano/extranjero): colombiano
```

## Salida esperada

```
Puedes votar en las elecciones.
```

Otro ejemplo:

```
Ingresa tu edad: 16
Ingresa tu nacionalidad (colombiano/extranjero): colombiano
```

```
No puedes votar. Debes tener al menos 18 años.
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Usa correctamente `&&` para combinar ambas condiciones
- Detecta correctamente los tres casos: menor de edad, extranjero, o apto para votar
- Muestra mensajes claros según el caso
