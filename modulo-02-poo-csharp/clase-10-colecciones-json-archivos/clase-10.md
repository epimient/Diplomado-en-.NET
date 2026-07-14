# Clase 10 — Colecciones, JSON y Archivos

## Objetivo
Que el estudiante maneje colecciones de datos (List, Dictionary), trabaje con archivos de texto y JSON, y maneje excepciones básicas para construir aplicaciones de consola con persistencia.

## Contenido

### 1. List<T>
- ¿Qué es List<T>? Colección genérica dinámica
- Diferencias con arrays (tamaño fijo vs dinámico)
- Crear una lista: `new List<T>()`
- Métodos principales: `Add()`, `Remove()`, `RemoveAt()`, `Contains()`, `Count`
- `Sort()` y `Find()` con predicados
- Recorrer con `foreach` y con índice
- Lista de objetos personalizados

### 2. Dictionary<TKey, TValue>
- Estructura clave-valor
- Crear: `new Dictionary<TKey, TValue>()`
- `Add()`, acceso por índice `[clave]`, `ContainsKey()`, `TryGetValue()`
- Recorrer con `KeyValuePair<TKey, TValue>`
- Cuándo usar Dictionary vs List

### 3. Manejo de archivos con System.IO
- `File.ReadAllText(path)` y `File.WriteAllText(path, content)`
- `File.ReadAllLines(path)` y `File.WriteAllLines(path, lines)`
- `File.AppendAllText(path, content)`
- `File.Exists()` para verificar existencia
- `Directory.GetCurrentDirectory()` para rutas

### 4. JSON con System.Text.Json
- `JsonSerializer.Serialize(obj, options)`
- `JsonSerializer.Deserialize<T>(json)`
- `JsonSerializerOptions { WriteIndented = true }`
- Serializar listas y diccionarios
- Namespace: `using System.Text.Json;`
- Ficheros JSON como persistencia simple

### 5. Manejo de excepciones
- `try { } catch (Exception ex) { } finally { }`
- Excepciones comunes: `FileNotFoundException`, `FormatException`, `JsonException`
- Propiedades: `ex.Message`, `ex.StackTrace`
- No capturar excepciones genéricas sin necesidad

### 6. Buenas prácticas
- Preferir `List<T>` sobre arrays a menos que el tamaño sea fijo
- Usar `TryGetValue()` en Dictionary para evitar KeyNotFoundException
- Verificar `File.Exists()` antes de leer
- Usar `using` o `try-finally` para archivos
- JSON como formato de intercambio ligero

## Ejemplo guiado
Agenda de contactos: el usuario puede agregar, listar y buscar contactos. Los contactos se guardan en un archivo JSON y se cargan al iniciar la aplicación. Cada contacto tiene Nombre, Teléfono y Email.

## Ejercicios

**Nivel 1 — Lista de compras**
- Crear un programa que use `List<string>` para una lista de compras
- Opciones: agregar, mostrar, eliminar artículo
- Entrada esperada: "Agregar: Leche", "Agregar: Pan", "Mostrar"
- Salida esperada: "1. Leche", "2. Pan"

**Nivel 2 — Diccionario de productos**
- Usar `Dictionary<string, double>` para catálogo de productos
- Agregar producto con precio, buscar por nombre
- Entrada: "Agregar: Laptop, 999.99", "Buscar: Laptop"
- Salida: "Laptop: $999.99"

**Nivel 3 — Agenda telefónica persistente en JSON**
- Lista de contactos (clase Contacto con nombre, teléfono, email)
- CRUD completo con persistencia en JSON
- Al iniciar carga del archivo, al salir guarda automáticamente
- Validar que no haya teléfonos duplicados
