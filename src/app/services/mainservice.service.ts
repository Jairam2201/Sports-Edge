import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor(private http:HttpClient) { }
  orders:any=[]
  place_order:any
  cart_items:any=[]
  products:any=[]

 get():Observable<any>{
  return this.http.get<any>("http://localhost:5000/api/sports")
}

getusers():Observable<any>{
return this.http.get<any>("http://localhost:5000/api/auth")
}

updateUserPassword(id: number, updatedUser: any): Observable<any> {
  return this.http.put(`http://localhost:5000/api/auth/${id}`, updatedUser, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  });
}
  // cart(item:any){
  //   this.cart_items.push(item)
  // }
  placeorder(item:any){
    this.place_order=item
  }
  ordered(item:any,quantity:any){
    this.orders.push(item)
    length=this.orders.length
    this.orders[length-1].quantity=quantity
  }

}
