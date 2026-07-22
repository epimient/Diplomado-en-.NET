class Program
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
