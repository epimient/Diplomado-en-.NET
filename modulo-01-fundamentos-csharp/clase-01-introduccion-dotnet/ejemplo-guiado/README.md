# Ejemplo Guiado — Hola Mundo

## Pasos

```bash
dotnet new console -n HolaMundo
cd HolaMundo
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Código

```csharp
// Saludo básico
Console.WriteLine("¡Hola, Mundo!");

// Saludo personalizado
Console.Write("¿Cómo te llamas? ");
string nombre = Console.ReadLine();
Console.WriteLine($"Mucho gusto, {nombre}!");

// Datos personales
Console.Write("¿Cuántos años tienes? ");
string edad = Console.ReadLine();
Console.WriteLine($"Genial, {nombre} tienes {edad} años.");
```
