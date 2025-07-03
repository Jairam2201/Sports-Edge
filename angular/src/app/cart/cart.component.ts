import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, Location, NgFor, NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, NgIf, CurrencyPipe, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cart_items: any[] = [];

  constructor(
    private service: MainserviceService,
    private location: Location,
    private products: ProductsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    const userId = parseInt(localStorage.getItem('userId') || '0', 10);
    if (!userId || userId <= 0) {
      alert('User not authenticated.');
      return;
    }

    this.products.getCart().subscribe({
      next: (data) => {
        this.cart_items = data;
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      }
    });
  }

  remove(index: number) {
    const item = this.cart_items[index];
    const productId = item.productId;

    this.products.deleteFromCart(productId).subscribe({
      next: () => {
        this.cart_items.splice(index, 1);
        alert("Your item has been removed 😔");
      },
      error: (error) => {
        console.error('Error removing item:', error);
        alert("Failed to remove item. Please try again.");
      }
    });
  }

  placeorder(index: number) {
    const item = { ...this.cart_items[index] };

    this.products.deleteFromCart(item.productId).subscribe({
      next: () => {
        this.service.placeorder(item); 
        this.router.navigate(['/place_order']);
        this.cart_items.splice(index, 1);
       
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert("Failed to place order. Please try again.");
      }
    });
  }

  resetCart() {
    const confirmReset = confirm("Are you sure you want to clear the entire cart?");
    if (!confirmReset) return;

    const userId = parseInt(localStorage.getItem('userId') || '0', 10);

    const deleteTasks = this.cart_items.map(item =>
      this.products.deleteFromCart(item.productId).toPromise()
    );

    Promise.all(deleteTasks)
      .then(() => {
        this.cart_items = [];
        alert('Cart has been reset successfully!');
      })
      .catch((error) => {
        console.error('Error resetting cart:', error);
        alert('Failed to reset cart. Please try again.');
      });
  }

  icon_click() {
    this.location.back();
  }
}
