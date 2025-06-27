import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = 'http://localhost:5233/api';
  name: any;

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products`).pipe(
      map(products => products.map((product: any) => ({
        ...product,
        cart_status: product.cart_status || "Add to Cart",
        rating: product.rating || Math.floor(Math.random() * 2) + 4, // Random rating between 4-5 for demo
        ratingCount: product.ratingCount || Math.floor(Math.random() * 100) + 50 // Random count between 50-150
      })))
    );
  }

  items(name: any) {
    this.name = name;
  }

  addToCart(name: any, category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${category}/${name}/addtocart`, {});
  }

  toggleWishlist(name: any, category: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${category}/${name}/wishlist`, {});
  }

  getImageUrl(imageName: string): string {
    if (!imageName) return 'assets/placeholder.jpg';  // Default image
    if (imageName.startsWith('http')) return imageName;
    if (imageName.startsWith('assets/')) return imageName;
    
    // Clean up the image name to ensure it's properly formatted
    const cleanImageName = imageName.replace(/\\/g, '/').split('/').pop() || '';
    return `${this.baseUrl}/products/images/${cleanImageName}`;  // Use the API endpoint for images
  }

  resetAllCartStatuses(): Observable<any> {
    return this.http.post(`${this.baseUrl}/products/resetcart`, {});
  }
}



