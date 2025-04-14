import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
name:any
  constructor(private http:HttpClient) { }
  get():Observable<any>{
    return this.http.get<any>("http://localhost:5000/api/products")
  }
  items(name:any){
    this.name=name
  }
  addToCart(name: any, category: any) {
    return this.http.put(`http://localhost:5000/api/products/${category}/${name}/addtocart`, {}).subscribe(
      
    );
  }
  
}



