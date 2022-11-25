import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from './products';
import { CartResponse } from './cart-response';

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(private http:HttpClient) { }
 
  apiUrl='http://localhost:3001/api';

  getdata(){
    alert("data");
  }
  checkloginfromserver(username:string,password:string){
    return this.http.post(this.apiUrl+'/check-login',{username,password});
  }
  registertoserver(username:string,password:string){
    return this.http.post(this.apiUrl+'/register',{username,password},{responseType:'text'});
  } 
  getproductdata() : Observable<Products[]>{
    return this.http.get<Products[]>(this.apiUrl + '/getProduct');
  }
  getProductData(){
    return this.http.get<Products[]>(this.apiUrl + '/getProductsData');
  }
  updateproduct(product){
    let newproduct = {Quantity: product.Quantity, 
      about:product.about, 
      name:product.name};
    return this.http.put<Products[]>(this.apiUrl + '/updateProducts/' + product._id, {newproduct})
  }
  
  createproduct(product){
    return this.http.post<Products[]>(this.apiUrl + '/createProduct', {product});
  }
  getproductdetail(id){
    return this.http.get<Products[]>(this.apiUrl + '/getProductsDetail/'+id);
  }
  getProductDataById(productId){
    return this.http.get<Products[]>(this.apiUrl + '/getProductDataById/' + productId);
  
  }
  addItemsToCart(product:Products){
    let customerId = localStorage.getItem("LoggedinUserId");
    let addedProduct = {_id:product._id,name:product.name, quantity:1, Price:product.Price}
  
    return this.http.post(this.apiUrl + '/add-items-to-cart', {customerId, addedProduct},{responseType:'text'})
  }
  getCartDetailsfromServer(){
    let customerId = localStorage.getItem("LoggedinUserId");
    return this.http.get<CartResponse>(this.apiUrl + "/get-cart-details/" + customerId);
    
  }

  clearCartDataFromServer(){
    let customerId = localStorage.getItem("LoggedinUserId");
   return this.http.delete(this.apiUrl + '/clearCart/' + customerId,{responseType:'text'});
 
 }
 
 removeCartItem(product:Products){
    let customerId = localStorage.getItem("LoggedinUserId");
    let productToDel = product;
   return this.http.post(this.apiUrl + '/delete-item',{customerId, productToDel},{responseType:'text'});  
 }
 
 deleteFromCart(product:Products){
    let customerId = localStorage.getItem("LoggedinUserId");
    let productToDecrement = product;
 
    return this.http.post(this.apiUrl + '/decrease-item',{customerId, productToDecrement},{responseType:'text'});  
 
 }
 deleteProduct(product){
  return this.http.delete<Products[]>(this.apiUrl + '/deleteProduct/' + product._id)

}
feedback(email:string,name:string,feed:string){
  return this.http.post(this.apiUrl+'/feedback',{email,name,feed},{responseType:'text'});
} 



  
  
}
