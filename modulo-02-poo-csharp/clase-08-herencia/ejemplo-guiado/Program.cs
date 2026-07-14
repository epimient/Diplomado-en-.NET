class Empleado
{
    public string Nombre { get; }
    public double SalarioBase { get; }

    public Empleado(string nombre, double salarioBase)
    {
        Nombre = nombre;
        SalarioBase = salarioBase;
    }

    public virtual double CalcularSalario()
    {
        return SalarioBase;
    }

    public void MostrarInfo()
    {
        Console.WriteLine($"Empleado: {Nombre}");
        Console.WriteLine($"Salario: ${CalcularSalario():F2}");
    }
}

class Gerente : Empleado
{
    public double Bono { get; }

    public Gerente(string nombre, double salarioBase, double bono)
        : base(nombre, salarioBase)
    {
        Bono = bono;
    }

    public override double CalcularSalario()
    {
        return SalarioBase + Bono;
    }
}

class Vendedor : Empleado
{
    public double Comision { get; }

    public Vendedor(string nombre, double salarioBase, double comision)
        : base(nombre, salarioBase)
    {
        Comision = comision;
    }

    public override double CalcularSalario()
    {
        return SalarioBase + Comision;
    }
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== SISTEMA DE NÓMINA ===\n");

        Empleado[] empleados = {
            new Empleado("Ana", 2000),
            new Gerente("Carlos", 3000, 1500),
            new Vendedor("María", 1500, 800)
        };

        foreach (Empleado emp in empleados)
        {
            emp.MostrarInfo();
            Console.WriteLine();
        }
    }
}
