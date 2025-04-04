import { Component } from '@angular/core';
import { MainserviceService } from '../mainservice.service';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-order',
  standalone: true, // Make sure standalone is true if you're using Angular's standalone components
  imports: [NgIf, FormsModule, RouterLink],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  order_item: any;
  count = 1;
  orderPlaced: boolean = false;
  
  // Address fields
  street: string = '';
  city: string = '';
  state: string = '';
  zipCode: string = '';
  country: string = '';
  
  // Delivery information
  estimatedDeliveryDays: number = 0;
  estimatedDeliveryDate: string = '';
  deliveryAddress: string = '';

  constructor(private service: MainserviceService) {
    this.order_item = this.service.place_order;
    this.calculateEstimatedDeliveryDays();
  }

  isAddressValid(): boolean {
    return this.street && this.city && this.state && this.zipCode && this.country ? true : false;
  }

  calculateEstimatedDeliveryDays(): void {
    // Calculate delivery days based on product type or other factors
    // For this example, we'll use a simple calculation
    if (this.order_item) {
      // Base delivery time is 3-5 days
      const baseDelivery = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
      
      // If price is higher, slightly faster delivery
      this.estimatedDeliveryDays = this.order_item.price > 1000 ? 
        Math.max(baseDelivery - 1, 2) : baseDelivery;
    }
  }

  getEstimatedDeliveryDays(): string {
    this.calculateEstimatedDeliveryDays();
    return `${this.estimatedDeliveryDays}-${this.estimatedDeliveryDays + 2} days`;
  }

  formatDeliveryDate(): string {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + this.estimatedDeliveryDays);
    
    return deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  compileAddress(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}, ${this.country}`;
  }

  placeOrder() {
    if (!this.isAddressValid()) {
      alert("Please fill in all address fields");
      return;
    }
    
    // Set delivery information for confirmation message
    this.estimatedDeliveryDate = this.formatDeliveryDate();
    this.deliveryAddress = this.compileAddress();
    
    // Calculate total price
    const totalPrice = this.order_item.price * this.count + 100;
    
    // Create order object with address
    const orderDetails = {
      ...this.order_item,
      price: totalPrice,
      quantity: this.count,
      address: this.compileAddress(),
      estimatedDelivery: this.estimatedDeliveryDate
    };
    
    this.service.ordered(orderDetails, this.count);
    alert("Your Order has been Placed🎉🎉");
    this.order_item = null;
    this.orderPlaced = true;
  }
}