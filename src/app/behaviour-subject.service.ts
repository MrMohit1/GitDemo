import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviourSubjectService {
  public User = new BehaviorSubject<boolean>(false);
  TelecastUser = this.User.asObservable();

  public isLoggedIn=new BehaviorSubject<boolean>(false);
  TelecastisLoggedIn = this.isLoggedIn.asObservable();

  public LoggedInUser = new BehaviorSubject<string>('');
  TelecastLoggedInUser = this.LoggedInUser.asObservable();


  constructor() { }
 
  setUser(isAdmin:boolean){
    this.User.next(isAdmin);
  }
  setIsLoggedIn(isLoggedIn){
    this.isLoggedIn.next(isLoggedIn);
  }
  
  setUserName(LoggedInUser:string){
    this.LoggedInUser.next(LoggedInUser);
  }
  

}

