# Ejercicio 3 — Reto: Conversor de unidades

## Enunciado

Crea un programa que convierta unidades usando un menú con `switch`. El usuario elige la conversión, ingresa el valor y obtiene el resultado.

## Opciones del menú

```
1. Metros a kilómetros
2. Kilómetros a metros
3. Celsius a Fahrenheit
4. Fahrenheit a Celsius
5. Salir
```

## Fórmulas

- Metros a km: valor / 1000
- Km a metros: valor * 1000
- °C a °F: (valor * 9/5) + 32
- °F a °C: (valor - 32) * 5/9

## Entrada esperada

```
Elige una opción (1-5): 3
Ingresa el valor: 25
```

## Salida esperada

```
25 °C = 77 °F
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Menú funcional con `switch`
- Fórmulas correctas
- Maneja opción inválida (default)
- Permite salir con opción 5
