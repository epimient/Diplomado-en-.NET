class Libro
{
    public string titulo;
    public string autor;
    public int anio;
    public static int totalLibros = 0;

    public Libro()
    {
        titulo = "Sin título";
        autor = "Sin autor";
        anio = 0;
        totalLibros++;
    }

    public Libro(string titulo, string autor) : this(titulo, autor, 0) { }

    public Libro(string titulo, string autor, int anio)
    {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        totalLibros++;
    }

    public void MostrarInfo()
    {
        Console.WriteLine($"\"{titulo}\" — {autor} ({anio})");
    }

    public void MostrarInfo(bool detallado)
    {
        if (detallado)
            Console.WriteLine($"\"{titulo}\" — {autor} ({anio}) | Total: {totalLibros}");
        else
            MostrarInfo();
    }

    public static void MostrarTotal()
    {
        Console.WriteLine($"\nTotal de libros registrados: {totalLibros}");
    }
}

class Biblioteca
{
    static void Main()
    {
        Console.WriteLine("=== BIBLIOTECA ===\n");

        // Constructor con 3 parámetros
        Libro libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967);
        Libro libro2 = new Libro("1984", "George Orwell", 1949);
        Libro libro3 = new Libro("El Principito", "Antoine de Saint-Exupéry", 1943);

        // Constructor con 2 parámetros (delega en el de 3 con this)
        Libro libro4 = new Libro("Rayuela", "Julio Cortázar");

        // Constructor sin parámetros
        Libro libro5 = new Libro();

        // Método sin parámetros
        libro1.MostrarInfo();
        libro2.MostrarInfo();

        // Sobrecarga: método con parámetro bool
        libro3.MostrarInfo(true);
        libro4.MostrarInfo(true);

        // Método estático (pertenece a la clase, no al objeto)
        Libro.MostrarTotal();

        Console.WriteLine("\n--- Datos del libro sin parámetros ---");
        libro5.MostrarInfo(true);
    }
}
