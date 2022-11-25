import { Component, OnInit } from '@angular/core';
import { DbServiceService } from '../db-service.service';
import { Products } from '../products';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product:Products[] = [];
  products:any = {};
  isEditable:boolean = false;
  isAddedNew:boolean = false;

  constructor(private DbServiceService:DbServiceService) { }

  ngOnInit(): void {
    this.DbServiceService.getProductData()
      .subscribe(response => {this.product = response;
        console.log(this.product)});
  }
  setEditState(product, state){
    product.isEditable = state;  
    
  }

  update(product){
    this.DbServiceService.updateproduct(product)
    .subscribe((response) =>{this.product = response;
    })
  }

  createNew(){
    this.isAddedNew = true;

  }

  create(){
    this.DbServiceService.createproduct(this.products)
    .subscribe(Product => {this.product = Product;
      this.isAddedNew = false})
  }

  setAddedState(){
    this.isAddedNew = false;
    this.products = {};
  }
  delete(product){
    this.DbServiceService.deleteProduct(product)
    .subscribe((response) =>{this.product = response;
    })

  }



}
