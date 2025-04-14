import { Component } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [NgIf,NgFor,CurrencyPipe,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orders:any
constructor(private service:MainserviceService){
this.orders=this.service.orders

}

}
