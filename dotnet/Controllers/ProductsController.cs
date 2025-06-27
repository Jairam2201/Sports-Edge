// Controllers/ProductsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models; // Import your Models namespace

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")] // Route for accessing the controller
    [ApiController]  // This attribute makes this class a Web API controller
    public class ProductsController : ControllerBase
    {
        private readonly SportsDbContext _context; // Inject DbContext

        public ProductsController(SportsDbContext context)
        {
            _context = context; // Initialize the context
        }

        // GET: api/products
        [HttpGet] // Handle GET requests to this endpoint
        public async Task<ActionResult<IEnumerable<Products>>> GetProducts()
        {
            // Fetch all products from the database
            return await _context.Products.ToListAsync();
        }
        [HttpPut("{category}/{name}/addtocart")]
        public async Task<IActionResult> AddToCart(string category, string name)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.category == category && p.name == name);

            if (product == null)
            {
                return NotFound();
            }

            if (product.cart_status == "Added to Cart")
            {
                product.cart_status = "Add to Cart";
            }
            else
            {
                product.cart_status = "Added to Cart";
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return Ok(product);
        }

        [HttpPut("{category}/{name}/wishlist")]
        public async Task<IActionResult> ToggleWishlist(string category, string name)
        {
            var product = await _context.Products.FirstOrDefaultAsync(p => p.category == category && p.name == name);

            if (product == null)
            {
                return NotFound();
            }

            if (product.wishlist_status == "Added to Wishlist")
            {
                product.wishlist_status = "Add to Wishlist";
            }
            else
            {
                product.wishlist_status = "Added to Wishlist";
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error: " + ex.Message);
            }

            return Ok(product);
        }



    }
}
