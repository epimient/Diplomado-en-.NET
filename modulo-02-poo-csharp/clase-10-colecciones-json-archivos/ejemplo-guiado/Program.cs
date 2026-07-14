using System.Text.Json;

var agenda = new AgendaContactos();
agenda.Cargar();

while (true)
{
    Console.WriteLine("\n=== AGENDA DE CONTACTOS ===");
    Console.WriteLine("1. Agregar contacto");
    Console.WriteLine("2. Listar contactos");
    Console.WriteLine("3. Buscar contacto");
    Console.WriteLine("4. Salir");
    Console.Write("Opción: ");
    var opcion = Console.ReadLine();

    switch (opcion)
    {
        case "1":
            Console.Write("Nombre: ");
            var nombre = Console.ReadLine()!;
            Console.Write("Teléfono: ");
            var telefono = Console.ReadLine()!;
            Console.Write("Email: ");
            var email = Console.ReadLine()!;
            agenda.Agregar(new Contacto(nombre, telefono, email));
            break;
        case "2":
            agenda.Listar();
            break;
        case "3":
            Console.Write("Buscar por nombre: ");
            var q = Console.ReadLine()!;
            agenda.Buscar(q);
            break;
        case "4":
            agenda.Guardar();
            Console.WriteLine("Contactos guardados. ¡Adiós!");
            return;
    }
}

class Contacto
{
    public string Nombre { get; set; }
    public string Telefono { get; set; }
    public string Email { get; set; }

    public Contacto() { }

    public Contacto(string nombre, string telefono, string email)
    {
        Nombre = nombre;
        Telefono = telefono;
        Email = email;
    }

    public override string ToString() =>
        $"{Nombre,-20} {Telefono,-12} {Email}";
}

class AgendaContactos
{
    private const string Archivo = "contactos.json";
    private List<Contacto> _contactos = new();

    public void Agregar(Contacto c)
    {
        _contactos.Add(c);
        Console.WriteLine("Contacto agregado.");
    }

    public void Listar()
    {
        if (_contactos.Count == 0)
        {
            Console.WriteLine("No hay contactos.");
            return;
        }
        Console.WriteLine($"{"Nombre",-20} {"Teléfono",-12} Email");
        Console.WriteLine(new string('-', 50));
        foreach (var c in _contactos)
            Console.WriteLine(c);
    }

    public void Buscar(string nombre)
    {
        var resultados = _contactos
            .Where(c => c.Nombre.Contains(nombre, StringComparison.OrdinalIgnoreCase))
            .ToList();

        if (resultados.Count == 0)
        {
            Console.WriteLine("No se encontraron contactos.");
            return;
        }

        Console.WriteLine($"Se encontraron {resultados.Count} contacto(s):");
        foreach (var c in resultados)
            Console.WriteLine(c);
    }

    public void Guardar()
    {
        var json = JsonSerializer.Serialize(_contactos, new JsonSerializerOptions { WriteIndented = true });
        File.WriteAllText(Archivo, json);
    }

    public void Cargar()
    {
        if (File.Exists(Archivo))
        {
            var json = File.ReadAllText(Archivo);
            _contactos = JsonSerializer.Deserialize<List<Contacto>>(json) ?? new List<Contacto>();
        }
    }
}
