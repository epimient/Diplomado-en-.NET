# Ejemplo Guiado — Sistema de Pagos con Interfaces

## Pasos

```bash
dotnet new console -n Pagos
cd Pagos
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Conceptos aplicados

- `interface IPago` como contrato
- 3 clases que implementan la misma interfaz
- Polimorfismo con `IPago[]`
- Métodos `ProcesarPago()` y `ObtenerMetodo()`
