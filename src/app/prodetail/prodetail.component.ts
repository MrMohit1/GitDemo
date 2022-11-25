import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { DbServiceService } from '../db-service.service';
import { Products } from '../products';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prodetail',
  templateUrl: './prodetail.component.html',
  styleUrls: ['./prodetail.component.css']
})
export class ProdetailComponent implements OnInit {

  products1;
  check:number;
  products;
  quantity:string="";
  qtn:boolean=false;
  name:string;
  id:string;
  hasproductadded:boolean=false;


  cart(products){

      if(!localStorage.getItem("LoggedinUserId"))
      {
         Swal.fire({
    icon: 'error',
    title: 'Not Logged In',
    text: 'You are not Logged In. First Login with your credential!' 
  })
  
  this.router.navigate(['/login']);     
  
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Product added to cart',
          text:'Product added to cart'  
        })
        this.hasproductadded=false;
        this.DbServiceService.addItemsToCart(products)
      .subscribe((response) => {
        
        console.log(response)
        window.location.reload();
        this.hasproductadded=true;  
  })
  
  
      }
  
    
  }

  constructor(private act:ActivatedRoute,private router:Router,private DbServiceService:DbServiceService) { }

  ngOnInit(): void {
  this.id=this.act.snapshot.params.id;
   this.DbServiceService.getProductDataById(this.act.snapshot.params._id).subscribe(
     (response)=>{this.products=response
      if(this.products.Quantity<20){
        this.qtn=true;
      }
      else{
       this.qtn=false;
      }
     },
     (error) => console.log(error)
   );

  

  }

}
