// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models; // Import your Models namespace

namespace WebApplication1.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OrdersController : ControllerBase
	{
		private readonly SportsDbContext _context;

		public OrdersController(SportsDbContext context)
		{
			_context = context;
		}

		// POST api/orders
		[HttpPost]
		public async Task<IActionResult> CreateOrder([FromBody] Order order)
		{
			if (order.UserId <= 0)
				return BadRequest("Valid UserId is required");

			order.OrderDate = DateTime.UtcNow;
			_context.Orders.Add(order);
			await _context.SaveChangesAsync();

			return Ok(new { message = "Order placed successfully", orderId = order.Id });
		}


		[HttpGet("user/{userId}")]
		public async Task<IActionResult> GetOrdersByUser(string userId)
		{
			if (!int.TryParse(userId, out int parsedUserId))
				return BadRequest("Invalid user ID");

			var orders = await _context.Orders
				.Where(o => o.UserId == parsedUserId)
				.OrderByDescending(o => o.OrderDate)
				.ToListAsync();

			return Ok(orders);
		}

	}
}
