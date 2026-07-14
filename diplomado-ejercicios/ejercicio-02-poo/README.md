# Ejercicio 2 — Sistema de Gestión de Tareas (POO)

**Módulo:** Programación Orientada a Objetos
**Entrega:** Domingo de la semana 2, 11:59 PM
**Temas cubiertos:** Clases, propiedades, encapsulamiento, herencia, interfaces, polimorfismo, List<T>, JSON, archivos, enum, DateTime

## Enunciado

Desarrollar una **aplicación de consola** para gestionar tareas usando Programación Orientada a Objetos. El sistema debe permitir crear tareas con diferentes tipos, asignar prioridades, categorías y persistir los datos en JSON.

## Requisitos funcionales

### 1. Menú interactivo

```
=== GESTOR DE TAREAS ===
1. Agregar tarea
2. Listar todas
3. Listar por categoría
4. Listar por prioridad
5. Marcar como completada
6. Mostrar tareas vencidas
7. Eliminar tarea
8. Exportar a JSON
9. Salir
```

### 2. Modelo de clases

Debes crear al menos las siguientes clases:

- **`Tarea`** (clase base):
  - `Id` (int, autoincremental)
  - `Titulo` (string)
  - `Descripcion` (string)
  - `Prioridad` (enum: Baja, Media, Alta, Critica)
  - `Categoria` (string)
  - `Completada` (bool)
  - `FechaCreacion` (DateTime)
  - Método `virtual void MostrarInfo()`

- **`TareaConVencimiento`** (hereda de `Tarea`):
  - `FechaVencimiento` (DateTime)
  - Propiedad calculada `DiasRestantes` (int, solo get)
  - `override void MostrarInfo()` — agrega días restantes al mostrar

- **`Categoria`**:
  - `Nombre` (string)
  - `Color` (string, ej: "Rojo", "Azul")
  - `Descripcion` (string)

### 3. Interfaz IExportable

```csharp
public interface IExportable
{
    string Exportar();  // Devuelve representación para exportar
}
```

- `Tarea` debe implementar `IExportable`
- El método `Exportar()` devuelve un string en formato: `"ID|Titulo|Prioridad|Completada"`

### 4. GestorTareas

Clase que maneje una `List<Tarea>` y proporcione métodos:

- `void Agregar(Tarea tarea)`
- `void Completar(int id)`
- `List<Tarea> ListarPorCategoria(string categoria)`
- `List<Tarea> ListarPorPrioridad(Prioridad prioridad)`
- `List<Tarea> ObtenerVencidas()` — tareas con vencimiento cuya fecha ya pasó
- `void Eliminar(int id)`
- `void GuardarEnJSON(string archivo)`
- `List<Tarea> CargarDeJSON(string archivo)`

### 5. Polimorfismo

Crear un array o lista polimórfica que contenga tanto `Tarea` como `TareaConVencimiento` y recorrerla llamando a `MostrarInfo()`.

### 6. Persistencia

Al cerrar el programa, guardar automáticamente en `tareas.json`. Al iniciar, cargar desde ese archivo si existe.

## Requisitos técnicos

- `enum Prioridad` con 4 niveles
- Clase `Tarea` con encapsulamiento real (propiedades, no campos públicos)
- `TareaConVencimiento` con constructor que llame a `base()`
- Interfaz `IExportable` implementada correctamente
- `List<Tarea>` con operaciones de filtrado (LINQ o métodos manuales)
- Serialización/deserialización con `System.Text.Json`
- `try-catch` al cargar archivo (si no existe o está corrupto)

## Criterios de evaluación

| Criterio | Peso |
|---|---|
| Modelado de clases correcto | 20% |
| Herencia y constructores | 15% |
| Interfaz IExportable | 10% |
| Encapsulamiento (propiedades) | 10% |
| Polimorfismo demostrado | 10% |
| Persistencia JSON | 10% |
| Menú y flujo del programa | 10% |
| Filtros (por categoría, prioridad, vencidas) | 10% |
| Legibilidad y buenas prácticas | 5% |

## Sugerencias

- Usar `DateTime.Now` para la fecha actual
- `DateTime.Compare()` para comparar fechas
- La propiedad `DiasRestantes` debe calcularse en tiempo real
- Para autoincremental, usar un `static int` como contador
- No usar `System.Text.Json` para serializar polimorfismo — usa un `List<object>` o maneja el tipo manualmente con un discriminador

## Formato de entrega

Carpeta `apellido-nombre/` dentro de `ejercicio-02-poo/` con:
- Proyecto completo
- Captura de pantalla mostrando:
  - Creación de tarea simple y con vencimiento
  - Listado polimórfico
  - Persistencia (cerrar y abrir, ver que los datos se mantienen)
