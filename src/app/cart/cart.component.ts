import { Component } from '@angular/core';
import { MainserviceService } from '../mainservice.service';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgIf,CurrencyPipe,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  category:any
  name:any
  cart_items:any=[]
constructor(private service:MainserviceService){
this.cart_items=this.service.cart_items
}
remove(index:any){
  this.category=this.cart_items[index].category
  this.name=this.cart_items[index].name
  for(let i=0;i<this.service.products.length;i++){
    if (this.category===this.service.products[i].category && this.name===this.service.products[i].name){
      this.service.products[i].cart_status="Add to Cart"
    }
  }

  this.cart_items.splice(index,1)
  alert("Your item has been Removed😔")
  
}
placeorder(index:any){
  this.category=this.cart_items[index].category
  this.name=this.cart_items[index].name
  for(let i=0;i<this.service.products.length;i++){
    if (this.category===this.service.products[i].category && this.name===this.service.products[i].name){
      this.service.products[i].cart_status="Add to Cart"
    }
  }
this.service.placeorder(this.cart_items[index])
this.cart_items.splice(index,1)
}
}
