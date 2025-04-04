import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MainserviceService } from '../mainservice.service';
import { ProductsComponent } from '../products/products.component';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor,RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private service:MainserviceService){

  }
  name=""
sports:any=[
  {img:"football.jpg",name:"Football"},
  {img:"cricket.jpg",name:"Cricket"},
  {img:"basketball.jpg",name:"Basketball"},
  {img:"tennis.jpg",name:"Tennis"},
  {img:"golf.jpg",name:"Golf"},
  {img:"baseball.jpg",name:"Baseball"},
  {img:"cycling.jpg",name:"Cycling"},
  {img:"hockey.jpg",name:"Hockey"},
  {img:"badminton.jpg",name:"Badminton"},
  {img:"volleyball.jpg",name:"Volleyball"}
]
add(index:any){
this.name=this.sports[index].name
this.service.items(this.name)
}
}
