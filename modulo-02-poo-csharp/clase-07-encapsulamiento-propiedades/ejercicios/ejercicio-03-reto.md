# Ejercicio 3 — Reto: Clase Estudiante

## Enunciado

Crea una clase `Estudiante` con propiedades validadas, un arreglo interno de notas y una propiedad computada `Promedio`.

## Requisitos

### Propiedades

- `public string Nombre { get; set; }`
- Campo privado `int edad` con propiedad `Edad`:
  - Validar en setter que edad >= 5
  - Si es inválida, lanzar `ArgumentException`
- Campo privado `double[] notas` de tamaño fijo (5)
- Campo privado `int contadorNotas` para llevar cuenta

### Métodos

- `public void AgregarNota(double nota)`:
  - Validar que nota esté entre 0 y 10
  - Agregar al arreglo si hay espacio
  - Lanzar excepción si el arreglo está lleno o nota inválida
- `public double Promedio` (propiedad computada):
  - Calcular promedio de las notas ingresadas
  - Si no hay notas, retornar 0
- `public string Estado` (propiedad computada):
  - "Aprobado" si promedio >= 6
  - "Recuperación" si promedio >= 4
  - "Reprobado" si promedio < 4
- `public void MostrarInfo()` que muestre todos los datos

## Main de ejemplo

```csharp
Estudiante est = new Estudiante();
est.Nombre = "María Pérez";
est.Edad = 20;  // OK
est.AgregarNota(8.5);
est.AgregarNota(7.0);
est.AgregarNota(6.5);
est.MostrarInfo();
// Nombre: María Pérez
// Edad: 20
// Notas: 8.5, 7, 6.5
// Promedio: 7.33
// Estado: Aprobado
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Validación de edad en propiedad
- Validación de notas en el método
- Propiedades computadas `Promedio` y `Estado`
- Uso correcto de encapsulamiento
