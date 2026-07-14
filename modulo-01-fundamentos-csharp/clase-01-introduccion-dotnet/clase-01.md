# Clase 01 -- Introduccion a .NET, C# y creacion del primer programa

## Diplomado en Desarrollo de Software con .NET

### Modulo 1 -- Fundamentos de .NET y programacion con C#

---

# 1. Presentacion de la clase

Te damos la bienvenida al **Diplomado en Desarrollo de Software con .NET**.

Hoy iniciamos un viaje emocionante. Antes de construir grandes sistemas, APIs que conecten aplicaciones de todo el mundo o bases de datos complejas, necesitamos entender donde estamos parados. En esta primera clase vamos a descubrir que es esa plataforma llamada **.NET**, que papel juega el lenguaje de programacion **C#** y como la computadora entiende y ejecuta el codigo que escribimos.

**Nota importante:** No venimos a memorizar comandos aburridos ni a aprender que botones presionar en un menu. Venimos a entender como funciona el motor por dentro para que puedas resolver cualquier problema como un profesional.

Al final de esta sesion habras creado tu primer proyecto de consola desde la terminal, sabras como ejecutarlo y habras programado una aplicacion interactiva que recibe datos del usuario, los procesa y muestra un resultado personalizado.

---

# 2. Que aprenderas en esta clase

Al finalizar esta clase, seras capaz de:

- Explicar con tus propias palabras que es **.NET** usando analogias sencillas.
- Diferenciar claramente la plataforma **.NET**, el lenguaje **C#**, el **SDK** y el editor de codigo.
- Conocer las etapas clave en la evolucion de .NET (para saber por que hoy es tan genial).
- Entender que hace el **CLR** (el motor de tu codigo).
- Explicar la diferencia practica entre el **SDK** y el **Runtime**.
- Verificar que .NET este bien instalado en tu computadora.
- Crear un proyecto de consola desde cero usando solo la terminal.
- Navegar por los archivos principales que crea .NET y saber que hace cada uno.
- Compilar y ejecutar tu aplicacion con el comando `dotnet run`.
- Usar `Console.WriteLine` (para hablarle al usuario) y `Console.ReadLine` (para escucharlo).
- Crear variables de texto basicas (`string`) para guardar informacion.
- Unir textos de forma moderna usando la **interpolacion de cadenas**.
- Comprender el flujo universal del software: **Entrada -> Proceso -> Salida**.

---

# 3. Pregunta inicial

Para calentar motores, hagamonos la siguiente pregunta:

> **Si escuchas el termino ".NET", en que piensas? Es un lenguaje de programacion, un programa para escribir codigo, un editor visual o una plataforma de desarrollo?**

Es muy comun que al inicio la gente confunda los terminos. Algunos te diran que .NET es el lenguaje, otros pensaran que es el programa Visual Studio, y otros creeran que solo sirve para computadoras Windows.

Esto es normal porque durante muchos anos .NET estuvo muy amarrado a Windows y a Microsoft. Pero hoy las reglas del juego han cambiado por completo. Vamos a descubrirlo.

---

# 4. Que es .NET?

**.NET** (pronunciado "dot net") es una **plataforma de desarrollo de software** creada y mantenida por Microsoft.

Que significa que sea una "plataforma"? Significa que no es un simple programa ni un solo lenguaje. Es una **caja de herramientas gigante** que contiene todo lo necesario para construir, compilar (traducir), probar, ejecutar y distribuir aplicaciones de todo tipo.

Gracias a esta versatilidad, con .NET puedes crear:

- **Aplicaciones de Consola:** Programas basados en texto que se ejecutan en terminales.
- **Aplicaciones Web:** Sitios interactivos y portales de internet.
- **APIs REST:** Sistemas que permiten que diferentes aplicaciones se hablen entre si.
- **Sistemas Empresariales:** Grandes programas para bancos, hospitales o industrias.
- **Microservicios:** Pequenos programas independientes que trabajan juntos en la nube.
- **Aplicaciones Moviles:** Apps para Android e iOS.
- **Aplicaciones de Escritorio:** Programas con ventanas tradicionales para Windows o macOS.
- **Servicios en la Nube:** Software que se ejecuta en internet sin servidores locales.
- **Inteligencia Artificial e Internet de las Cosas (IoT):** Conexion con sensores y modelos inteligentes.
- **Videojuegos:** A traves de motores populares como Unity.

En resumen: **.NET es el ecosistema completo**, el escenario donde ocurre la magia del desarrollo.

---

## 4.1 Antes de la analogia: Que es cada componente

Antes de ver la analogia de la cocina, necesitas saber queSignifica cada termino en la vida real:

| Termino | Que es en palabras simples |
| :--- | :--- |
| **Plataforma .NET** | Todo el conjunto de herramientas, bibliotecas y reglas que necesitas para crear software. Como una cocina completa con estufa, hornos, ingredientes y recetas. |
| **Lenguaje C#** | El idioma que usas para escribir instrucciones a la computadora. Es como la receta escrita. |
| **SDK** | Las herramientas de desarrollo que instalas en tu computadora para crear codigo. Incluye compiladores, plantillas y mas. |
| **CLR** | El motor que ejecuta tu codigo cuando lo corres. Se encarga de gestionar memoria, errores y seguridad. |
| **VS Code** | Un editor de codigo ligero y gratuito donde escribes tu codigo fuente. |
| **NuGet** | Una tienda de paquetes listos para usar. Si necesitas una funcionalidad extra, la descargas de aqui. |

---

## 4.2 La analogia de la Cocina Profesional

Para entender la diferencia de los componentes, imaginemos que quieres preparar un platillo de alta cocina.

- **El Lenguaje C#:** Es la **receta escrita** en un idioma que tu y el ayudante de cocina entienden. Describe los pasos para hacer el plato.
- **La Plataforma .NET:** Es la **cocina profesional completa**. Tiene la estufa, los hornos, el agua corriente, la electricidad, las sartenes y los ingredientes base. Sin la cocina, la receta es solo papel mojado.
- **El SDK:** Es el **kit del chef** (cuchillos afilados, tazas medidoras, batidoras). Son las herramientas que usas *mientras preparas* la comida.
- **El CLR (Runtime):** Es la **estufa encendida** y las leyes de la fisica que hacen que los alimentos se cocinen cuando se calientan. Es lo que *ejecuta* la receta.
- **Visual Studio Code:** Es tu **tabla de picar** bien iluminada y limpia. El espacio comodo donde organizas tus ingredientes y escribes tus apuntes.
- **NuGet:** Es la **despensa de condimentos listos**. Si necesitas una salsa especial que ya alguien preparo, la tomas de la despensa en lugar de hacerla desde cero.

---

# 5. Que es C#?

**C#** (pronunciado "C Sharp") es un **lenguaje de programacion**. Es el idioma oficial que elegimos para darle instrucciones a la computadora dentro de la plataforma .NET.

Es un lenguaje moderno, elegante, estructurado, fuertemente tipado (lo que significa que es muy ordenado con los tipos de datos) y orientado a objetos.

Cuando escribes en tu archivo de codigo:

```csharp
Console.WriteLine("Hola mundo");
```

Estas usando el lenguaje C# para ordenarle a la computadora que muestre un mensaje en pantalla.

La diferencia clave que debes recordar es:

- **.NET** es la plataforma (la cocina y las herramientas).
- **C#** es el lenguaje (el idioma de la receta).

**Tip conceptual:** Aunque la gente a veces dice "estoy programando en .NET", lo tecnicamente correcto es decir: "Estoy programando en C# usando la plataforma .NET".

---

# 6. .NET, C# y Visual Studio no son lo mismo

