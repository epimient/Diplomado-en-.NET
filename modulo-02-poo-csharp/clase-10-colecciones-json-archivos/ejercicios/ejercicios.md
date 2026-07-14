# Ejercicios — Clase 10: Colecciones, JSON y Archivos

## Nivel 1: Lista de compras (List<string>)

**Enunciado:**  
Crea un programa que administre una lista de compras usando `List<string>`. El usuario debe poder agregar artículos, mostrar la lista completa y eliminar un artículo por su nombre.

**Requisitos:**
- Usar `List<string>` para almacenar los artículos.
- Menú interactivo con opciones: 1. Agregar, 2. Mostrar, 3. Eliminar, 4. Salir.
- Al eliminar, verificar si el artículo existe antes de removerlo.
- Mostrar mensaje de error si la lista está vacía al intentar mostrar.

**Entrada esperada:**
```
=== LISTA DE COMPRAS ===
1. Agregar artículo
2. Mostrar lista
3. Eliminar artículo
4. Salir
Seleccione una opción: 1
Ingrese el artículo: Leche
Artículo agregado.
```

**Salida esperada:**
```
=== LISTA DE COMPRAS ===
1. Leche
2. Pan
3. Huevos
```

---

## Nivel 2: Catálogo con Dictionary

**Enunciado:**  
Crea un programa que simule un catálogo de productos usando `Dictionary<string, double>` donde la clave es el nombre del producto y el valor es el precio. El usuario debe poder agregar, buscar por nombre, listar todos y calcular el precio total.

**Requisitos:**
- Usar `Dictionary<string, double>`.
- Menú con opciones: 1. Agregar producto, 2. Buscar producto, 3. Listar todos, 4. Calcular total, 5. Salir.
- Al buscar, mostrar "Producto no encontrado" si no existe.
- Mostrar el total con dos decimales.

**Entrada esperada:**
```
Seleccione una opción: 1
Nombre del producto: Laptop
Precio: 12500.50
Producto agregado.
```

**Salida esperada:**
```
=== CATÁLOGO ===
Laptop - $12,500.50
Mouse - $250.00
Teclado - $450.00
Total: $13,200.50
```

---

## Nivel 3: Agenda persistente con JSON

**Enunciado:**  
Crea una aplicación de agenda de contactos que guarde y cargue los datos desde un archivo JSON usando `System.Text.Json`. Cada contacto debe tener Nombre, Teléfono y Email.

**Requisitos:**
- Clase `Contacto` con propiedades `Nombre`, `Telefono`, `Email`.
- Serializar y deserializar con `System.Text.Json`.
- Menú: 1. Agregar contacto, 2. Mostrar todos, 3. Buscar por nombre, 4. Eliminar, 5. Salir.
- Los datos persisten entre ejecuciones (se guardan en `agenda.json`).
- Manejar excepciones si el archivo JSON está corrupto o no existe.

**Entrada esperada:**
```
=== AGENDA ===
1. Agregar contacto
2. Mostrar todos
3. Buscar contacto
4. Eliminar contacto
5. Salir
Opción: 1
Nombre: Ana López
Teléfono: 555-1234
Email: ana@email.com
Contacto guardado.
```

**Salida esperada:**
```
=== CONTACTOS ===
1. Ana López | 555-1234 | ana@email.com
2. Carlos Ruiz | 555-5678 | carlos@email.com
```
