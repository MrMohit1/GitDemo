import { Component, OnInit } from '@angular/core';
import { DbServiceService } from "../db-service.service";
import { CartResponse } from '../cart-response';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {BehaviourSubjectService} from '../behaviour-subject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
cartDetails:any;
currentUserName;
cartItem:any[] = [];
cartItemTotalPrice;
totalItems:number = 0;

  constructor(private DbServiceService:DbServiceService,
  private BehaviourSubjectService: BehaviourSubjectService,private router:Router) { }

  checkout(){
    this.router.navigateByUrl('/payment');
  }

  ngOnInit(): void {
    this.DbServiceService.getCartDetailsfromServer()
    .subscribe((response:CartResponse) => {
      this.cartItem.length = 0;
      this.cartItemTotalPrice = 0;
      this.totalItems = 0;
     
     this.cartDetails = response[0];
     this.currentUserName = localStorage.getItem("LoggedInUser");
      this.cartItemTotalPrice = this.cartDetails.totalPrice;

      for(let i =0; i<this.cartDetails.products.length; i++){
        this.cartItem[i] = this.cartDetails.products[i];     
        console.log(this.cartItem[i]); 
          this.DbServiceService.getProductDataById(this.cartItem[i]._id)
          .subscribe((ProductResponse:any) =>{            
            this.cartItem[i].imgPath =ProductResponse.imgPath;
            console.log(" this.cartItem[i].imgPath " +  this.cartItem[i].imgPath)    
          })
      }
              for(let x =0; x<this.cartItem.length; x++){
        this.totalItems = this.totalItems + this.cartItem[x].quantity
      }
  });
}

saveItems(){}


checkoutPayPal(){}

clearItems(){}

backToStore(){}

clearCart(){
 
  this.DbServiceService.clearCartDataFromServer()
  .subscribe((response) => {
    Swal.fire({
  icon: 'success',
  title: 'Cart Cleared',
  text:'All the items in the cart has been deleted'  
});
 this.ngOnInit();
})
}


addToCart(product){ 
  this.DbServiceService.addItemsToCart(product)
  .subscribe((response) => {console.log(response) 
  })
  window.location.reload();

}

deleteFromCart(product){
  this.DbServiceService.deleteFromCart(product)
  .subscribe((response) => this.ngOnInit());
  
}

removeItem(product){
  this.DbServiceService.removeCartItem(product)
  .subscribe((response) => {//alert(response);
    //window.location.reload();
    this.ngOnInit();
  })
  


}
}
