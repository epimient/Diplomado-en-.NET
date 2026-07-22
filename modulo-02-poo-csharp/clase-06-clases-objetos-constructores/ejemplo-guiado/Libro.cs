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
