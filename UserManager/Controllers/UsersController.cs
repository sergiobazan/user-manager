using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManager.Data;
using UserManager.Dtos;
using UserManager.Models;

namespace UserManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IMapper _mapper;

        public UsersController(AppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<List<UserResponse>> Get()
        {
            var result = await _context.Users.ToListAsync();
            var users = _mapper.Map<List<User>, List<UserResponse>>(result);
            return users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserResponse>> GetById(int id)
        {
            var result = await _context.Users.FindAsync(id);
            if (result == null) return NotFound();
            var user = _mapper.Map<User, UserResponse>(result);
            return Ok(user);
        }

        [HttpPost]
        public async Task<User> Post([FromBody]UserInput userInput)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(userInput.Password);
            userInput.Password = passwordHash;
            var result = _mapper.Map<UserInput, User>(userInput); 
            _context.Users.Add(result);
            await _context.SaveChangesAsync();
            return result;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, UserUpdateInput userInput)
        {

            var result = await _context.Users.FindAsync(id);
            if (result == null) return NotFound();
            result.FechaActualizacion = DateTime.UtcNow;
            result.Nombres = userInput.Nombres;
            result.Apellidos = userInput.Apellidos;
            result.Login = userInput.Login;
            result.Estado = userInput.Estado;
            _context.Users.Update(result);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
