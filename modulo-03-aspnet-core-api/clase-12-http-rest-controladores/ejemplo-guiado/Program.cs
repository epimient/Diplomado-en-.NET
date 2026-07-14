var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<List<Producto>>();

var app = builder.Build();
app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly List<Producto> _productos;

    public ProductsController(List<Producto> productos)
    {
        _productos = productos;
        if (!_productos.Any())
        {
            _productos.Add(new Producto { Id = 1, Nombre = "Laptop", Precio = 1500 });
            _productos.Add(new Producto { Id = 2, Nombre = "Mouse", Precio = 25 });
        }
    }

    [HttpGet]
    public ActionResult<List<Producto>> GetAll() => Ok(_productos);

    [HttpGet("{id}")]
    public ActionResult<Producto> GetById(int id)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto is null) return NotFound();
        return Ok(producto);
    }

    [HttpPost]
    public ActionResult<Producto> Create(Producto producto)
    {
        producto.Id = _productos.Any() ? _productos.Max(p => p.Id) + 1 : 1;
        _productos.Add(producto);
        return CreatedAtAction(nameof(GetById), new { id = producto.Id }, producto);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Producto actualizado)
    {
        var index = _productos.FindIndex(p => p.Id == id);
        if (index == -1) return NotFound();
        actualizado.Id = id;
        _productos[index] = actualizado;
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        var producto = _productos.FirstOrDefault(p => p.Id == id);
        if (producto is null) return NotFound();
        _productos.Remove(producto);
        return NoContent();
    }
}

public class Producto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
}
