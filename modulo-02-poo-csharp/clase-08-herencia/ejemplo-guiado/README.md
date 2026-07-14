# Ejemplo Guiado — Sistema de Nómina con Herencia

## Pasos

```bash
dotnet new console -n Nomina
cd Nomina
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Conceptos aplicados

- Clase base `Empleado` con constructor
- Clases derivadas `Gerente` y `Vendedor` con `: base()`
- `virtual` y `override` para polimorfismo
- Arreglo polimórfico con `foreach`
