using Microsoft.EntityFrameworkCore;

Console.WriteLine("=== MODELADO DE BIBLIOTECA ===");
Console.WriteLine("Creando base de datos y sembrando datos...\n");

var options = new DbContextOptionsBuilder<BibliotecaContext>()
    .UseSqlite("Data Source= biblioteca.db")
    .Options;

using var db = new BibliotecaContext(options);
db.Database.EnsureDeleted();
db.Database.EnsureCreated();

var autor = new Autor { Nombre = "Gabriel García Márquez", Nacionalidad = "Colombiana" };
db.Autores.Add(autor);

db.Libros.AddRange(
    new Libro { Titulo = "Cien Años de Soledad", Isbn = "978-84-376-0494-7", Anio = 1967, Autor = autor },
    new Libro { Titulo = "El Amor en los Tiempos del Cólera", Isbn = "978-84-376-0495-4", Anio = 1985, Autor = autor }
);

db.SaveChanges();

Console.WriteLine("Autores:");
foreach (var a in db.Autores.Include(a => a.Libros).ToList())
{
    Console.WriteLine($"  {a.Nombre} ({a.Nacionalidad})");
    foreach (var l in a.Libros)
        Console.WriteLine($"    - {l.Titulo} ({l.Anio})");
}

Console.WriteLine("\nBase de datos creada con éxito.");

public class Autor
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Nacionalidad { get; set; } = string.Empty;
    public List<Libro> Libros { get; set; } = new();
}

public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public int Anio { get; set; }
    public int AutorId { get; set; }
    public Autor Autor { get; set; } = null!;
}

public class Prestamo
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public Libro Libro { get; set; } = null!;
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}

public class BibliotecaContext : DbContext
{
    public BibliotecaContext(DbContextOptions<BibliotecaContext> options) : base(options) { }

    public DbSet<Autor> Autores => Set<Autor>();
    public DbSet<Libro> Libros => Set<Libro>();
    public DbSet<Prestamo> Prestamos => Set<Prestamo>();
}
