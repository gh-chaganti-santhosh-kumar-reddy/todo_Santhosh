using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace TodoApp.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TodosController : ControllerBase
    {
        private readonly TodoContext _context;
        private readonly UserManager<IdentityUser> _userManager;

        public TodosController(TodoContext context, UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        private string GetUserId() => User.FindFirstValue(ClaimTypes.NameIdentifier);

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodos() =>
            await _context.TodoItems.Where(t => t.UserId == GetUserId()).ToListAsync();

        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodo(int id)
        {
            var todo = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());
            return todo == null ? NotFound() : todo;
        }

        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodo(TodoItem todo)
        {
            todo.UserId = GetUserId();
            _context.TodoItems.Add(todo);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, TodoItem todo)
        {
            if (id != todo.Id) return BadRequest();
            var existing = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());
            if (existing == null) return NotFound();
            // Update fields
            existing.Title = todo.Title;
            existing.Description = todo.Description;
            existing.DueDate = todo.DueDate;
            existing.IsCompleted = todo.IsCompleted;
            existing.Priority = todo.Priority;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            var todo = await _context.TodoItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == GetUserId());
            if (todo == null) return NotFound();
            _context.TodoItems.Remove(todo);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}