using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=productos.db"));
builder.Services.AddControllers();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _db;

    public ProductsController(AppDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetAll()
        => await _db.Productos.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var p = await _db.Productos.FindAsync(id);
        if (p is null) return NotFound();
        return Ok(p);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product p)
    {
        _db.Productos.Add(p);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = p.Id }, p);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Product actualizado)
    {
        var p = await _db.Productos.FindAsync(id);
        if (p is null) return NotFound();
        p.Nombre = actualizado.Nombre;
        p.Precio = actualizado.Precio;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var p = await _db.Productos.FindAsync(id);
        if (p is null) return NotFound();
        _db.Productos.Remove(p);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public class Product
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public decimal Precio { get; set; }
}

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Product> Productos => Set<Product>();
}
