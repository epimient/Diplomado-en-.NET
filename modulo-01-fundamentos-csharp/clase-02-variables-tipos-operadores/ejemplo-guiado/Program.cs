Console.WriteLine("=== CALCULADORA DE PROMEDIO ===");

Console.Write("Ingresa el nombre del estudiante: ");
string nombre = Console.ReadLine();

Console.Write("Ingresa la nota 1: ");
double nota1 = Convert.ToDouble(Console.ReadLine());

Console.Write("Ingresa la nota 2: ");
double nota2 = Convert.ToDouble(Console.ReadLine());

Console.Write("Ingresa la nota 3: ");
double nota3 = Convert.ToDouble(Console.ReadLine());

double promedio = (nota1 + nota2 + nota3) / 3;
string estado = promedio >= 6 ? "Aprobado" : "Reprobado";

Console.WriteLine($"\nEstudiante: {nombre}");
Console.WriteLine($"Promedio: {promedio:F2}");
Console.WriteLine($"Estado: {estado}");
