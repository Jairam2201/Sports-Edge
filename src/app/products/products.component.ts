import { CurrencyPipe, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MainserviceService } from '../mainservice.service';

@Component({
  selector: 'app-products',
  imports: [NgFor,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  products:any=[]
 constructor(private service:MainserviceService){
  this.products=this.service.products
  console.log(this.products)
 }
 add(index:any){
  if(this.service.products[index].cart_status==="Add to Cart" && this.products[index].cart_status==="Add to Cart"){
    this.service.products[index].cart_status="Added to Cart"
     this.products[index].cart_status="Added to Cart"
     this.service.cart(this.products[index])
  }
  else{
    this.service.products[index].cart_status="Add to Cart"
     this.products[index].cart_status="Add to Cart"
  }
  
  console.log(this.service.products)
  
}
}
