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

  constructor(
    private productsService: ProductsService,
    private mainService: MainserviceService,
    private location: Location,
    private router: Router
  ) {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.get().subscribe(
      (data) => {
        this.data = data;
        this.products = [];
        for (let i = 0; i < this.data.length; i++) {
          if (this.productsService.name === this.data[i].category) {
            this.products.push(this.data[i]);
          }
        }
      }
    );
  }

  icon_click() {
    this.location.back();
  }

  // getImageUrl(imageName: string): string {
  //   return this.productsService.getImageUrl(imageName);
  // }

  // handleImageError(event: any) {
  //   const img = event.target;
  //   if (!img.src.includes('placeholder.jpg')) {
  //     img.src = 'assets/placeholder.jpg';
  //   }
  // }

  add(index: any) {
    this.productsService.addToCart(this.products[index].name, this.products[index].category)
      .subscribe(() => {
        if (this.products[index].cart_status === "Add to Cart") {
          this.products[index].cart_status = "Added to Cart";
        } else {
          this.products[index].cart_status = "Add to Cart";
        }
      });
  }

  buyNow(index: any) {
    const product = this.products[index];
    // If the item is in cart, remove it first
    if (product.cart_status === "Added to Cart") {
      this.productsService.addToCart(product.name, product.category).subscribe(() => {
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

  toggleWishlist(index: any) {
    this.productsService.toggleWishlist(this.products[index].name, this.products[index].category)
      .subscribe(() => {
        this.products[index].wishlist_status = !this.products[index].wishlist_status;
      });
  }
}

