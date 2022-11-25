import { Component, OnInit } from '@angular/core';
import { Products } from '../products';
import { DbServiceService } from '../db-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product:Products[]=[];
  hasproductadded:boolean=false;
 

  constructor(private DbServiceService:DbServiceService,private Router:Router,) { }

  ngOnInit(): void {
    this.DbServiceService.getproductdata().subscribe(
      (response) => this.product = response,
      (error) => console.log(error)
    );
  }
  addToCart(product){

    if(!localStorage.getItem("LoggedinUserId"))
    {
       Swal.fire({
  icon: 'error',
  title: 'Not Logged In',
  text: 'You are not Logged In. First Login with your credential!' 
})

this.Router.navigate(['/login']);     

    }
    else {
      Swal.fire({
        icon: 'success',
        title: 'Product added to cart',
        text:'Product added to cart'  
      })
      this.hasproductadded=false;
      this.DbServiceService.addItemsToCart(product)
    .subscribe((response) => {
      
      console.log(response)
      window.location.reload();
      this.hasproductadded=true;  
})


    }

  }
  Route(){
    this.Router.navigate(['/prodetail/:_id']);
  }


}
