import { CurrencyPipe, Location, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MainserviceService } from '../services/mainservice.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-products',
  imports: [NgFor,CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  data:any
  products:any=[]
 constructor(private productsservice:ProductsService,private location: Location){
this.productsservice.get().subscribe(
  (data)=>{this.data=data
    this.products=[]
    for(let i=0;i<this.data.length;i++){
      if(this.productsservice.name===this.data[i].category){
        this.products.push(this.data[i])
      }
    }
  }
)
  console.log(this.products)
 }
 icon_click(){
  this.location.back();
}
 add(index:any){
  this.productsservice.addToCart(this.products[index].name,this.products[index].category)
      if(this.products[index].cart_status==="Add to Cart"){
        this.products[index].cart_status="Added to Cart"

      }
      else{
        this.products[index].cart_status="Add to Cart"

      }
    }
  
  
}

