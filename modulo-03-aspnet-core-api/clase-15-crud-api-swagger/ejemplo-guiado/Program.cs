using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TaskDbContext>(options =>
    options.UseSqlite("Data Source=tareas.db"));
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "API de Tareas",
        Version = "v1",
        Description = "API CRUD para gestión de tareas"
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
    db.Database.EnsureCreated();
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API de Tareas v1");
    c.RoutePrefix = "swagger";
});

app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class TareasController : ControllerBase
{
    private readonly TaskDbContext _db;
    public TareasController(TaskDbContext db) => _db = db;

    [HttpGet]
    public async Task<ActionResult<List<Tarea>>> GetAll()
        => await _db.Tareas.ToListAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<Tarea>> GetById(int id)
    {
        var t = await _db.Tareas.FindAsync(id);
        if (t is null) return NotFound();
        return Ok(t);
    }

    [HttpPost]
    public async Task<ActionResult<Tarea>> Create(Tarea t)
    {
        _db.Tareas.Add(t);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = t.Id }, t);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Tarea actualizada)
    {
        var t = await _db.Tareas.FindAsync(id);
        if (t is null) return NotFound();
        t.Titulo = actualizada.Titulo;
        t.Completada = actualizada.Completada;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var t = await _db.Tareas.FindAsync(id);
        if (t is null) return NotFound();
        _db.Tareas.Remove(t);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}

public class Tarea
{
    public int Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public bool Completada { get; set; }
}

public class TaskDbContext : DbContext
{
    public TaskDbContext(DbContextOptions<TaskDbContext> options) : base(options) { }
    public DbSet<Tarea> Tareas => Set<Tarea>();
}
