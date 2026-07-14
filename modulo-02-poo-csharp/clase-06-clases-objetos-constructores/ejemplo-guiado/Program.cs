class Libro
{
    public string titulo;
    public string autor;
    public int anio;

    public Libro(string titulo, string autor, int anio)
    {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
    }

    public void MostrarInfo()
    {
        Console.WriteLine($"\"{titulo}\" — {autor} ({anio})");
    }
}

class Biblioteca
{
    static void Main()
    {
        Console.WriteLine("=== BIBLIOTECA ===\n");

        Libro libro1 = new Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967);
        Libro libro2 = new Libro("1984", "George Orwell", 1949);
        Libro libro3 = new Libro("El Principito", "Antoine de Saint-Exupéry", 1943);

        libro1.MostrarInfo();
        libro2.MostrarInfo();
        libro3.MostrarInfo();

        Console.WriteLine("\nTotal de libros: 3");
    }
}
