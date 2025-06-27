import { Component, OnInit } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private service: MainserviceService) {}

  ngOnInit() {
    this.loadOrders();
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
}
