static void Main()
{
    Console.WriteLine("=== SISTEMA DE NOTAS ===");

    string nombre = PedirTexto("Nombre del estudiante");
    int cantidad = PedirEntero("Cantidad de notas");

    double[] notas = new double[cantidad];

    for (int i = 0; i < cantidad; i++)
    {
        notas[i] = PedirDecimal($"Nota {i + 1}");
    }

    double promedio = CalcularPromedio(notas);
    string estado = ObtenerEstado(promedio);

    MostrarResultado(nombre, promedio, estado);
}

static string PedirTexto(string mensaje)
{
    Console.Write($"{mensaje}: ");
    return Console.ReadLine();
}

static int PedirEntero(string mensaje)
{
    Console.Write($"{mensaje}: ");
    return Convert.ToInt32(Console.ReadLine());
}

static double PedirDecimal(string mensaje)
{
    Console.Write($"{mensaje}: ");
    return Convert.ToDouble(Console.ReadLine());
}

static double CalcularPromedio(double[] notas)
{
    double suma = 0;
    foreach (double nota in notas)
    {
        suma += nota;
    }
    return suma / notas.Length;
}

static string ObtenerEstado(double promedio)
{
    if (promedio >= 6)
        return "Aprobado";
    else if (promedio >= 4)
        return "Recuperación";
    else
        return "Reprobado";
}

static void MostrarResultado(string nombre, double promedio, string estado)
{
    Console.WriteLine("\n=== RESULTADO ===");
    Console.WriteLine($"Estudiante: {nombre}");
    Console.WriteLine($"Promedio: {promedio:F2}");
    Console.WriteLine($"Estado: {estado}");
}
