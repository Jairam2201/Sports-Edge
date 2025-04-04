import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { OrdersComponent } from './orders/orders.component';


export const routes: Routes = [
    {
        path:'',redirectTo:"home",pathMatch:"full"
    },
    
    {
        path:"home",component:HomeComponent
    },
    {
        path:"products",component:ProductsComponent
    },
    {
        path:"cart",component:CartComponent
    },
    {
        path:"place_order",component:PlaceOrderComponent
    },
    {
        path:"orders",component:OrdersComponent
    },
   
];
