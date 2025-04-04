import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for directives

@Component({
  selector: 'app-orders',
  standalone: true, // Ensure it's a standalone component
  imports: [CommonModule], // Import CommonModule for *ngIf, *ngFor, and pipes
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  orders = [
    {
      img: 'assets/sample-product.jpg',  // Replace with actual image path
      price: 1500,
      quantity: 1,
      address: '123, Street Name, City, Zip Code',
      estimatedDeliveryDays: 3,
      trackingId: 'TRK123456789'
    },
    {
      img: 'assets/sample-product2.jpg',
      price: 2500,
      quantity: 2,
      address: '456, Another Street, City, Zip Code',
      estimatedDeliveryDays: 5,
      trackingId: 'TRK987654321'
    }
  ];
}