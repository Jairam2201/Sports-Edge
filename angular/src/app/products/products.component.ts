import { CurrencyPipe, Location, NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainserviceService } from '../services/mainservice.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgFor, CurrencyPipe, NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  data: any;

  products: any = [];
  cart_items:any
  wishlist_items:any
 

  constructor(
    public productsService: ProductsService,
    private mainService: MainserviceService,
    private location: Location,
    private router: Router
  ) {
    
    this.productsService.getCart().subscribe({
      next: (data) => {
        this.cart_items = data;
      }})
      this.productsService.getWishlist().subscribe({
      next: (data) => {
        this.wishlist_items = data;
      }})
      this.loadProducts();
  }

 loadProducts() {
  this.productsService.get().subscribe((data) => {
    this.data = data || [];

    // Set default cart_status
    // this.data.forEach((product: any) => {
    //   product.cart_status = "Add to Cart";
      
    // });

    // Update cart_status to "Added to Cart" if product is in cart_items
    if (Array.isArray(this.cart_items)) {
      console.log("hello")
      console.log(this.cart_items)
      for (let i = 0; i < this.cart_items.length; i++) {
        for (let j = 0; j < this.data.length; j++) {
          if (this.cart_items[i].productId === this.data[j].id) {
            this.data[j].cart_status = "Added to Cart";
          }
        }
        console.log(this.data)
      }
    }

    if (Array.isArray(this.wishlist_items)) {
  for (let i = 0; i < this.wishlist_items.length; i++) {
    for (let j = 0; j < this.data.length; j++) {
      if (this.wishlist_items[i].productId === this.data[j].id) {
        this.data[j].wishlist_status = "Added to Wishlist";
      }
    }
  }
}


    // Filter by selected category
    this.products = this.data.filter(
      (product: any) => product.category === this.productsService.name
    );
  });
}


  icon_click() {
    this.location.back();
  }

  add(index: number): void {
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const product = this.products[index];

  // Check if product already exists in the cart
  for (let i = 0; i < this.cart_items.length; i++) {
    if (product.id === this.cart_items[i].productId) {
      // Remove from cart
      this.productsService.deleteFromCart(this.cart_items[i].productId).subscribe({
        next: () => {
          // Update UI
          product.cart_status = "Add to Cart";
          // Remove from cart_items
          this.cart_items.splice(i, 1);
        },
        error: (err) => {
          console.error('Error removing from cart:', err);
          alert('Failed to remove from cart');
        }
      });

      return; // Exit early
    }
  }

  // If not already in cart, proceed to add it
  const cartItem = {
    name: product.name,
    category: product.category,
    img: product.img,
    price: product.price,
    productId: product.id,
    UserId: userId
  };

  this.productsService.addToCart(cartItem).subscribe({
    next: () => {
      product.cart_status = "Added to Cart";
      // Add to cart_items array
      this.cart_items.push(cartItem);
    },
    error: (err) => {
      console.error('Error adding to cart:', err);
      alert('Failed to add to cart');
    }
  });
}




  buyNow(index: number) {
    const product = this.products[index];
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    const cartItem = {
      name: product.name,
      category: product.category,
      img: product.img,
      price: product.price,
      productId: product.id,
      userId: userId
    };

    if (product.cart_status === "Added to Cart") {
      // Remove from cart first, then proceed
      this.productsService.addToCart(cartItem).subscribe(() => {
        product.cart_status = "Add to Cart";
        this.proceedToPlaceOrder(product);
      });
    } else {
      this.proceedToPlaceOrder(product);
    }
  }

  private proceedToPlaceOrder(product: any) {
    this.mainService.placeorder(product);
    this.router.navigate(['/place_order']);
  }

toggleWishlist(index: number): void {
  const userId = parseInt(localStorage.getItem('userId') || '0', 10);
  const product = this.products[index];

  // Check if product already exists in wishlist
  for (let i = 0; i < this.wishlist_items.length; i++) {
    if (this.wishlist_items[i].productId === product.id) {
      // Item found in wishlist, remove it
      this.productsService.deleteFromWishlist(product.id).subscribe({
        next: () => {
          product.wishlist_status = "Add to Wishlist";
          this.wishlist_items.splice(i, 1); // Remove from local wishlist
        },
        error: (err) => {
          console.error('Error removing from wishlist:', err);
          alert('Failed to remove from wishlist');
        }
      });

      return; // Exit early
    }
  }

  // If not found, add to wishlist
  const wishlistItem = {
    name: product.name,
    category: product.category,
    img: product.img,
    price: product.price,
    productId: product.id
  };

  this.productsService.toggleWishlist(wishlistItem).subscribe({
    next: () => {
      product.wishlist_status = "Added to Wishlist";
      this.wishlist_items.push(wishlistItem);
    },
    error: (err) => {
      console.error('Error adding to wishlist:', err);
      alert('Failed to add to wishlist');
    }
  });
}

}