Despejemos la confusion mas tipica de los principiantes:

### .NET
La plataforma base. Te da las bibliotecas de codigo ya hechas, el motor de ejecucion y las herramientas de traduccion (compilacion).

### C#
El lenguaje de programacion. Es el texto estructurado que escribes siguiendo ciertas reglas de ortografia y gramatica de programacion.

### Visual Studio Code (VS Code)
Un editor de codigo muy ligero, rapido y gratuito. Funciona en Windows, Mac y Linux. Es como un procesador de textos superavanzado disenado especialmente para programadores (colorea el codigo, ayuda a autocompletar y tiene terminal integrada).

### Visual Studio (Community/Professional)
Un programa mucho mas grande y pesado (un IDE o Entorno de Desarrollo Integrado). Tiene muchisimas herramientas visuales y asistentes. Se usa bastante en entornos corporativos de Windows.

> **En este diplomado utilizaremos:**
> **.NET SDK + C# + Visual Studio Code + Terminal + Git/GitHub**
>
> Esta combinacion es la mas recomendada hoy en dia porque te permite programar en cualquier sistema operativo (Windows, Linux o macOS) sin gastar recursos de tu computadora en programas pesados.

---

# 7. Que significa que .NET sea multiplataforma?

En el pasado (con el viejo *.NET Framework*), estabas obligado a usar Windows para programar y para ejecutar tus aplicaciones. Si querias montar tu servidor en Linux, no podias.

El .NET moderno es **multiplataforma de verdad**. Esto significa que:

1. Puedes instalar las herramientas de desarrollo en Windows, macOS o Linux.
2. El codigo que escribes en tu Mac funcionara perfectamente en la computadora con Windows de tu compañero y en el servidor con Linux en la nube.
3. Los comandos en la terminal son exactamente iguales en cualquier sistema:
   - `dotnet new console` (crear)
   - `dotnet build` (compilar/construir)
   - `dotnet run` (ejecutar)

**Por que es vital esto en el mundo real?** Porque casi todos los servidores web modernos y contenedores (como Docker) que corren en la nube (AWS, Azure, Google Cloud) utilizan Linux por su estabilidad y bajo costo. .NET moderno se adapta perfectamente a este ecosistema.

---

# 8. Historia y evolucion de .NET

Para entender donde estamos hoy, debemos hacer un viaje rapido en el tiempo. La historia se divide en tres grandes eras:

---

## 8.1 Primera etapa: .NET Framework (El inicio)

- **Ano de lanzamiento:** 2002.
- **Objetivo:** Exclusivo para aplicaciones que corrían en el sistema operativo Windows.
- **Tecnologias famosas de esa epoca:** Windows Forms (para programas de ventanas de escritorio), ASP.NET Web Forms y el Entity Framework original.
- **El problema:** Estaba atado a Windows. Si querias portar tu aplicacion a un servidor Linux, tenias que reescribirla en otro lenguaje.
- **Hoy en dia:** Se le conoce como **tecnologia legada** (sistemas heredados). Sigue existiendo en muchas empresas antiguas porque sus sistemas ya funcionan ahi y migrarlos cuesta tiempo y dinero, pero no se recomienda para proyectos nuevos.

---

## 8.2 Segunda etapa: .NET Core (La revolucion)

- **Ano de lanzamiento:** 2016.
- **Objetivo:** Reinventar la plataforma desde cero para adaptarla al internet moderno.
- **Novedades:** Nacio como codigo abierto (Open Source), multiplataforma y con un rendimiento increiblemente rapido.
- **Consecuencia:** Los desarrolladores de Linux y Mac pudieron empezar a usar .NET sin instalar maquinas virtuales de Windows.

---

## 8.3 Tercera etapa: .NET moderno (La unificacion)

Microsoft decidio quitar la palabra "Core" para evitar confusiones y unir lo mejor de ambos mundos en una sola plataforma.

**Linea de tiempo:**

- **.NET 5** (Unificacion inicial)
- **.NET 6** (LTS - Version con soporte a largo plazo)
- **.NET 7** (Version de transicion)
- **.NET 8** (LTS - Version estable muy recomendada en la actualidad)
- **.NET 9** / **.NET 10** (Versiones mas recientes)

Hoy en dia, cuando dices **.NET** (a secas, sin la palabra "Framework" ni "Core"), te refieres a esta plataforma moderna, unificada, rapida y multiplataforma.

> **Resumen:** .NET Framework (2002, solo Windows) -> .NET Core (2016, multiplataforma) -> .NET moderno (2020+, unificado). Si今天 aprendes .NET, estas aprendiendo la version moderna.

---

# 9. El ecosistema .NET: Como viaja tu codigo

Cuando escribes un programa en C#, la computadora no puede leer tus palabras directamente. Pasa por un flujo de traduccion inteligente:

```
Tu Codigo en C# (.cs)
        |
        v  (Paso 1: Compilacion de desarrollo)
   Compilador Roslyn
        |
        v
Codigo Intermedio (IL - un "esperanto" universal de .NET)
        |
        v  (Paso 2: Compilacion en caliente - JIT)
 Motor CLR (Common Language Runtime)
        |
        v
Codigo Maquina (Ceros y unos que entiende tu procesador especifico)
        |
        v
  Ejecucion en el Sistema Operativo!
```

**Explicacion paso a paso:**

1. **Tu codigo en C#:** Escribes instrucciones en lenguaje humano (mas o menos).
2. **Compilador Roslyn:** Traduce tu codigo a un lenguaje intermedio (IL) que cualquier computadora con .NET puede entender.
3. **Motor CLR:** Toma ese codigo intermedio y lo traduce a codigo maquina (ceros y unos) especifico para tu procesador.
4. **Ejecucion:** Tu computadora ejecuta las instrucciones y ves el resultado en pantalla.

---

# 10. Que es el CLR (Common Language Runtime)?

El **CLR** es el **motor de ejecucion** de .NET. Es el director de la obra de teatro.

Cuando tu codigo ha sido traducido a ese lenguaje intermedio (IL), el CLR toma el mando y se encarga de:

1. **Administrar la memoria:** Decide donde se guardan tus datos en la RAM y limpia lo que ya no usas.
2. **Manejar errores:** Si algo sale mal (por ejemplo, intentar dividir por cero), el CLR evita que la computadora colapse y te avisa que paso (manejo de excepciones).
3. **Seguridad:** Revisa que el programa no intente hacer cosas prohibidas en el sistema.
4. **Traduccion final:** Usa el compilador JIT para convertir el codigo en instrucciones que tu procesador (Intel, AMD o ARM) entienda al instante.

> **Resumen:** El CLR es como un jefe de obra que supervisa que todo salga bien cuando tu codigo se ejecuta.

---

# 11. Codigo administrado: Programacion sin estres

El codigo que escribes en C# se conoce como **codigo administrado** (Managed Code).

Se llama asi porque se ejecuta bajo la atenta vigilancia del CLR. Tu no tienes que preocuparte por gestionar directamente los chips de memoria RAM de tu computadora.

Por ejemplo, si escribes:

```csharp
string nombre = "Laura";
```

El CLR busca un espacio libre en la memoria RAM, acomoda el texto "Laura" ahi, se asegura de que nadie lo borre por accidente mientras lo usas y lo libera cuando terminas. Es como tener un asistente personal para tu memoria!

---

# 12. Garbage Collector (El recolector de basura)

Dentro del CLR vive un heroe silencioso llamado el **Garbage Collector** (Recolector de Basura).

> **Analogia del Restaurante:** Imagina que estas comiendo en un restaurante. A medida que terminas tus platos, un mesero muy atento pasa por tu mesa y se lleva los platos vacios para dejar espacio libre. Si el mesero no hiciera su trabajo, la mesa se llenaria de platos sucios y ya no tendrias espacio para el postre.

