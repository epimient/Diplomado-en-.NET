class Empleado
{
    // Campos privados
    private string nombre;
    private double salario;
    private int edad;

    // Propiedades con validación
    public string Nombre
    {
        get { return nombre; }
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("El nombre no puede estar vacío");
            nombre = value;
        }
    }

    public double Salario
    {
        get { return salario; }
        set
        {
            if (value < 0)
                throw new ArgumentException("El salario no puede ser negativo");
            salario = value;
        }
    }

    public int Edad
    {
        get { return edad; }
        set
        {
            if (value < 18 || value > 65)
                throw new ArgumentException("La edad debe estar entre 18 y 65 años");
            edad = value;
        }
    }

    // Propiedad computada
    public double SalarioAnual => Salario * 12;

    // Propiedad de solo lectura desde constructor
    public DateTime FechaIngreso { get; }

    public Empleado(string nombre, double salario, int edad)
    {
        Nombre = nombre;
        Salario = salario;
        Edad = edad;
        FechaIngreso = DateTime.Now;
    }

    public void MostrarInfo()
    {
        Console.WriteLine($"Empleado: {Nombre}");
        Console.WriteLine($"Edad: {Edad} años");
        Console.WriteLine($"Salario mensual: ${Salario:F2}");
        Console.WriteLine($"Salario anual: ${SalarioAnual:F2}");
        Console.WriteLine($"Ingreso: {FechaIngreso:dd/MM/yyyy}");
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== SISTEMA DE EMPLEADOS ===\n");

        try
        {
            Empleado emp = new Empleado("Ana López", 2500.00, 30);
            emp.MostrarInfo();

            Console.WriteLine("\n--- Intento inválido ---");
            Empleado emp2 = new Empleado("Carlos", -500, 15); // Error
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }
}
