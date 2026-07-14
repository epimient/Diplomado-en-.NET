var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/api/health", () => Results.Ok(new { status = "ok", timestamp = DateTime.UtcNow }));

app.MapGet("/api/saludo/{nombre}", (string nombre) =>
{
    return Results.Ok(new { mensaje = $"¡Hola, {nombre}!", hora = DateTime.Now.ToShortTimeString() });
});

app.Run();