En tu programa, cuando creas variables u objetos, estos ocupan espacio en la memoria RAM. Si tu programa sigue corriendo y ya no usas esas variables, el **Garbage Collector** pasa automaticamente, identifica la "basura" (datos sin referencias activas) y libera esa memoria para que tu computadora no se vuelva lenta.

> **Resumen:** Tu escribes codigo y el Garbage Collector se encarga automaticamente de limpiar la memoria que ya no usas. No tienes que hacer nada manualmente.

---

# 13. Compilacion JIT (Just-In-Time o "Justo a Tiempo")

El compilador **JIT** realiza la traduccion final del codigo intermedio a codigo maquina (ceros y unos) justo en el momento en que abres y ejecutas la aplicacion.

> **Analogia del Traductor Simultaneo:** Imagina que un conferencista da una charla en ingles y tu solo hablas espanol. Tienes un traductor en tu oido que te va traduciendo cada frase *justo a tiempo* (en tiempo real) a medida que el orador habla.

El JIT hace exactamente eso: toma el codigo intermedio (IL) y lo traduce al dialecto exacto de tu procesador (Intel, AMD, Apple Silicon M1/M2/M3) en el milisegundo en que el programa se esta ejecutando. Esto permite que el programa sea sumamente rapido y optimizado para tu hardware especifico.

> **Resumen:** El JIT no traduce todo de una sola vez. Traduce cuando lo necesitas, justo cuando el programa se esta ejecutando.

---

# 14. SDK y Runtime: Cual necesitas

Es muy importante no confundir estos instaladores cuando configures una computadora:

### Runtime (Entorno de Ejecucion)

- **Que hace:** Contiene el motor minimo (CLR) para que los programas de .NET puedan abrirse y funcionar.
- **Para quien es:** Para el **usuario final** que solo quiere usar una aplicacion que tu programaste.
- **Analogia:** Es el enchufe de la pared que te da energia para prender la television.

### SDK (Software Development Kit / Kit de Desarrollo)

- **Que hace:** Contiene el compilador, las plantillas de codigo, las herramientas de diagnostico y tambien incluye el Runtime.
- **Para quien es:** Para los **desarrolladores** (nosotros). Nos permite crear codigo nuevo, compilarlo y depurarlo.
- **Analogia:** Es la fabrica donde se disenan y ensamblan las televisiones.

| Si quieres... | Necesitas instalar... |
| :--- | :--- |
| **Solo correr un programa de .NET** | El Runtime |
| **Aprender a programar y crear apps** | El SDK (contiene todo) |

> **En este diplomado necesitas el SDK.** Si ya lo instalaste, tienes todo lo que necesitas.

---

# 15. La CLI de .NET (Tu centro de mando)

La **CLI** (Command-Line Interface) es la herramienta que te permite comunicarte con .NET escribiendo comandos de texto en la terminal.

Cuando instalas el SDK, se activa en tu sistema el comando base:

```bash
dotnet
```

A partir de ahi, puedes controlar tus proyectos usando combinaciones muy sencillas. Aqui tienes los comandos que usaras todos los dias:

| Comando | Para que sirve |
| :--- | :--- |
| `dotnet --version` | Muestra la version exacta del SDK instalado. |
| `dotnet --info` | Da un reporte detallado del sistema y de .NET. |
| `dotnet new list` | Lista todas las plantillas disponibles para crear proyectos. |
| `dotnet new console` | Crea un nuevo proyecto de Consola (basado en texto). |
| `dotnet restore` | Descarga las bibliotecas externas que necesita el proyecto. |
| `dotnet build` | Revisa la ortografia del codigo y compila el proyecto. |
| `dotnet run` | Compila y ejecuta el programa al instante. |
| `dotnet watch run` | Ejecuta el programa y lo reinicia automaticamente cada vez que guardas un cambio en el codigo (recarga automatica). |
| `dotnet test` | Corre pruebas automaticas para verificar que todo funcione. |
| `dotnet publish` | Prepara tu aplicacion en una carpeta lista para subirla a internet o enviarsela al cliente. |

> **Guarda esta tabla.** La usaremos constantemente durante el diplomado.

---

# 16. Por que utilizaremos la terminal? (Pierde el miedo a la pantalla negra)

Es comun que al principio la terminal intimide un poco. Estamos acostumbrados a hacer clic en iconos y botones brillantes. Sin embargo, en el desarrollo profesional, la terminal es tu mejor aliada por varias razones:

1. **Es identica en todos lados:** El comando `dotnet run` funciona exactamente igual en una laptop Windows barata, en una Mac moderna y en un servidor superpotente en Linux.
2. **Entiendes el proceso:** Al no tener un boton que haga todo en secreto, ves claramente cuando se compila tu codigo, donde se guardan los archivos y que errores ocurren.
3. **Automatizacion y DevOps:** En las empresas modernas, el codigo se despliega a internet automaticamente usando scripts de terminal. Saber usarla te da una ventaja enorme en el mercado laboral.

---

# 17. Verificar la instalacion

Comencemos a tocar la tecnologia. Abre la terminal de tu sistema operativo (Terminal en macOS/Linux, o PowerShell / Simbolo del Sistema en Windows) y escribe el siguiente comando:

```bash
dotnet --version
```

Si el SDK esta bien instalado, la terminal te respondera con un numero de tres partes, por ejemplo:

```text
8.0.401
```

El numero puede ser 8.0, 9.0 o 10.0 dependiendo de la version instalada, lo importante es que responda con la version del SDK y no con un error.

Si quieres ver detalles de tu sistema operativo y saber que Runtimes tienes instalados, escribe:

```bash
dotnet --info
```

