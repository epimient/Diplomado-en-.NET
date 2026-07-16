Console.WriteLine("=== CALCULADORA CON SWITCH ===");

Console.Write("Ingresa el primer número: ");
double num1 = Convert.ToDouble(Console.ReadLine());

Console.Write("Ingresa el segundo número: ");
double num2 = Convert.ToDouble(Console.ReadLine());

Console.WriteLine("\nOperaciones disponibles:");
Console.WriteLine("1. Sumar");
Console.WriteLine("2. Restar");
Console.WriteLine("3. Multiplicar");
Console.WriteLine("4. Dividir");
Console.Write("Elige una opción (1-4): ");
int opcion = Convert.ToInt32(Console.ReadLine());

double resultado;
string operacion; 

switch (opcion)
{
    case 1:
        resultado = num1 + num2;
        operacion = "suma";
        break;
    case 2:
        resultado = num1 - num2;
        operacion = "resta";
        break;
    case 3:
        resultado = num1 * num2;
        operacion = "multiplicación";
        break;
    case 4:
        if (num2 != 0)
        {
            resultado = num1 / num2;
            operacion = "división";
        }
        else
        {
            Console.WriteLine("Error: No se puede dividir entre cero.");
            return;
        }
        break;
    default:
        Console.WriteLine("Opción no válida.");
        return;
}

Console.WriteLine($"\nResultado de la {operacion}: {resultado:F2}");
