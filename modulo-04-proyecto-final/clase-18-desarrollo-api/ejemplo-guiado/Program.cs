using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<BibliotecaContext>(options =>
    options.UseSqlite("Data Source= biblioteca .db"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<BibliotecaContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();
app.Run();

// --- Controladores ---

[ApiController]
[Route("api/[controller]")]
public class AutoresController : ControllerBase
{
    private readonly BibliotecaContext _db;
    public AutoresController(BibliotecaContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<Autor>>> GetAll()
        => await _db.Autores.Include(a => a.Libros).ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Autor>> Create(Autor autor)
    {
        _db.Autores.Add(autor);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = autor.Id }, autor);
    }
}

[ApiController]
[Route("api/[controller]")]
public class LibrosController : ControllerBase
{
    private readonly BibliotecaContext _db;
    public LibrosController(BibliotecaContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<Libro>>> GetAll()
        => await _db.Libros.Include(l => l.Autor).ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Libro>> GetById(int id)
    {
        var libro = await _db.Libros.Include(l => l.Autor).FirstOrDefaultAsync(l => l.Id == id);
        if (libro is null) return NotFound();
        return Ok(libro);
    }

    [HttpPost]
    public async Task<ActionResult<Libro>> Create(Libro libro)
    {
        _db.Libros.Add(libro);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = libro.Id }, libro);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Libro actualizado)
    {
        var libro = await _db.Libros.FindAsync(id);
        if (libro is null) return NotFound();
        libro.Titulo = actualizado.Titulo;
        libro.Isbn = actualizado.Isbn;
        libro.Anio = actualizado.Anio;
        libro.AutorId = actualizado.AutorId;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var libro = await _db.Libros.FindAsync(id);
        if (libro is null) return NotFound();
        _db.Libros.Remove(libro);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

[ApiController]
[Route("api/[controller]")]
public class PrestamosController : ControllerBase
{
    private readonly BibliotecaContext _db;
    public PrestamosController(BibliotecaContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<Prestamo>>> GetAll()
        => await _db.Prestamos.Include(p => p.Libro).ToListAsync();

    [HttpPost]
    public async Task<ActionResult<Prestamo>> Create(Prestamo prestamo)
    {
        prestamo.FechaPrestamo = DateTime.UtcNow;
        prestamo.Devuelto = false;
        _db.Prestamos.Add(prestamo);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetAll), new { id = prestamo.Id }, prestamo);
    }

    [HttpPut("{id}/devolver")]
    public async Task<IActionResult> Devolver(int id)
    {
        var prestamo = await _db.Prestamos.FindAsync(id);
        if (prestamo is null) return NotFound();
        prestamo.Devuelto = true;
        prestamo.FechaDevolucion = DateTime.UtcNow;
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

// --- Modelos ---

public class Autor
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Nacionalidad { get; set; } = string.Empty;
    public List<Libro> Libros { get; set; } = new();
}

public class Libro
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public string Isbn { get; set; } = string.Empty;
    public int Anio { get; set; }
    public int AutorId { get; set; }
    public Autor Autor { get; set; } = null!;
}

public class Prestamo
{
    public int Id { get; set; }
    public int LibroId { get; set; }
    public Libro Libro { get; set; } = null!;
    public DateTime FechaPrestamo { get; set; }
    public DateTime? FechaDevolucion { get; set; }
    public bool Devuelto { get; set; }
}

public class BibliotecaContext : DbContext
{
    public BibliotecaContext(DbContextOptions<BibliotecaContext> options) : base(options) { }
    public DbSet<Autor> Autores => Set<Autor>();
    public DbSet<Libro> Libros => Set<Libro>();
    public DbSet<Prestamo> Prestamos => Set<Prestamo>();
}