**Si aparece un error tipo:** `"dotnet: command not found"` o `"dotnet no se reconoce como un comando interno"`: Significa que el SDK de .NET no esta instalado en tu equipo o que debes reiniciar la terminal para que reconozca los cambios. Puedes descargarlo gratis desde [dotnet.microsoft.com](https://dotnet.microsoft.com/).

> **Verificacion:** Antes de continuar, asegurate de que `dotnet --version` te devuelva un numero. Si no, resuelve el problema antes de seguir.

---

# 18. Crear la carpeta del diplomado

Vamos a crear un espacio de trabajo ordenado en nuestra computadora. Escribe estos comandos uno por uno en tu terminal:

```bash
mkdir DiplomadoDotNet
cd DiplomadoDotNet
```

- `mkdir` (Make Directory): Crea una nueva carpeta llamada `DiplomadoDotNet`.
- `cd` (Change Directory): Te mete dentro de la carpeta que acabas de crear.

Para verificar que estas en la ruta correcta, puedes escribir:

```bash
pwd
```

Este comando te mostrara la ruta completa de la carpeta en la que esta parada tu terminal en este momento.

---

# 19. Crear el primer proyecto

Ahora que estamos dentro de nuestra carpeta de trabajo, le ordenaremos a .NET que nos prepare un proyecto desde cero:

```bash
dotnet new console -n HolaDotNet
```

Desarmemos este comando para entenderlo:

- `dotnet`: Llama a la herramienta del SDK de .NET.
- `new`: Le dice que queremos crear un proyecto nuevo.
- `console`: Especifica que la plantilla inicial sera una aplicacion de consola (modo texto).
- `-n HolaDotNet`: El parametro `-n` significa *name* (nombre), por lo que le asignamos el nombre **HolaDotNet** al proyecto.

Al presionar Enter, .NET creara una subcarpeta llamada `HolaDotNet` llena de archivos listos para usar. Entremos a esa nueva carpeta:

```bash
cd HolaDotNet
```

> **Verificacion:** Antes de seguir, asegurate de estar dentro de la carpeta `HolaDotNet`. Escribe `pwd` para confirmar.

---

# 20. Archivos creados: Que hay dentro de la caja

Si listamos los archivos de nuestra carpeta ejecutando `ls` (en Linux/macOS) o `dir` (en Windows), veremos la siguiente estructura basica:

```text
HolaDotNet/
|-- HolaDotNet.csproj   <-- Configuracion del proyecto (XML)
|-- Program.cs          <-- Tu codigo fuente en C#
|-- obj/                <-- Archivos temporales del compilador (no tocar)
```

Nota: Despues de compilar o correr el proyecto por primera vez, veras que aparece una carpeta adicional llamada `bin/`, que es donde se guarda el programa ejecutable final.

---

## 20.1 Archivo `Program.cs` (El cerebro de la aplicacion)

Este es el archivo mas importante para nosotros. Aqui es donde escribiremos nuestro codigo C#. Si lo abrimos, veremos una sola linea de codigo limpia y directa:

```csharp
Console.WriteLine("Hello, World!");
```

Analiquemos esta linea con lupa:

- `Console`: Es una **Clase** preconstruida en .NET que representa la ventana de texto (consola) de tu sistema.
- `.`: El punto es el conector que usamos para acceder a las herramientas que tiene la consola.
- `WriteLine`: Es un **Metodo** (una accion o funcion) que le ordena a la consola escribir el texto que le demos y luego dar un salto de linea (como presionar Enter al escribir).
- `"Hello, World!"`: Es una **cadena de texto** (String). En C#, todo texto plano debe ir estrictamente rodeado de comillas dobles.
- `;`: El punto y coma es el "punto final" de la oracion. En C#, casi todas las instrucciones deben terminar con `;` para avisarle al compilador que la orden ha terminado.

---

## 20.2 Archivo `.csproj` (El pasaporte del proyecto)

El archivo `.csproj` (C-Sharp Project) es un archivo escrito en formato **XML** que guarda la configuracion del proyecto. Le dice a .NET como debe compilar la aplicacion. Su contenido se ve asi:

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net8.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

Desmitifiquemos estas etiquetas:

- `<OutputType>Exe</OutputType>`: Le dice a .NET que compile este proyecto como un programa ejecutable independiente (`.exe` en Windows, o binario ejecutable en Linux/Mac), no como una biblioteca de funciones para otros programas.
- `<TargetFramework>net8.0</TargetFramework>`: Indica que la aplicacion esta programada para ejecutarse sobre la version **.NET 8.0** (o la version que tengas instalada, como `net10.0`).
- `<ImplicitUsings>enable</ImplicitUsings>`: Activa las importaciones implicitas. Esto nos evita tener que escribir molestas lineas de importacion como `using System;` al inicio de cada archivo.
- `<Nullable>enable</Nullable>`: Activa el analizador de nulos moderno para ayudarnos a evitar errores cuando las variables no tienen valores asignados.

---

## 20.3 Carpeta `obj/` (El borrador del compilador)

Esta carpeta la crea .NET automaticamente. Contiene configuraciones temporales y referencias que el compilador necesita para hacer su trabajo rapidamente. **Regla de oro:** No debes editar ni meter archivos manualmente en esta carpeta. Si la borras por accidente, no pasa nada; se volvera a crear la proxima vez que construyas el proyecto.

---

## 20.4 Carpeta `bin/` (El producto terminado)

Aparece una vez que compilas o ejecutas el proyecto. Su nombre viene de "binary" (binario). Dentro de ella, en la ruta `bin/Debug/net8.0/`, encontraras los archivos finales del programa ya traducidos que puedes copiar a otra computadora para que funcione sin necesidad de tener el codigo fuente.

---

# 21. Ejecutar el proyecto

Para ver tu programa en accion, asegurate de estar dentro de la carpeta donde se encuentra el archivo `.csproj` y escribe en la terminal:

```bash
dotnet run
```

Veras que tras unos segundos de espera, la terminal te muestra el saludo oficial de la programacion:

```text
Hello, World!
```

Felicidades. Acabas de compilar y ejecutar tu primera aplicacion en .NET.

> **Verificacion:** Si ves "Hello, World!" en tu terminal, todo esta funcionando correctamente. Si no, revisa que estes en la carpeta correcta y que el SDK este instalado.

---

# 22. Que hace `dotnet run` por debajo

Cuando presionas Enter en `dotnet run`, ocurren tres pasos automaticos en milisegundos:

1. **Restore (Restaurar):** Revisa si necesitas alguna biblioteca externa y la descarga de internet.
2. **Build (Compilar):** El compilador lee tu archivo `Program.cs`, verifica que no tengas errores de ortografia en el codigo y lo traduce al Lenguaje Intermedio (IL) guardandolo en la carpeta `bin/`.
3. **Run (Ejecutar):** El motor CLR toma ese archivo compilado, lo traduce a codigo maquina en caliente usando JIT y ejecuta las instrucciones en la pantalla.

---

# 23. `dotnet build` vs `dotnet run`

Aunque parecen similares, cumplen roles distintos:

### `dotnet build`

- **Que hace:** Solo compila el codigo. Revisa que no haya errores de sintaxis y crea los archivos binarios de la carpeta `bin/`. **No abre el programa**.
- **Cuando usarlo:** Cuando estas escribiendo codigo complejo y quieres verificar si tiene errores antes de probarlo.

### `dotnet run`

- **Que hace:** Compila el codigo (si detecta cambios nuevos) y **abre el programa inmediatamente** para que interactues con el.
- **Cuando usarlo:** En tu dia a dia para probar los cambios en tiempo real.

---

# 24. Abrir el proyecto en Visual Studio Code

Para editar tu codigo comodamente, abre el proyecto en VS Code. Puedes hacerlo desde la terminal escribiendo:

```bash
code .
```

El punto `.` le indica a VS Code que debe abrir la carpeta en la que esta parada actualmente la terminal.

Una vez abierto, podras ver a la izquierda el arbol de archivos y al hacer clic en `Program.cs` se abrira el editor de texto a la derecha con colores inteligentes que te guiarn.

---

# 25. Primer cambio en el programa

Vamos a personalizar nuestro programa. En VS Code, abre el archivo `Program.cs`, borra el saludo en ingles y escribe lo siguiente:

```csharp
Console.WriteLine("Hola, bienvenidos al Diplomado de Desarrollo con .NET");
```

Guarda el archivo presionando **`Ctrl + S`** (o **`Cmd + S`** si estas en Mac).

Ahora, regresa a tu terminal y ejecuta de nuevo:

```bash
dotnet run
```

La salida en pantalla ahora sera:

```text
Hola, bienvenidos al Diplomado de Desarrollo con .NET
```

> **Punto de verificacion:** Si ves el mensaje en espanol, ya sabes como modificar y ejecutar tu codigo. Si no ves el cambio, asegurate de haber guardado el archivo antes de ejecutar `dotnet run`.

---

# 26. Top-level statements (Instrucciones de nivel superior)

Si buscas en internet tutoriales antiguos de C#, veras que para escribir un simple "Hola Mundo" te pedian escribir una estructura enorme como esta:

```csharp
using System;

namespace HolaDotNet
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hola mundo");
        }
    }
}
```

> **Analogia de la correspondencia:** El codigo clasico es como escribir una carta formal antigua de oficina (con membrete, direccion del remitente, asunto, fecha, saludo de protocolo, firma y sello) solo para decir "Hola".
> El estilo moderno (**Top-level statements**) es como enviar un mensaje rapido de WhatsApp directo al grano: `Console.WriteLine("Hola");`.

En C# moderno (version 9 en adelante), el compilador es inteligente. Sabe que si escribes instrucciones sueltas al inicio de tu archivo `Program.cs`, el debe crear toda esa estructura clasica de clases y metodos por detras de escena de forma automatica.

Ambos estilos son perfectamente validos y hacen exactamente lo mismo. En el diplomado utilizaremos el formato moderno para concentrarnos en aprender la logica de programacion sin distraernos con estructuras avanzadas que estudiaremos en el modulo de Programacion Orientada a Objetos.

---

# 27. Instrucciones y sintaxis (Las reglas del juego)

Las computadoras son sumamente obedientes, pero muy cuadradas. No tienen sentido comun. Si cometes un pequeno error en la ortografia de tu codigo, no sabran que hacer. A las reglas de escritura de un lenguaje las llamamos **sintaxis**.

Mira estos ejemplos:

**Sintaxis Correcta:**

```csharp
Console.WriteLine("Hola");
```

Tiene mayusculas en su lugar, el texto esta entre comillas dobles y cierra con punto y coma.

**Sintaxis Incorrecta (Faltan comillas):**

```csharp
Console.WriteLine(Hola);
```

El compilador cree que `Hola` es una variable o una orden interna que no existe, en lugar de texto plano.

---

# 28. C# distingue mayusculas y minusculas (Case Sensitivity)

En C#, las mayusculas importan y mucho. `Console`, `console` y `CONSOLE` son cosas completamente diferentes para el compilador.

**Ejemplo correcto:**

```csharp
Console.WriteLine("Hola");
```

**Ejemplo incorrecto:**

```csharp
console.WriteLine("Hola");
```

Este codigo fallara porque la clase del sistema se llama `Console` con C mayuscula. La version con minuscula no existe para el compilador.

---

# 29. Comentarios (Tus notas adhesivas en el codigo)

Los comentarios son textos explicativos que escribes dentro del archivo para ti mismo o para tus compañeros de equipo. El compilador los ignora por completo al ejecutar el programa.

Existen dos tipos de comentarios:

### Comentario de una sola linea

Se crea escribiendo dos barras diagonales `//`. Todo lo que este a la derecha de las barras en esa misma linea sera ignorado.

```csharp
// Este es un comentario: a continuacion saludamos al usuario
Console.WriteLine("Hola");
```

### Comentario de multiples lineas

Se abre con `/*` y se cierra con `*/`. Es ideal para explicaciones largas o para desactivar bloques de codigo temporalmente.

```csharp
/*
  Este programa es el ejemplo principal de la Clase 1.
  Muestra como funciona la interaccion basica en consola.
  Creado en julio de 2026.
*/
Console.WriteLine("Fin del programa");
```

**Buena practica:** No uses comentarios para explicar lo obvio.

- Comentario inutil: `// Imprime hola` arriba de `Console.WriteLine("hola");`.
- Comentario util: `// Usamos este formato especial de texto para cumplir con la regulacion fiscal` arriba de una formula compleja.

---

# 30. Mostrar informacion: `Console.WriteLine` vs `Console.Write`

Para mostrar mensajes en la terminal tenemos dos herramientas con una pequena pero importante diferencia:

- **`Console.WriteLine`:** Escribe el texto en pantalla y **salta a la siguiente linea** (como pulsar Enter en un teclado).
- **`Console.Write`:** Escribe el texto en pantalla pero **mantiene el cursor en la misma linea**. Lo que escribas despues aparecera pegado a continuacion.

> **Analogia:** Imagina una maquina de escribir antigua. `Console.Write` escribe letras en el papel. `Console.WriteLine` escribe letras y luego activa la palanca para bajar el papel un renglon.

**Comparacion practica:**

```csharp
Console.WriteLine("Linea A");
Console.WriteLine("Linea B");
```

Salida en consola:

```text
Linea A
Linea B
```

```csharp
Console.Write("Nombre: ");
Console.Write("Ana");
```

Salida en consola:

```text
Nombre: Ana
```

---

# 31. Leer informacion con `Console.ReadLine`

Para crear programas interactivos necesitamos recibir datos del usuario. La herramienta para escuchar lo que el usuario escribe en el teclado es:

```csharp
Console.ReadLine();
```

Cuando el programa llega a esa instruccion, se "congela" temporalmente y se queda esperando a que el usuario escriba algo en la consola. En el momento en que el usuario presiona la tecla **Enter**, el programa se reactiva, toma todo lo escrito y lo guarda para que lo uses.

---

# 32. Que es una variable? (La analogia de las cajas)

Una **variable** es un espacio reservado en la memoria de la computadora donde guardamos un dato que puede cambiar durante la ejecucion del programa.

> **Analogia de la Mudanza:** Imagina que estas empacando tus cosas en cajas. Para no volverte loco al desempacar, haces tres cosas con cada caja:
> 1. Decides **que tipo de cosas** meteras (ejemplo: solo libros).
> 2. Le pegas una **etiqueta con un nombre** (ejemplo: "CajaLibros").
> 3. Metes el **contenido** adentro (ejemplo: un libro de C#).

En C#, declarar una variable sigue exactamente la misma logica:

```csharp
string nombre = "Ana";
```

- `string`: Especifica el **tipo de dato** que guardara la caja (en este caso, solo textos).
- `nombre`: Es el **nombre de la variable** (la etiqueta para identificar la caja).
- `=`: Es el operador de **asignacion**. Significa: "toma lo de la derecha y metelo en la caja de la izquierda".
- `"Ana"`: Es el **valor inicial** que guardamos dentro.

A partir de esa linea, cada vez que uses la palabra `nombre` en tu codigo, la computadora abrira la caja y leera lo que hay dentro:

```csharp
Console.WriteLine(nombre);
```

Salida:

```text
Ana
```

---

# 33. El tipo `string` (Cadenas de texto)

El tipo de dato **`string`** sirve para almacenar cadenas de caracteres (palabras, frases, parrafos o cualquier conjunto de letras y simbolos).

```csharp
string pais = "Colombia";
string codigoPostal = "080001"; // Aunque son numeros, los guardamos como texto para no operar matematicamente con ellos.
string saludo = "Hola, como estas hoy?";
```

Recuerda: Los valores para variables de tipo `string` deben ir obligatoriamente entre **comillas dobles** `""`.

---

# 34. Valores anulables, el fantasma del `null` y el salvavidas `??`

En C# moderno, si creas un proyecto nuevo y escribes:

```csharp
string nombre = Console.ReadLine();
```

Es probable que veas una advertencia amarilla (un *warning*) que dice que el valor devuelto puede ser nulo.

**Por que ocurre esto?**

Porque `Console.ReadLine()` devuelve tecnicamente un **`string?`** (con signo de interrogacion). Ese signo significa que la variable es **anulable** (Nullable). Es decir, que podria contener un valor real de texto... o podria contener **`null`** (la nada absoluta, la ausencia total de valor, una caja de regalo que no tiene nada adentro, ni siquiera aire).

Si intentas hacer operaciones con una variable que esta vacia (`null`), el programa podria colapsar con el temido error `NullReferenceException`.

**Como nos protegemos?**

Tenemos dos formas sencillas de resolver esto en nuestros primeros programas:

1. **Aceptar que puede ser nulo (`string?`):**

   ```csharp
   string? nombre = Console.ReadLine();
   ```

   Le decimos al compilador: "Estoy consciente de que esta caja puede venir vacia".

2. **Usar el operador salvavidas `??` (Fusion de Nulos):**

   ```csharp
   string nombre = Console.ReadLine() ?? "";
   ```

   El operador `??` evalua lo de la izquierda. Si viene con datos, los usa. Si viene vacio (`null`), usa el valor por defecto de la derecha, que en este caso es un texto vacio `""` o un texto comodin como "Anonimo".

> **En resumen:** Cuando leas algo del usuario con `Console.ReadLine()`, usa `?? ""` al final para evitar problemas con valores vacios.

---

# 35. Concatenacion (El pegamento clasico de textos)

La **concatenacion** consiste en unir dos o mas cadenas de texto para formar una sola. En C#, el pegamento que usamos para esto es el operador mas `+`.

```csharp
string nombre = "Laura";
Console.WriteLine("Hola " + nombre + ", bienvenido.");
```

Si queremos unir varias variables, el codigo puede volverse un poco dificil de leer debido a tantas comillas y signos `+`:

```csharp
string nombre = "Laura";
string lenguaje = "C#";
Console.WriteLine("Hola " + nombre + ", estas programando en " + lenguaje + " hoy.");
```

---

# 36. Interpolacion de cadenas (El pegamento moderno)

Para evitar el desorden de los signos `+`, C# incluye una caracteristica espectacular llamada **interpolacion de cadenas**.

Para usarla, hacemos lo siguiente:

1. Colocamos el simbolo de dinero **`$`** justo antes de abrir las comillas dobles de nuestro texto.
2. Escribimos nuestro texto normalmente, y cuando queramos meter una variable, simplemente la colocamos entre llaves **`{}`**.

**Comparacion:**

**Estilo antiguo (Concatenacion):**

```csharp
Console.WriteLine("Hola " + nombre + ", estudias " + curso);
```

**Estilo moderno (Interpolacion):**

```csharp
Console.WriteLine($"Hola {nombre}, estudias {curso}");
```

Como puedes ver, la segunda opcion es muchisima mas limpia, facil de leer y de escribir.

---

# 37. Entrada, proceso y salida: El ciclo universal del software

Cualquier programa en el mundo, desde la calculadora mas sencilla hasta el algoritmo de inteligencia artificial mas complejo de Netflix, funciona bajo el mismo principio basico:

```
  [ Entrada ]  -->  [ Proceso ]  -->  [ Salida ]
 (Capturar datos)   (Hacer algo)    (Mostrar resultado)
```

1. **Entrada (Input):** Como entran los datos al programa (teclado, base de datos, un sensor, internet).
2. **Proceso (Process):** La logica del programa (sumar, ordenar, guardar, validar).
3. **Salida (Output):** El resultado que entregamos (un mensaje en pantalla, un archivo guardado, un sonido).

**En nuestra primera aplicacion de consola:**

- **Entrada:** El usuario escribe su nombre mediante `Console.ReadLine()`.
- **Proceso:** Guardamos ese texto en la variable `nombre` y preparamos un saludo.
- **Salida:** Imprimimos el saludo personalizado en pantalla con `Console.WriteLine()`.

> **Lo importante:** Cada vez que crees un programa, preguntate: "Que datos entran? Que hago con ellos? Que muestro al usuario?"

---

# 38. Ejemplo inicial interactivo

Veamos como se ve todo esto junto en un programa funcional. Abre `Program.cs` y escribe este codigo:

```csharp
// Entrada: Pedimos el nombre del usuario
Console.Write("Como te llamas? ");
string nombre = Console.ReadLine() ?? "";

// Proceso y Salida: Mostramos el mensaje final usando interpolacion
Console.WriteLine($"Hola, {nombre}!");
Console.WriteLine("Te damos la bienvenida al Diplomado de Desarrollo con .NET!");
```

Prueba a ejecutarlo con `dotnet run` en tu terminal y escribe tu nombre cuando el programa se detenga.

---

# 39. Practica guiada -- Registro de estudiante

Vamos a subir el nivel y crear un programa interactivo completo para registrar los datos de un estudiante en nuestro diplomado:

```csharp
// ==========================================
// FORMULARIO DE REGISTRO - DIPLOMADO .NET
// ==========================================

Console.WriteLine("======================================");
Console.WriteLine("       REGISTRO DE ESTUDIANTE .NET    ");
Console.WriteLine("======================================");

// Captura de datos (Entrada)
Console.Write("Nombre completo: ");
string nombre = Console.ReadLine() ?? "";

Console.Write("Ciudad de residencia: ");
string ciudad = Console.ReadLine() ?? "";

Console.Write("Ocupacion actual: ");
string ocupacion = Console.ReadLine() ?? "";

Console.Write("Tienes experiencia en programacion? (Si/No/Basica): ");
string experiencia = Console.ReadLine() ?? "";

Console.Write("Que esperas aprender en este diplomado?: ");
string expectativa = Console.ReadLine() ?? "";

// Separador visual
Console.WriteLine();

// Presentacion de resultados (Proceso y Salida)
Console.WriteLine("======================================");
Console.WriteLine("          DATOS REGISTRADOS           ");
Console.WriteLine("======================================");
Console.WriteLine($"Nombre:      {nombre}");
Console.WriteLine($"Ciudad:      {ciudad}");
Console.WriteLine($"Ocupacion:   {ocupacion}");
Console.WriteLine($"Experiencia: {experiencia}");
Console.WriteLine($"Expectativa: {expectativa}");
Console.WriteLine("======================================");

Console.WriteLine();
Console.WriteLine($"Registro completado con exito, {nombre}! Bienvenido al curso.");
```

---

# 40. Analisis del programa

Detengamonos un momento a ver que detalles hacen que este programa funcione tan bien:

- **Uso combinado de `Write` y `WriteLine`:** Usamos `Console.Write("Nombre completo: ");` para que el cursor se quede al lado del texto y el usuario escriba su respuesta en la misma linea. Se ve mucho mas estetico y ordenado.
- **Saltos de linea en blanco:** `Console.WriteLine();` se utiliza sin texto para generar un espacio en blanco y que la pantalla no se vea saturada de información pegada.
- **Estructura visual:** Los separadores hechos con signos de igualdad `====` ayudan a delimitar las secciones del programa, simulando un formulario real en modo texto.

---

# 41. Ejecucion esperada

Cuando corras el programa anterior con `dotnet run`, la interaccion en tu terminal deberia verse asi de ordenada:

```text
======================================
       REGISTRO DE ESTUDIANTE .NET    
======================================
Nombre completo: Ana Martinez
Ciudad de residencia: Barranquilla
Ocupacion actual: Estudiante
Tienes experiencia en programacion? (Si/No/Basica): Basica en Python
Que esperas aprender en este diplomado?: Crear APIs web profesionales

======================================
          DATOS REGISTRADOS           
======================================
Nombre:      Ana Martinez
Ciudad:      Barranquilla
Ocupacion:   Estudiante
Experiencia: Basica en Python
Expectativa: Crear APIs web profesionales
======================================

Registro completado con exito, Ana Martinez! Bienvenido al curso.
```

---

# 42. Actividad 1 -- Ficha personal

Crea un proyecto de consola independiente desde tu terminal llamado `FichaPersonal`:

**Pasos:**

1. Abre tu terminal.
2. Asegurate de estar en la carpeta raiz `DiplomadoDotNet` (puedes retroceder una carpeta usando `cd ..` si estas dentro de `HolaDotNet`).
3. Ejecuta el comando:

   ```bash
   dotnet new console -n FichaPersonal
   ```

4. Entra a la carpeta del proyecto: `cd FichaPersonal`.
5. Abre el archivo `Program.cs` en VS Code y modificalo para que solicite:
   - Nombre completo.
   - Edad.
   - Ciudad.
   - Ocupacion.
   - Comida favorita.
   - Pasatiempo (hobby).
6. El programa debe mostrar en consola una ficha organizada con esta estructura:

```text
========= FICHA PERSONAL ==========
Nombre:          Laura Gomez
Edad:            22 anos
Ciudad:          Barranquilla
Ocupacion:       Estudiante
Comida favorita: Pizza
Pasatiempo:      Tocar guitarra
====================================
```

Por ahora, maneja la edad como una variable de tipo `string`.

---

# 43. Actividad 2 -- Presentador de producto

Crea un proyecto de consola llamado `PresentadorProducto`.

El programa debe simular la entrada de datos de un inventario simple solicitando:

- Nombre del producto.
- Categoria.
- Precio.
- Cantidad disponible.
- Descripcion del producto.

Debe mostrar al final la tarjeta de informacion del producto organizada de la siguiente manera:

```text
=========== PRODUCTO ===========
Nombre:              Audifonos Bluetooth
Categoria:           Tecnologia
Precio:              $85.000
Cantidad disponible: 12 unidades
Descripcion:         Audifonos inalambricos con estuche de carga
================================
```

Nota: En la siguiente clase aprenderemos a usar tipos numericos reales y a hacer operaciones con ellos. Por ahora, guarda todos los datos como `string`.

---

# 44. Actividad 3 -- Perfil profesional

Crea un tercer proyecto de consola que le pida a un profesional sus datos laborales:

- Nombre completo.
- Profesion.
- Area de interes en la tecnologia.
- Herramienta tecnologica favorita (lenguaje, framework, etc.).
- Proyecto de tus suenos que te gustaria desarrollar.

Debe mostrar un perfil profesional formateado de la siguiente manera:

```text
====================================
          PERFIL PROFESIONAL         
====================================
Nombre: Carlos Perez
Profesion: Ingeniero de Sistemas
Area de interes: Inteligencia Artificial
Herramienta favorita: C# y .NET
Proyecto deseado: Asistente virtual para estudiantes
====================================
```

---

# 45. Errores comunes (Y como evitarlos)

Cometer errores al escribir codigo es lo mas normal del mundo cuando estas aprendiendo. Aqui tienes la lista de los tropiezos mas comunes para que sepas como reaccionar:

### Error 1: Olvidar el punto y coma `;`

- **Incorrecto:** `Console.WriteLine("Hola")`
- **Correcto:** `Console.WriteLine("Hola");`
- **Consecuencia:** El compilador se confunde al no saber donde termina una orden y donde empieza la otra.

### Error 2: Escribir textos sin comillas

- **Incorrecto:** `Console.WriteLine(Hola Mundo);`
- **Correcto:** `Console.WriteLine("Hola Mundo");`
- **Consecuencia:** C# no sabe si "Hola" es una orden interna o una variable y arrojara un error.

### Error 3: Confundir mayusculas y minusculas

- **Incorrecto:** `console.writeline("Hola");`
- **Correcto:** `Console.WriteLine("Hola");`
- **Consecuencia:** El compilador te dira que `console` no existe. C# es muy estricto con las mayusculas.

### Error 4: Ejecutar comandos fuera de la carpeta del proyecto

- Si intentas correr `dotnet run` y la terminal te dice: *"Could not find a project to run"*, significa que tu terminal esta parada en la carpeta equivocada.
- **Solucion:** Escribe `ls` (o `dir` en Windows) y asegurate de ver el archivo `.csproj` en esa carpeta. Si no lo ves, entra a la carpeta correcta usando `cd NombreDeTuCarpeta`.

### Error 5: No guardar los cambios del archivo

- Modificas tu codigo en VS Code, corres `dotnet run` y el programa sigue haciendo lo mismo que antes.
- **Solucion:** No has guardado el archivo. Asegurate de presionar `Ctrl + S` en el editor antes de volver a ejecutar la terminal. Puedes ver que un archivo tiene cambios sin guardar si aparece un circulo blanco al lado de su nombre en la pestana de VS Code.

### Error 6: Olvidar el simbolo de dinero `$` en la interpolacion

- **Incorrecto:** `Console.WriteLine("Hola {nombre}");`
- **Salida real:** `Hola {nombre}`
- **Correcto:** `Console.WriteLine($"Hola {nombre}");`
- **Explicacion:** Sin el `$`, las llaves son tratadas como texto normal y no se lee el contenido de la variable.

---

# 46. Como leer un error de compilacion (Aprende a hablar con el compilador)

Cuando tu codigo tiene un error y ejecutas `dotnet run`, la terminal se llenara de letras rojas. No te asustes. El compilador no te esta reganando, te esta diciendo exactamente que debes corregir.

Supongamos que olvidaste un punto y coma. El error se vera asi en tu terminal:

```text
/home/user/DiplomadoDotNet/HolaDotNet/Program.cs(5,30): error CS1002: ; expected
```

Aprender a leer esta linea es tu superpoder:

1. **`Program.cs`:** Te dice en que archivo de codigo esta el problema.
2. **`(5,30)`:** Te da la ubicacion exacta. Significa **Linea 5, columna 30**. Si vas a la linea 5 en tu editor, ahi estara el error.
3. **`error CS1002`:** Es el codigo de error oficial de C#. Si lo buscas en Google, veras miles de explicaciones y soluciones de otros desarrolladores.
4. **`; expected`:** Es el mensaje de ayuda. En espanol significa "se esperaba un punto y coma".

> **Consejo para la vida del programador:** No te frustres por los errores. Programar no consiste en escribir codigo perfecto a la primera, sino en saber leer las pistas que te da el compilador para ir arreglando los detalles paso a paso.

---

# 47. Mini reto de cierre -- Tarjeta de presentacion

Crea un proyecto de consola final llamado `TarjetaPresentacion` que sirva como una tarjeta de contacto profesional.

El programa debe solicitar en la consola:

1. Tu nombre completo.
2. Tu profesion u oficio.
3. Tu direccion de correo electronico.
4. Tu numero de telefono.
5. Tu ciudad de origen.
6. Una frase corta o lema personal que te inspire.

Debe mostrar en la pantalla una tarjeta formateada de la siguiente manera:

```text
==================================================
              TARJETA DE PRESENTACION
==================================================
 Nombre:     Eduardo Pimienta
 Profesion:  Ingeniero de Sistemas
 Correo:     eduardo@email.com
 Telefono:   3001234567
 Ciudad:     Barranquilla
 
 "Construyendo software con proposito para el mundo"
==================================================
```

**Condiciones obligatorias del reto:**

- Usar `Console.Write` para los campos donde el usuario escribe.
- Usar `Console.WriteLine` para pintar la tarjeta de presentacion.
- Guardar la informacion en variables de tipo `string`.
- Utilizar la **interpolacion de cadenas** con el simbolo `$` para armar la tarjeta.
- El proyecto debe compilar y ejecutarse correctamente con el comando `dotnet run`.
- Agregar al menos un **comentario util** en el codigo explicando una decision de diseno.

---

# 48. Evidencia de aprendizaje

Para validar tu aprendizaje en esta primera clase, deberas preparar una entrega con los siguientes puntos:

1. La carpeta comprimida del proyecto del mini reto `TarjetaPresentacion` (excluyendo las carpetas `bin/` y `obj/` para que no pese demasiado).
2. El codigo fuente de tu archivo `Program.cs`.
3. Una captura de pantalla de tu terminal mostrando el programa ejecutandose con exito.
4. Un archivo corto de texto explicando tu flujo del programa en las tres fases del software:
   - **Entrada:** Que datos le pediste al usuario.
   - **Proceso:** Como organizaste esos datos en tus variables.
   - **Salida:** Como decidiste mostrar el resultado final.

---

# 49. Preguntas de comprobacion (Autoevaluacion)

Intenta responder las siguientes preguntas con tus propias palabras para verificar que tanto comprendiste de la sesion:

1. Si un amigo te pregunta que es .NET, como se lo explicarias de forma sencilla?
2. Por que C# y .NET no son el mismo concepto?
3. Para que instalamos el SDK de .NET en lugar del Runtime en nuestra computadora?
4. Que papel cumple el motor CLR cuando ejecutamos una aplicacion?
5. Que hace internamente el comando `dotnet run` antes de abrir el programa?
6. Para que sirve el archivo de configuracion `.csproj` y en que formato esta escrito?
7. Cual es la diferencia de comportamiento entre `Console.Write("A")` y `Console.WriteLine("A")`?
8. Que significa declarar una variable y por que necesitamos asignarle un tipo de dato como `string`?
9. Como nos protege el C# moderno frente a valores nulos (`null`) cuando leemos del teclado?
10. Por que es mejor usar interpolacion de cadenas (`$"..."`) en lugar de concatenacion con signos `+`?
11. Que significa que C# sea sensible a mayusculas y minusculas?
12. Por que es un error intentar correr `dotnet run` desde tu carpeta personal de documentos si tu proyecto esta dentro de otra subcarpeta?

---

# 50. Tarea para la siguiente clase

Crea un archivo markdown en tu carpeta de estudios llamado `investigacion-clase-01.md` y responde a las siguientes preguntas de investigacion previa. Te servira para venir preparado a la siguiente clase:

1. Que es una variable y que tipos de datos (ademas de texto) crees que existen en el desarrollo de software?
2. Cual crees que es la diferencia practica entre guardar el numero `"25"` como un texto (con comillas) y guardarlo como un numero real (sin comillas)?
3. Si intentamos "sumar" dos variables de texto (por ejemplo `"10" + "20"`), cual crees que sera el resultado?
4. Si intentamos sumar dos numeros reales (`10 + 20`), cual sera el resultado?
5. Que significa "convertir o castear" un dato en programacion y por que es necesario en la vida real?
6. Que crees que pase si el usuario escribe letras en un campo donde esperabamos que escribiera su edad numerica?

---

# 51. Preparacion para la siguiente clase (El enlace conceptual)

En esta primera sesion hemos jugado sobre seguro: guardamos absolutamente todo como texto (`string`). La edad, el precio y las cantidades fueron tratados igual que el nombre de una persona.

Sin embargo, si quisiéramos construir una calculadora, calcular el IVA de un producto o saber si un usuario es mayor de edad haciendo una resta con su anio de nacimiento, el tipo `string` no nos sirve de nada porque **no puedes hacer operaciones matematicas con textos**.

En la proxima clase romperemos esa limitacion y estudiaremos:

- Tipos numericos enteros y decimales (`int`, `double`, `decimal`).
- Valores booleanos de verdadero y falso (`bool`).
- Como transformar textos en numeros de forma segura usando `int.Parse`, `Convert` y la herramienta profesional `int.TryParse` para evitar que nuestra aplicacion explote cuando el usuario cometa un error de escritura.

> **Pregunta de reflexion:** Si almacenas el anio actual como `"2026"` y tu anio de nacimiento como `"1996"`, como harias para que la computadora entienda que debe restarlos matematicamente en lugar de unirlos como un texto gigante?

---

# 52. Resumen de comandos utiles (Tu machete de consola)

Aqui tienes una tabla rapida con todos los comandos que aprendimos hoy para que los tengas a la mano:

| Accion | Comando |
| :--- | :--- |
| **Saber que version de .NET tengo** | `dotnet --version` |
| **Crear una carpeta nueva** | `mkdir NombreDeCarpeta` |
| **Entrar a una carpeta** | `cd NombreDeCarpeta` |
| **Ver la ruta actual de mi terminal** | `pwd` |
| **Crear un nuevo proyecto de Consola** | `dotnet new console -n NombreProyecto` |
| **Compilar el proyecto (buscar errores)** | `dotnet build` |
| **Compilar y abrir la aplicacion** | `dotnet run` |
| **Abrir el proyecto en VS Code** | `code .` |

---

# 53. Codigo final de referencia

Aqui tienes el codigo completo de la practica guiada con comentarios pedagogicos anadidos para que puedas consultarlo o usarlo de base si te trabas en alguno de los retos:

```csharp
// ===================================================================
// DIPLOMADO .NET - CLASE 01: APLICACION DE REGISTRO INTERACTIVO
// Este programa demuestra el uso de entradas, variables de tipo string,
// interpolacion de cadenas y flujo basico de datos.
// ===================================================================

// --- SECCION 1: BIENVENIDA Y ENCABEZADO ---
Console.WriteLine("======================================");
Console.WriteLine("       REGISTRO DE ESTUDIANTE .NET    ");
Console.WriteLine("======================================");

// --- SECCION 2: CAPTURA DE DATOS (ENTRADA) ---
// Usamos Console.Write para que el cursor permanezca en la misma linea
Console.Write("Nombre completo: ");
// Console.ReadLine lee la entrada. Si el usuario no escribe nada (null), 
// el operador ?? guarda un texto vacio "" para evitar advertencias de nulos.
string nombre = Console.ReadLine() ?? "";

Console.Write("Ciudad de residencia: ");
string ciudad = Console.ReadLine() ?? "";

Console.Write("Ocupacion actual: ");
string ocupacion = Console.ReadLine() ?? "";

Console.Write("Tienes experiencia en programacion? (Si/No/Basica): ");
string experiencia = Console.ReadLine() ?? "";

Console.Write("Que esperas aprender en este diplomado?: ");
string expectativa = Console.ReadLine() ?? "";

// Pintamos una linea vacia en la terminal para dar aire a la visualizacion
Console.WriteLine();

// --- SECCION 3: RESUMEN DE DATOS (PROCESO Y SALIDA) ---
Console.WriteLine("======================================");
Console.WriteLine("          DATOS REGISTRADOS           ");
Console.WriteLine("======================================");
// Hacemos uso de la interpolacion ($"") para insertar las variables de forma limpia
Console.WriteLine($"Nombre:      {nombre}");
Console.WriteLine($"Ciudad:      {ciudad}");
Console.WriteLine($"Ocupacion:   {ocupacion}");
Console.WriteLine($"Experiencia: {experiencia}");
Console.WriteLine($"Expectativa: {expectativa}");
Console.WriteLine("======================================");

Console.WriteLine();
// Saludamos al usuario usando su nombre de forma dinamica
Console.WriteLine($"Registro completado con exito, {nombre}! Bienvenido al curso.");
```

---

# 54. Cierre conceptual

Hoy hemos dado el paso mas importante: sentar bases solidas. Aprendimos que **.NET** no es un programa magico de Windows, sino una plataforma potente, multiplataforma y moderna que nos acompanara a lo largo de todo nuestro camino como desarrolladores.

Vimos que **C#** es nuestro canal de comunicacion con la maquina y que el **CLR** y el **Garbage Collector** trabajan incansablemente por detras para que no tengamos que gestionar la memoria fisica de forma manual.

Ademas, pusimos en practica el ciclo universal de todo software:

```
 Entrada (ReadLine) --> Proceso (Variables) --> Salida (WriteLine)
```

No importa si en el futuro estas programando una API web que procesa millones de transacciones por segundo, la logica de fondo sigue siendo exactamente esta. Nos vemos en la siguiente clase para aprender a trabajar con numeros, condiciones y logica matematica.

---

# 55. Frase final de la clase

> **"A programar no se aprende memorizando codigos de memoria, sino aprendiendo a entender un problema real, rompiendolo en partes pequenitas y explicandole a una maquina como resolverlo paso a paso."**
