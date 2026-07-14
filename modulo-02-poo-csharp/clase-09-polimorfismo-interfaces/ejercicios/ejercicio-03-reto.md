# Ejercicio 3 — Reto: Interfaces IImprimible e IExportable

## Enunciado

Crea dos interfaces y una clase `Documento` que las implemente ambas.

## Requisitos

### Interfaz `IImprimible`
- `void Imprimir()`
- `int ObtenerNumeroPaginas()`

### Interfaz `IExportable`
- `void Exportar(string formato)`

### Clase `Documento : IImprimible, IExportable`
- Propiedades:
  - `public string Titulo { get; set; }`
  - `public string Contenido { get; set; }`
  - `public int Paginas { get; set; }`
- Constructor que reciba título, contenido y páginas
- `Imprimir()` → "Imprimiendo '[Titulo]' ([Paginas] páginas)... Documento impreso."
- `ObtenerNumeroPaginas()` → retorna `Paginas`
- `Exportar(string formato)`:
  - "PDF" → "Exportando '[Titulo]' a PDF..."
  - "Word" → "Exportando '[Titulo]' a Word..."
  - otro → "Formato no soportado."

### Main de ejemplo

```csharp
Documento doc = new Documento("Informe 2024", "Contenido del informe...", 15);

doc.Imprimir();
Console.WriteLine($"Páginas: {doc.ObtenerNumeroPaginas()}");

doc.Exportar("PDF");
doc.Exportar("Word");
doc.Exportar("Excel");
```

## Salida esperada

```
Imprimiendo 'Informe 2024' (15 páginas)... Documento impreso.
Páginas: 15
Exportando 'Informe 2024' a PDF...
Exportando 'Informe 2024' a Word...
Formato no soportado.
```

## Criterios de evaluación

- Compila y ejecuta sin errores
- Dos interfaces definidas correctamente
- `Documento` implementa ambas interfaces
- Método `Exportar` maneja múltiples formatos
- Uso de polimorfismo
