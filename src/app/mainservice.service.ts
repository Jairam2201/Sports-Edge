import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  constructor() { }
  orders:any=[]
  place_order:any
  cart_items:any=[]
  products:any=[]
  sport_items:any=[
    // Football
    {"category":"Football","img":"football.jpg","name":"Football","stars":5,"price":1000,"cart_status":"Add to Cart"},
    {"category":"Football","img":"f_helmet.jpg","name":"Helmet","stars":5,"price":1500,"cart_status":"Add to Cart"},
    {"category":"Football","img":"f_pads.jpg","name":"Shoulder Pads","stars":5,"price":2000,"cart_status":"Add to Cart"},
    {"category":"Football","img":"f_cleats.jpg","name":"Cleats","stars":5,"price":1200,"cart_status":"Add to Cart"},
    {"category":"Football","img":"f_gloves.jpg","name":"Gloves","stars":5,"price":800,"cart_status":"Add to Cart"},
    {"category":"Football","img":"f_goalposts.jpg","name":"Goal Posts","stars":5,"price":5000,"cart_status":"Add to Cart"},
    {"category":"Football","img":"football_jersey.jpeg","name":"Jersey","stars":5,"price":900,"cart_status":"Add to Cart"},
  
    // Cricket
    {"category":"Cricket","img":"c_gloves.jpg","name":"Batting Gloves","stars":5,"price":1200,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_pads.jpg","name":"Pads","stars":5,"price":1500,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_helmet.jpg","name":"Helmet","stars":5,"price":1800,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_shoes.jpg","name":"Shoes","stars":5,"price":2000,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_jersey.jpg","name":"Jersey","stars":5,"price":1000,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_bag.jpg","name":"Kit Bag","stars":5,"price":2500,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_bat.jpg","name":"Bat","stars":5,"price":5000,"cart_status":"Add to Cart"},
    {"category":"Cricket","img":"c_ball.jpg","name":"Cricket Balls","stars":5,"price":500,"cart_status":"Add to Cart"},
  
    // Basketball
    {"category":"Basketball","img":"b_shoes.jpg","name":"Shoes","stars":5,"price":2200,"cart_status":"Add to Cart"},
    {"category":"Basketball","img":"b_jersey.jpg","name":"Jersey","stars":5,"price":1200,"cart_status":"Add to Cart"},
    {"category":"Basketball","img":"b_socks.jpg","name":"Socks","stars":5,"price":500,"cart_status":"Add to Cart"},
    {"category":"Basketball","img":"basketball.jpg","name":"Basketball","stars":5,"price":1500,"cart_status":"Add to Cart"},
    {"category":"Basketball","img":"b_hoop.jpg","name":"Hoop","stars":5,"price":3500,"cart_status":"Add to Cart"},
    {"category":"Basketball","img":"basketball_net.jpeg","name":"Basketball Net","stars":5,"price":1000,"cart_status":"Add to Cart"},
  
    // Tennis
    {"category":"Tennis","img":"tennis_racket.jpg","name":"Racket","stars":5,"price":2500,"cart_status":"Add to Cart"},
    {"category":"Tennis","img":"tennis_ball.jpeg","name":"Tennis Balls","stars":5,"price":800,"cart_status":"Add to Cart"},
    {"category":"Tennis","img":"tennis_wristband.jpeg","name":"Wristband","stars":5,"price":300,"cart_status":"Add to Cart"},
    {"category":"Tennis","img":"tennis_net.jpg","name":"Tennis Net","stars":5,"price":4000,"cart_status":"Add to Cart"},
    {"category":"Tennis","img":"tennis_grip.jpeg","name":"Tennis Grip","stars":5,"price":600,"cart_status":"Add to Cart"},
    {"category":"Tennis","img":"tennis_strings.jpg","name":"Tennis Strings","stars":5,"price":700,"cart_status":"Add to Cart"},
  
    // Golf
    {"category":"Golf","img":"golf_club.jpg","name":"Golf Club","stars":5,"price":5000,"cart_status":"Add to Cart"},
    {"category":"Golf","img":"golf_balls.jpg","name":"Golf Balls","stars":5,"price":1200,"cart_status":"Add to Cart"},
    {"category":"Golf","img":"golf_gloves.jpg","name":"Golf Gloves","stars":5,"price":1000,"cart_status":"Add to Cart"},
    {"category":"Golf","img":"golf_bag.jpg","name":"Golf Bag","stars":5,"price":4500,"cart_status":"Add to Cart"},
    {"category":"Golf","img":"golf_tee.jpg","name":"Golf Tees","stars":5,"price":300,"cart_status":"Add to Cart"},
  
    // Baseball
    {"category":"Baseball","img":"baseball_bat.jpg","name":"Bat","stars":5,"price":3000,"cart_status":"Add to Cart"},
    {"category":"Baseball","img":"baseball_ball.jpg","name":"Ball","stars":5,"price":600,"cart_status":"Add to Cart"},
    {"category":"Baseball","img":"baseball_gloves.jpg","name":"Gloves","stars":5,"price":2000,"cart_status":"Add to Cart"},
    {"category":"Baseball","img":"baseball_helmet.jpg","name":"Helmet","stars":5,"price":1800,"cart_status":"Add to Cart"},
  
    // Cycling
    {"category":"Cycling","img":"cycling_helmet.jpg","name":"Helmet","stars":5,"price":2200,"cart_status":"Add to Cart"},
    {"category":"Cycling","img":"cycling_gloves.jpg","name":"Gloves","stars":5,"price":800,"cart_status":"Add to Cart"},
    {"category":"Cycling","img":"cycling_shoes.jpg","name":"Shoes","stars":5,"price":2500,"cart_status":"Add to Cart"},
    {"category":"Cycling","img":"cycling_glasses.jpg","name":"Glasses","stars":5,"price":1500,"cart_status":"Add to Cart"},
  
    // Badminton
    {"category":"Badminton","img":"badminton_racket.jpg","name":"Racket","stars":5,"price":2000,"cart_status":"Add to Cart"},
    {"category":"Badminton","img":"badminton_shuttlecock.jpg","name":"Shuttlecock","stars":5,"price":700,"cart_status":"Add to Cart"},
    {"category":"Badminton","img":"badminton_net.jpeg","name":"Badminton Net","stars":5,"price":3000,"cart_status":"Add to Cart"},
  
    // Volleyball
    {"category":"Volleyball","img":"volleyballs.jpeg","name":"Volleyball","stars":5,"price":1500,"cart_status":"Add to Cart"},
    {"category":"Volleyball","img":"volleyball_kneepads.jpeg","name":"Knee Pads","stars":5,"price":1200,"cart_status":"Add to Cart"},
    {"category":"Volleyball","img":"volleyball_net.jpg","name":"Volleyball Net","stars":5,"price":3500,"cart_status":"Add to Cart"},
  
    // Hockey
    {"category":"Hockey","img":"h_stick.jpg","name":"Hockey Stick","stars":5,"price":2500,"cart_status":"Add to Cart"},
    {"category":"Hockey","img":"h_puck.jpg","name":"Puck","stars":5,"price":500,"cart_status":"Add to Cart"},
    {"category":"Hockey","img":"h_skates.jpg","name":"Skates","stars":5,"price":3000,"cart_status":"Add to Cart"},
    {"category":"Hockey","img":"h_gloves.jpg","name":"Gloves","stars":5,"price":1800,"cart_status":"Add to Cart"},
    {"category":"Hockey","img":"h_pant.jpg","name":"Hockey Pants","stars":5,"price":2000,"cart_status":"Add to Cart"}
  ];  
  items(name:any){
    console.log(this.products)
    this.products=[]
    console.log(this.products)
    for(let i=0;i<this.sport_items.length;i++){
      if(name===this.sport_items[i].category){
        this.products.push(this.sport_items[i])
      }
    }
    console.log(this.products)
  }
  cart(item:any){
    this.cart_items.push(item)
  }
  placeorder(item:any){
    this.place_order=item
  }
  ordered(item:any,quantity:any){
    this.orders.push(item)
    length=this.orders.length
    this.orders[length-1].quantity=quantity
  }

}
