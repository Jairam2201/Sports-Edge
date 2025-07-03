import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  trackingModalOpen = false;
  trackingStatus: string = '';
  trackingSteps: string[] = ['Ordered', 'Dispatched', 'Shipped', 'Delivered'];
  trackingCurrentStep: number = 0;
  trackingId: string = '';
  expectedDelivery: string = '';
  trackingProductName: string = '';
  trackingTimeline: { label: string, date: string, done: boolean, current: boolean }[] = [];

  // Rating modal state
  ratingModalOpen = false;
  ratingStars = 0;
  ratingFeedback = '';
  ratingProduct: any = null;

  constructor(
    private service: MainserviceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.loadOrders();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.background = "url('/assets/homebackground2.jpg') no-repeat center center fixed";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundColor = "#312f2f";
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.background = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundColor = '';
    }
  }

  loadOrders() {
    this.service.getOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
        alert('Failed to load orders. Please try again.');
      }
    });
  }

  trackOrder(order: any) {
    const orderDate = order.createdAt ? new Date(order.createdAt) : new Date();
    const now = new Date();
    const msInDay = 24 * 60 * 60 * 1000;
    const daysSinceOrder = Math.floor((now.getTime() - orderDate.getTime()) / msInDay);
    // Timeline steps
    const steps = [
      { label: 'Order Confirmed', offset: 0 },
      { label: 'Shipped', offset: 2 },
      { label: 'Out For Delivery', offset: 3 },
      { label: 'Delivery', offset: 4 }
    ];
    this.trackingTimeline = steps.map((step, idx) => {
      const stepDate = new Date(orderDate.getTime() + step.offset * msInDay);
      let done = daysSinceOrder > step.offset;
      let current = daysSinceOrder === step.offset;
      // If delivered, only last step is current
      if (daysSinceOrder >= 4 && idx === steps.length - 1) {
        done = true;
        current = true;
      }
      return {
        label: step.label,
        date: step.label === 'Delivery' ? new Date(orderDate.getTime() + 4 * msInDay).toDateString() : stepDate.toDateString(),
        done,
        current
      };
    });
    this.trackingId = 'TRK' + (order.id || Math.floor(Math.random() * 1000000));
    this.trackingProductName = order.productName;
    this.trackingModalOpen = true;
  }

  closeTrackingModal() {
    this.trackingModalOpen = false;
  }

  cancelOrder(order: any) {
    this.service.cancelOrder(order.id).subscribe({
      next: () => {
        this.orders = this.orders.filter(o => o !== order);
        alert('Order for ' + order.productName + ' has been cancelled.');
      },
      error: (err) => {
        alert('Failed to cancel order. Please try again.');
        console.error(err);
      }
    });
  }

  rateProduct(item: any) {
    this.ratingProduct = item;
    this.ratingStars = 0;
    this.ratingFeedback = '';
    this.ratingModalOpen = true;
  }

  setRating(stars: number) {
    this.ratingStars = stars;
  }

  handleFeedback(event: any) {
    this.ratingFeedback = event.target.value;
  }

  submitRating() {
    // Here you would send the rating to the backend
    alert(`Rated ${this.ratingProduct.productName} with ${this.ratingStars} stars. Feedback: ${this.ratingFeedback}`);
    this.ratingModalOpen = false;
  }

  closeRatingModal() {
    this.ratingModalOpen = false;
  }
}
