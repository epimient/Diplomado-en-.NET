# Ejemplo Guiado — Sistema de Biblioteca

## Pasos

```bash
dotnet new console -n Biblioteca
cd Biblioteca
```

Reemplazar `Program.cs` con el código de ejemplo, luego:

```bash
dotnet run
```

## Conceptos aplicados

- Clase `Libro` con campos y constructores sobrecargados
- Sobrecarga de constructores: sin params, con 2 params, con 3 params
- Delegación entre constructores con `this(...)`
- Sobrecarga de métodos: `MostrarInfo()` y `MostrarInfo(bool)`
- Campo estático `totalLibros` compartido entre todas las instancias
- Método estático `MostrarTotal()` accesible desde la clase
- Creación de objetos con `new`
- Múltiples instancias independientes
