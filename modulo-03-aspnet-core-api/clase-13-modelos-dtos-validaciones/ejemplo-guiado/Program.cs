using System.ComponentModel.DataAnnotations;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
app.MapControllers();
app.Run();

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static readonly List<UserDto> _users = new()
    {
        new UserDto { Id = 1, Nombre = "Ana Pérez", Email = "ana@email.com", Edad = 25 }
    };
    private static int _nextId = 2;

    [HttpGet]
    public ActionResult<List<UserDto>> GetAll() => Ok(_users);

    [HttpPost]
    public ActionResult<UserDto> Create([FromBody] CreateUserDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var user = new UserDto
        {
            Id = _nextId++,
            Nombre = dto.Nombre,
            Email = dto.Email,
            Edad = dto.Edad
        };
        _users.Add(user);
        return CreatedAtAction(nameof(GetAll), new { id = user.Id }, user);
    }
}

public class UserDto
{
    public int Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Edad { get; set; }
}

public class CreateUserDto
{
    [Required(ErrorMessage = "El nombre es obligatorio")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "El nombre debe tener entre 3 y 100 caracteres")]
    public string Nombre { get; set; } = string.Empty;

    [Required(ErrorMessage = "El email es obligatorio")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; } = string.Empty;

    [Range(18, 120, ErrorMessage = "La edad debe estar entre 18 y 120")]
    public int Edad { get; set; }
}
