import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviourSubjectService } from '../behaviour-subject.service';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  isLoggedIn:boolean;
  LoggedInUser:string = "";

  constructor(private router:Router,private BehaviourSubjectService: BehaviourSubjectService) { }

  ngOnInit(): void {
  

    this.BehaviourSubjectService.TelecastisLoggedIn.subscribe((isLoggedIn) =>
    this.isLoggedIn = isLoggedIn);

      if(localStorage.getItem("isLoggedIn") == "true")
      this.isLoggedIn = true;

    this.BehaviourSubjectService.TelecastLoggedInUser.subscribe((LoggedInUser) =>
    this.LoggedInUser = LoggedInUser);
     this.LoggedInUser =  localStorage.getItem("LoggedInUser");

     


/*
    localStorage.getItem("LoggedinUserId");
    if("!LoggedinUserId"){
      this.isLoggedIn=false;
    }
    else{
      this.isLoggedIn=false;
    }*/
  }
  
  logout(){
    localStorage.removeItem("LoggedInUser");
    localStorage.removeItem("LoggedinUserId");
    localStorage.removeItem("isLoggedIn");
    this.BehaviourSubjectService.setIsLoggedIn(false);
    this.BehaviourSubjectService.setUserName("");
     this.BehaviourSubjectService.setUser(false);

   this.router.navigate(['/login-form']);
  
  }

}
