interface IPago
{
    void ProcesarPago(double monto);
    string ObtenerMetodo();
}

class TarjetaCredito : IPago
{
    public string Numero { get; }

    public TarjetaCredito(string numero)
    {
        Numero = numero;
    }

    public void ProcesarPago(double monto)
    {
        Console.WriteLine($"Pagando ${monto:F2} con Tarjeta ****{Numero[^4..]}");
    }

    public string ObtenerMetodo() => "Tarjeta de Crédito";
}

class PayPal : IPago
{
    public string Email { get; }

    public PayPal(string email)
    {
        Email = email;
    }

    public void ProcesarPago(double monto)
    {
        Console.WriteLine($"Pagando ${monto:F2} con PayPal ({Email})");
    }

    public string ObtenerMetodo() => "PayPal";
}

class Transferencia : IPago
{
    public string Banco { get; }

    public Transferencia(string banco)
    {
        Banco = banco;
    }

    public void ProcesarPago(double monto)
    {
        Console.WriteLine($"Pagando ${monto:F2} por Transferencia ({Banco})");
    }

    public string ObtenerMetodo() => "Transferencia Bancaria";
}

class Program
{
    static void Main()
    {
        Console.WriteLine("=== SISTEMA DE PAGOS ===\n");

        IPago[] pagos = {
            new TarjetaCredito("1234567890123456"),
            new PayPal("ana@email.com"),
            new Transferencia("Banco Nacional")
        };

        foreach (IPago pago in pagos)
        {
            Console.Write($"[{pago.ObtenerMetodo()}] ");
            pago.ProcesarPago(150.00);
        }
    }
}
