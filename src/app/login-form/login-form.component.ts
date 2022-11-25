import { Component, OnInit } from '@angular/core';
import { DbServiceService } from "../db-service.service";
import { Router } from '@angular/router';
import {BehaviourSubjectService} from '../behaviour-subject.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  model:any = {};
username:string;
password:string;
Flag:any;
errorMsg:string;
isErr:boolean;
  constructor(private DbServiceService: DbServiceService, private Router:Router,
  private BehaviourSubjectService:BehaviourSubjectService ) { }

  ngOnInit(): void {
  }

  checklogin(){
    this.DbServiceService.checkloginfromserver(this.username, this.password)
    .subscribe(
      (response:any) => {
        console.log(response)
      this.Flag = response.isAdmin;
 

      localStorage.setItem("isAdmin",  this.Flag);
      localStorage.setItem("isLoggedIn", "true");
       //window.location.reload();
      if(this.Flag == "true"){  
        this.BehaviourSubjectService.setUser(true);      
          localStorage.setItem("LoggedInUser", response.username);
          this.BehaviourSubjectService.setUserName(response.username);
            //swal("Welcome " + response.username);
        this.Router.navigate(['/admin']);
      }
       else{      
         this.BehaviourSubjectService.setUser(false);
         localStorage.setItem("LoggedInUser", response.username);
      
         localStorage.setItem("LoggedinUserId", response._id);
          this.BehaviourSubjectService.setUserName(response.username);

        this.Router.navigate(['/homepage']);
      }    
      this.BehaviourSubjectService.setIsLoggedIn(true);
    },
    (error) =>{
    
      this.errorMsg = 'UserName or Password does not exist';
      this.isErr = true;
       this.BehaviourSubjectService.setIsLoggedIn(false);
    },
    ()=>{
      
    })
  }

}
