using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartItemsController : ControllerBase
    {
        private readonly SportsDbContext _context;

        public CartItemsController(SportsDbContext context)
        {
            _context = context;
        }

        // ? Get all cart items for a user
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<CartItems>>> GetCartItemsByUserId(int userId)
        {
            return await _context.CartItems
                                 .Where(c => c.UserId == userId)
                                 .ToListAsync();
        }

        // ? Post a cart item with UserId
        [HttpPost("user/{userId}")]
        public async Task<ActionResult<CartItems>> PostCartItem(int userId, [FromBody] CartItems item)
        {
            item.UserId = userId; // Force UserId from URL
            _context.CartItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCartItemsByUserId), new { userId = userId }, item);
        }

        // ? Delete a cart item for a specific user by productId
        [HttpDelete("user/{userId}/product/{productId}")]
        public async Task<IActionResult> DeleteCartItem(int userId, int productId)
        {
            var item = await _context.CartItems
                                     .FirstOrDefaultAsync(x => x.UserId == userId && x.productId == productId);

            if (item == null)
                return NotFound();

            _context.CartItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
