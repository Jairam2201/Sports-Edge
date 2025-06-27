import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-bestsellers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bestsellers-container">
      <h2>Our Bestsellers</h2>
      <div class="products-grid">
        <div class="product-card" *ngFor="let product of bestsellers">
           <img [src]="'public/' + product.img" [alt]="product.name">
          <div class="product-info">
            <h3>{{ product.name }}</h3>
            <p class="price">{{ product.price | currency:'INR' }}</p>
            <div class="rating">
              <span *ngFor="let star of [1,2,3,4,5]">
                <i class="bi" [class.bi-star-fill]="star <= product.rating" [class.bi-star]="star > product.rating"></i>
              </span>
              <span class="rating-count">({{ product.ratingCount || 0 }})</span>
            </div>
            <button class="btn btn-primary" [routerLink]="['/products']" (click)="viewProduct(product)">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bestsellers-container {
      padding: 2rem;
    }
    h2 {
      text-align: center;
      margin-bottom: 2rem;
    }
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }
    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      transition: transform 0.2s;
    }
    .product-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    img {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 4px;
    }
    .product-info {
      padding: 1rem 0;
    }
    .price {
      font-size: 1.2rem;
      font-weight: bold;
      color: #2c3e50;
    }
    .rating {
      color: #f1c40f;
      margin: 0.5rem 0;
    }
    .rating-count {
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-left: 0.5rem;
    }
    .btn {
      width: 100%;
      margin-top: 1rem;
    }
  `]
})
export class BestsellersComponent implements OnInit {
  bestsellers: any[] = [];

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.loadBestsellers();
  }

  loadBestsellers() {
    this.productsService.get().subscribe(products => {
      this.bestsellers = products
        .filter((p: any) => p.rating >= 4)
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 6);
    });
  }

  getImageUrl(imageName: string): string {
    return this.productsService.getImageUrl(imageName);
  }

  viewProduct(product: any) {
    this.productsService.items(product.category);
  }
} 