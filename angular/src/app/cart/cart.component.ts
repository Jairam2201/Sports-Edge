import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, Location, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
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
    private products: ProductsService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  loadCartItems() {
    this.products.get().subscribe({
      next: (data) => {
        this.cart_items = data.filter((item: any) => item.cart_status === "Added to Cart");
      },
      error: (error) => {
        console.error('Error loading cart items:', error);
      }
    });
  }

  resetCart() {
    this.products.resetAllCartStatuses().subscribe({
      next: () => {
        this.cart_items = [];
        alert('Cart has been reset successfully!');
      },
      error: (error) => {
        console.error('Error resetting cart:', error);
        alert('Failed to reset cart. Please try again.');
      }
    });
  }

  icon_click() {
    this.location.back();
  }

  remove(index: any) {
    const item = this.cart_items[index];
    this.products.addToCart(item.name, item.category).subscribe({
      next: () => {
        this.cart_items.splice(index, 1);
        alert("Your item has been Removed😔");
      },
      error: (error) => {
        console.error('Error removing item:', error);
        alert("Failed to remove item. Please try again.");
      }
    });
  }

  placeorder(index: any) {
    const item = this.cart_items[index];
    this.products.addToCart(item.name, item.category).subscribe({
      next: () => {
        this.service.placeorder(item);
        this.cart_items.splice(index, 1);
      },
      error: (error) => {
        console.error('Error placing order:', error);
        alert("Failed to place order. Please try again.");
      }
    });
  }
}
