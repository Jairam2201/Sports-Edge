import { Component } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { CurrencyPipe, Location, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, NgIf,CurrencyPipe,NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  category:any
  name:any
  data:any
  cart_items:any=[]
constructor(private service:MainserviceService,private location: Location,private products:ProductsService){
this.products.get().subscribe(
  (data)=>{
this.data=data
this.cart_items=[]
for (let i=0;i<data.length;i++){
  if(data[i].cart_status==="Added to Cart"){
    this.cart_items.push(data[i])
  }
}
  }
)
}
icon_click(){
  this.location.back();
}
remove(index:any){
  this.products.addToCart(this.cart_items[index].name,this.cart_items[index].category)
 

  this.cart_items.splice(index,1)
  alert("Your item has been Removed😔")
  
}
placeorder(index:any){
  this.products.addToCart(this.cart_items[index].name,this.cart_items[index].category)

this.service.placeorder(this.cart_items[index])
this.cart_items.splice(index,1)
}
}
