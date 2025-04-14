import { Component } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { Location, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-place-order',
  imports: [NgIf,FormsModule,RouterLink],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.css'
})
export class PlaceOrderComponent {
  order_item:any
  count=1
  orderPlaced: boolean = false; 
constructor(private service:MainserviceService){
this.order_item=this.service.place_order
}

placeOrder(){
  
  this.order_item.price=this.order_item.price*this.count+100
  this.service.ordered(this.order_item,this.count)
  alert("Your Order has been Placed🎉🎉")
  this.order_item=null
  this.orderPlaced=true
}
}
