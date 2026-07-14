Console.WriteLine("=== MENÚ INTERACTIVO ===");

string opcion = "";

while (opcion != "4")
{
    Console.WriteLine("\n1. Saludar");
    Console.WriteLine("2. Contar del 1 al 10");
    Console.WriteLine("3. Tabla de multiplicar");
    Console.WriteLine("4. Salir");
    Console.Write("Elige una opción: ");
    opcion = Console.ReadLine();

    switch (opcion)
    {
        case "1":
            Console.Write("¿Cómo te llamas? ");
            string nombre = Console.ReadLine();
            Console.WriteLine($"¡Hola, {nombre}!");
            break;

        case "2":
            for (int i = 1; i <= 10; i++)
            {
                Console.Write($"{i} ");
            }
            Console.WriteLine();
            break;

        case "3":
            Console.Write("¿Qué tabla quieres ver? ");
            int num = Convert.ToInt32(Console.ReadLine());
            for (int i = 1; i <= 10; i++)
            {
                Console.WriteLine($"{num} × {i} = {num * i}");
            }
            break;

        case "4":
            Console.WriteLine("¡Hasta luego!");
            break;

        default:
            Console.WriteLine("Opción no válida.");
            break;
    }
}
