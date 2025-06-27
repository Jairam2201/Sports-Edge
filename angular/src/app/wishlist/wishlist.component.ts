import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { MainserviceService } from '../services/mainservice.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlistItems: any[] = [];

  constructor(
    private productsService: ProductsService,
    private mainService: MainserviceService
  ) {
    this.loadWishlistItems();
  }

  loadWishlistItems() {
    this.productsService.get().subscribe(
      (data) => {
        this.wishlistItems = data.filter((item: any) => item.wishlist_status === "Added to Wishlist");
      }
    );
  }

  removeFromWishlist(item: any) {
    this.productsService.toggleWishlist(item.name, item.category).subscribe(() => {
      this.loadWishlistItems();
    });
  }

  addToCart(item: any) {
    this.productsService.addToCart(item.name, item.category).subscribe(() => {
      this.removeFromWishlist(item);
    });
  }
} 