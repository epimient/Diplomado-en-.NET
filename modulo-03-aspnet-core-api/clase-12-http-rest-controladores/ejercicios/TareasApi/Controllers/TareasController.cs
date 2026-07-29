using Microsoft.AspNetCore.Mvc;
using TareasApi.Models;

namespace TareasApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class TareasController : ControllerBase
{
    private static List<Tarea> _tareas = new()
    {
        new Tarea { Id = 1, Titulo = "Comprar víveres", Completada = false },
        new Tarea { Id = 2, Titulo = "Estudiar C#", Completada = true },
        new Tarea { Id = 3, Titulo = "Hacer ejercicio", Completada = false }
    };

    [HttpGet]
    public ActionResult<List<Tarea>> GetAll()
    {
        return Ok(_tareas);
    }
}